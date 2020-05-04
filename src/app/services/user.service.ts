import {Injectable} from '@angular/core';
import {SignalRService} from './signal-r.service';
import {UserModel} from '../models/user-model';
import {Observable} from 'rxjs';
import {HubConnectionState} from '@microsoft/signalr';
import {Router} from '@angular/router';
import {UpdateUserRequest} from '../models/update-user-request';

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private user: UserModel;
    public groups: { 'Admin': 'Administrator', 'Teacher': 'Teacher', 'Student': 'Student' };

    public userSubscriber = new Observable((observer) => {

        if (this.user != null) {
            observer.next(this.user);
            observer.complete();
        }

        if (this.signalRService.userHubConnection == undefined) {
            this.signalRService.buildAuthorizedHubs();
        }

        this.requestUser();

        this.signalRService.userHubConnection.on('GetUser', (data: UserModel) => {
            observer.next(data);
            observer.complete();
        })
    });

    public updateUserSubscriber = new Observable((observer) => {
        this.signalRService.userHubConnection.on('UpdateUser', (data: number) => {
            observer.next(data);
            observer.complete();
        })
    });

    constructor(private signalRService: SignalRService, private router: Router) {
    }

    private async requestUser(): Promise<boolean> {

        return this.makeRequest('GetUser');

    }
    public async updateUser(data: UpdateUserRequest): Promise<boolean> {

        return this.makeRequest('UpdateUser', data);

    }

    private async makeRequest(methodName: string, data = null): Promise<boolean> {
        if (this.signalRService.userHubConnection == null) {
            this.signalRService.buildAuthorizedHubs();

        }
        if (this.signalRService.userHubConnection.state == HubConnectionState.Disconnected) {
            await this.signalRService.startAuthorizedConnection(this.signalRService.userHubConnection);
        }
        if (this.signalRService.userHubConnection.state != HubConnectionState.Connected) {
            console.log(this.signalRService.userHubConnection.state);
        }
        var req
        if (data == null) {
            req = this.signalRService.userHubConnection.invoke(methodName);
        } else {
            req = this.signalRService.userHubConnection.invoke(methodName, data);
        }
        req
            .catch(err => {
                console.log('Error while connection: ' + err);
                if (err.status == 401) {
                    this.router.navigate(['/'])
                }
                setTimeout(async () => {
                    await this.makeRequest(methodName, data);
                }, 30)
                return false;
            });
        return true;
    }

}



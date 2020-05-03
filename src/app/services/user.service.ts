import {Injectable} from '@angular/core';
import {SignalRService} from './signal-r.service';
import {UserModel} from '../models/user-model';
import {Observable} from 'rxjs';
import {HubConnectionState} from '@microsoft/signalr';
import {Router} from '@angular/router';

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

    constructor(private signalRService: SignalRService, private router: Router) {
    }

    private async requestUser(): Promise<boolean> {

        if (this.signalRService.userHubConnection == null) {
            this.signalRService.buildAuthorizedHubs();

        }
        if (this.signalRService.userHubConnection.state == HubConnectionState.Disconnected) {
            await this.signalRService.startAuthorizedConnection(this.signalRService.userHubConnection);
        }
        if (this.signalRService.userHubConnection.state != HubConnectionState.Connected) {
            console.log(this.signalRService.userHubConnection.state);
        }
        this.signalRService.userHubConnection.invoke('GetUser')
            .catch(err => {
                console.log('Error while connection: ' + err);
                if (err.status == 401) {
                    this.router.navigate(['/'])
                }
                setTimeout(async () => {
                    await this.requestUser();
                }, 30)
                return false;
            });
        return true;

    }

}

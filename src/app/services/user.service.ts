import {Injectable, OnInit} from '@angular/core';
import {SignalRService} from './signal-r.service';
import {UserModel} from '../models/user-model';
import {AdConnectModel} from '../models/ad-connect-model';
import {Observable} from 'rxjs';
import {HubConnectionState} from '@microsoft/signalr';

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

        if (this.signalRService.userHubConnection != null) {
            this.signalRService.buildAuthorizedHubs();
        }

        this.requestUser();

        this.signalRService.userHubConnection.on('GetUser', (data: UserModel) => {
            console.log(data);
            observer.next(data);
            observer.complete();
        })
    });

    constructor(private signalRService: SignalRService) {
    }

    private async requestUser() {

        console.log('requesting user');
        if (this.signalRService.userHubConnection.state != HubConnectionState.Connected) {
            await this.signalRService.startAuthorizedConnection(this.signalRService.userHubConnection)
        }
        this.signalRService.userHubConnection.invoke('GetUser')
            .catch(err => console.error(err));
    }
}

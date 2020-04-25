import {Injectable, OnInit} from '@angular/core';
import {SignalRService} from './signal-r.service';
import {UserModel} from '../models/user-model';
import {AdConnectModel} from '../models/ad-connect-model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private user: UserModel;
    public groups: { 'Admin': 'Administrator', 'Teacher': 'Teacher', 'Student': 'Student' };

    constructor(private signalRService: SignalRService) {
    }

    public getUser() {
        if (this.user != null) {
            return this.user;
        }

    }

    public connect = (data: AdConnectModel) => {
        this.signalRService.userHubConnection.invoke('Connect', data)
            .catch(err => console.error(err));
    }
}

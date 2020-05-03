import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {AdConnectModel} from '../models/ad-connect-model';
import {UserModel} from '../models/user-model';
const dummyUser = new UserModel();
@Component({
    moduleId: module.id,
    selector: 'user-cmp',
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {
    User: UserModel = dummyUser;

    constructor(private userService: UserService) {
    }

    ngOnInit(): void {
        this.userService.userSubscriber.subscribe((data: UserModel) => {
            this.User = data;
        });
    }
}

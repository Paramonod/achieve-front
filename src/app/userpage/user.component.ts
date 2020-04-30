import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {AdConnectModel} from '../models/ad-connect-model';
import {UserModel} from '../models/user-model';

@Component({
    moduleId: module.id,
    selector: 'user-cmp',
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {
    username = 'asdads';

    constructor(private userService: UserService) {
    }

    ngOnInit(): void {
        this.userService.userSubscriber.subscribe((data: UserModel) => {
            this.username = data.name;
        });
    }
}

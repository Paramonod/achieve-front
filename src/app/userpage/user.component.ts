import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {AdConnectModel} from '../models/ad-connect-model';
import {UserModel} from '../models/user-model';
import {Form, FormControl, FormGroup, Validators} from '@angular/forms';

const dummyUser = new UserModel();

@Component({
    moduleId: module.id,
    selector: 'user-cmp',
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {
    User: UserModel = dummyUser;
    userForm: FormGroup = new FormGroup({
        'name': new FormControl(this.User.name, [
            Validators.minLength(2), Validators.required]),
        'email': new FormControl(this.User.email, [
            Validators.required, Validators.email]),
        'surname': new FormControl(this.User.surname, Validators.required),
        'room': new FormControl(this.User.room, Validators.required),
        'grade': new FormControl(this.User.grade, Validators.required),
        'gradeLiteral': new FormControl(this.User.gradeLiteral, Validators.required),
        'description': new FormControl(this.User.description, Validators.required)

    });
;

    constructor(private userService: UserService, private ref: ChangeDetectorRef) {
    }

    onSubmit() {

    }

    ngOnInit(): void {
        this.userService.userSubscriber.subscribe((data: UserModel) => {
            this.User = data;
            this.userForm.patchValue({
                name: this.User.name,
                email: this.User.email,
                surname: this.User.surname,
                room: this.User.room,
                grade: this.User.grade,
                gradeLiteral: this.User.gradeLiteral,
                description: this.User.description
            })
        });
    }
}

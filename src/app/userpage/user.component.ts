import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {UserModel} from '../models/user-model';
import {Form, FormControl, FormGroup, Validators} from '@angular/forms';
import {UpdateUserRequest} from '../models/update-user-request';
import {Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications';

const dummyUser = new UserModel();
const dummyRequest = new UpdateUserRequest();

@Component({
    moduleId: module.id,
    selector: 'user-cmp',
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {
    User: UserModel = dummyUser;
    UserReq: UpdateUserRequest = dummyRequest;
    userForm: FormGroup = new FormGroup({
        'name': new FormControl(this.UserReq.name, [
            Validators.minLength(2), Validators.required]),
        'email': new FormControl(this.UserReq.email, [
            Validators.required, Validators.email]),
        'surname': new FormControl(this.UserReq.surname, Validators.required),
        'room': new FormControl(this.UserReq.room, Validators.required),
        'grade': new FormControl(this.UserReq.grade, Validators.required),
        'gradeLiteral': new FormControl(this.UserReq.gradeLiteral, Validators.required),
        'description': new FormControl(this.UserReq.description)

    });

    constructor(private userService: UserService, private ref: ChangeDetectorRef, private notificationsService: NotificationsService) {
    }

    onSubmit() {
        if (this.userForm.valid) {
            this.UserReq = this.userForm.value;
            console.log(this.UserReq)
            this.userService.updateUserSubscriber.subscribe((status: number) => {
                console.log(status);
                this.notificationsService.success("Обновление пользователя", "Пользователь успешно обновлен");
            })
            this.userService.updateUser(this.UserReq);
        }
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

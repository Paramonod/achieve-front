import {AdUserModel} from './ad-user-model';

export class UserModel {
    public id: string;
    public name: string;
    public surname: string;
    public group: string;

    public adUser: AdUserModel;
}

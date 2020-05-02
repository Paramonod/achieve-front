import {AdUserModel} from './ad-user-model';

export class RegisterModel {
    Name: string;
    Surname: string;
    Email: string;
    Password: string;
    Domain: string;
    DomainUsername: string;
    Groups: string[];
    Interests: string[];
    ADUser: AdUserModel;
}

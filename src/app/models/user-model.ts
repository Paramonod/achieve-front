import {AdUserModel} from './ad-user-model';

export class UserModel {
    public id: string;
    public identityID: string;
    public organizationID = "none";
    public grade: number;
    public gradeLiteral: string;
    public room: string;
    public email: string;
    public name: string;
    public surname: string;
    public interests: string[];
    public projects: string[] = [];
    public group: string;
    public description: string;

    public adUser: AdUserModel;
}

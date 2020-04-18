import {AdUserModel} from './ad-user-model';
import {ApiRequestModel} from './api-request-model';

export class AdConnectModel extends ApiRequestModel{
    domain: string;
    username: string;
    password: string;
    result: AdUserModel;
}

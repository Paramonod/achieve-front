import {User, UserManager, UserManagerSettings} from 'oidc-client';
import {Injectable} from '@angular/core';
import {BaseService} from '../base.service';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../config.service';
import {catchError} from 'rxjs/operators';
import {SignalRService} from '../../services/signal-r.service';
import {HubConnectionState} from '@microsoft/signalr';

@Injectable({
    providedIn: 'root'
})

export class AuthService extends BaseService {

    // Observable navItem source
    private _authNavStatusSource = new BehaviorSubject<boolean>(false);
    // Observable navItem stream
    authNavStatus$ = this._authNavStatusSource.asObservable();

    private manager = new UserManager(getClientSettings());
    private user: User | null;

    constructor(private http: HttpClient, private configService: ConfigService) {
        super();

        this.manager.getUser().then(user => {
            this.user = user;
            this._authNavStatusSource.next(this.isAuthenticated());
        });
    }

    login() {
        return this.manager.signinRedirect();
    }

    silent() {
        return this.manager.signinSilentCallback();
    }

    async completeAuthentication() {
        this.user = await this.manager.signinRedirectCallback();
        this._authNavStatusSource.next(this.isAuthenticated());
    }

    register(userRegistration: any) {
        return this.http.post(this.configService.authApiURI + '/api/account', userRegistration).pipe(catchError(this.handleError));
    }

    isAuthenticated(): boolean {
        var res = this.user != null && !this.user.expired;
        return res;
    }

    get authorizationHeaderValue(): string {
        return `${this.user.token_type} ${this.user.access_token}`;
    }

    get JwtToken(): string {
        return `${this.user.access_token}`;
    }

    get name(): string {
        return this.user != null ? this.user.profile.name : '';
    }

    async signout() {
        await this.manager.signoutRedirect();
    }
}

export function

getClientSettings(): UserManagerSettings {
    return {
        authority: 'https://auth.it108.org',
        client_id: 'angular_spa',
        redirect_uri: 'http://localhost:4200/#/auth-callback#',
        response_type: 'id_token token',
        scope: 'openid profile api.read',
        silent_redirect_uri: 'http://localhost:4200/#/silent-callback#',
        automaticSilentRenew: true
    };
}

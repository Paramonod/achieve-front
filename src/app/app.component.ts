import {Component, OnDestroy, OnInit} from '@angular/core';
import {BroadcastService, MsalService} from '@azure/msal-angular';
import {Subscription} from 'rxjs';
import {HttpClientModule, HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
    loggedIn: boolean;
    public userInfo: any = null;
    private subscription: Subscription;

    constructor(private broadcastService: BroadcastService, private authService: MsalService) {
        this.loggedIn = !!this.authService.getAccount();
    }


    login() {
        this.authService.loginRedirect();
    }

    loginPopup() {
        this.authService.loginPopup();
    }


    logout() {
        this.authService.logout();
    }


    ngOnInit() {

        this.authService.handleRedirectCallback((error, response) => {
            console.log(response)
        });

        this.broadcastService.subscribe('msal:acquireTokenSuccess', (payload) => {
            console.log('login success');
            var userData = this.authService.getAccount();
            console.log('getUser ' + JSON.stringify(this.authService.getAccount()));
            window.localStorage.setItem('userIdentifier', userData.accountIdentifier);
            window.localStorage.setItem('userData', JSON.stringify(userData));

            this.loggedIn = true;

        });

        this.broadcastService.subscribe('msal:acquireTokenFailure', (payload) => {

            console.log('login failure');
            this.loggedIn = false;
            console.log(payload);
        });

        this.broadcastService.subscribe('msal:loginFailure', payload => {
        });

        this.broadcastService.subscribe('msal:loginSuccess', payload => {
            this.loggedIn = true;
        });
    }

    ngOnDestroy() {
        this.broadcastService.getMSALSubject().next(1);
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}



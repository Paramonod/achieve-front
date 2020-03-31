import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
    loggedIn: boolean;
    public userInfo: any = null;
    private subscription: Subscription;

    ngOnInit() { }

    ngOnDestroy() {
    }
}



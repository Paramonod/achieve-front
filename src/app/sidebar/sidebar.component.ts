import {Component, OnInit, AfterViewInit, AfterViewChecked, AfterContentInit, NgZone, ChangeDetectorRef} from '@angular/core';
import {AuthService} from '../shared/authentication/auth.service';
import {UserService} from '../services/user.service';
import {UserModel} from '../models/user-model';

const DummyUser = new UserModel();

// Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    collapse?: string;
    icontype: string;
    // icon: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

// Menu Items
export const ROUTES: RouteInfo[] = [{
    path: '/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'nc-icon nc-bank'
},
    {
        path: '/logout',
        title: 'Logout',
        type: 'link',
        icontype: 'nc-icon nc-key-25'
    }];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit, AfterViewInit {
    public menuItems: any[];
    User: UserModel = DummyUser;

    constructor(private ref: ChangeDetectorRef, private userService: UserService, private zone: NgZone) {
    }


    isNotMobileMenu() {
        if (window.outerWidth > 991) {
            return false;
        }
        return true;
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.userService.userSubscriber.subscribe((data: UserModel) => {
            console.log(data);
            this.zone.run(() => {
                this.User = data;
            });
            this.User = data;
            this.ref.detectChanges();
            this.ref.reattach();
        });
    }

    ngAfterViewInit() {
        console.log(this.User)
    }
}

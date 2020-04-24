import {Component, OnInit, AfterViewInit, AfterViewChecked, AfterContentInit} from '@angular/core';
import {AuthService} from '../shared/authentication/auth.service';

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
    Username = 'Username';


    isNotMobileMenu() {
        if (window.outerWidth > 991) {
            return false;
        }
        return true;
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    ngAfterViewInit() {
    }
}

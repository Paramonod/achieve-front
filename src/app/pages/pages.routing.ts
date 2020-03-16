import {Routes} from '@angular/router';

import {RegisterComponent} from './register/register.component';
import {LockComponent} from './lock/lock.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {ErrorComponent} from './error/error.component';

export const PagesRoutes: Routes = [{
    path: '',
    children: [{
        path: 'login',
        component: LoginComponent
    }, {
        path: 'lock',
        component: LockComponent
    }, {
        path: 'register',
        component: RegisterComponent
    }, {
        path: 'error',
        component: ErrorComponent
    }]
}];

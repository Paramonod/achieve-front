import { Routes } from '@angular/router';

import { UserComponent } from './user.component';
import {AuthGuard} from '../shared/authentication/auth.guard';

export const UserRoutes: Routes = [{
    path: '',
    children: [{
        canActivate: [AuthGuard],
        path: 'user',
        component: UserComponent
    }]
}];

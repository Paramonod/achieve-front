import {Routes} from '@angular/router';

import {DashboardComponent} from './dashboard.component';
import {MsalGuard} from '@azure/msal-angular';

export const DashboardRoutes: Routes = [{

    path: '',
    children: [{
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [MsalGuard]
    }]
}];


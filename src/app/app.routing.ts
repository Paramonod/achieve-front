import {Routes} from '@angular/router';

import {AdminLayoutComponent} from './layouts/admin/admin-layout.component';
import {AuthLayoutComponent} from './layouts/auth/auth-layout.component';
import {AuthCallbackComponent} from './auth-callback/auth-callback.component';
import {SilentCallbackComponent} from './silent-callback/silent-callback.component';

export const AppRoutes: Routes = [  { path: 'id_token', component: AuthCallbackComponent  },
    { path: 'auth-callback', component: AuthCallbackComponent  },
    { path: 'silent-callback', component: SilentCallbackComponent  },
    {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
}, {
    path: '',
    component: AdminLayoutComponent,
    children: [{
        path: '',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
    }, {
        path: 'components',
        loadChildren: './components/components.module#ComponentsModule'
    }, {
        path: 'forms',
        loadChildren: './forms/forms.module#Forms'
    }, {
        path: 'tables',
        loadChildren: './tables/tables.module#TablesModule'
    }, {
        path: 'maps',
        loadChildren: './maps/maps.module#MapsModule'
    }, {
        path: 'charts',
        loadChildren: './charts/charts.module#ChartsModule'
    }, {
        path: 'calendar',
        loadChildren: './calendar/calendar.module#CalendarModule'
    }, {
        path: '',
        loadChildren: './userpage/user.module#UserModule'
    }, {
        path: '',
        loadChildren: './projects/projects.module#ProjectsModule'
    }, {
        path: '',
        loadChildren: './timeline/timeline.module#TimelineModule'
    }, {
        path: '',
        loadChildren: './widgets/widgets.module#WidgetsModule'
    }]
}, {
    path: '',
    component: AuthLayoutComponent,
    children: [{
        path: '',
        loadChildren: './pages/pages.module#PagesModule'
    }]
}];

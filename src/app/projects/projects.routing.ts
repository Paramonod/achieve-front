import {Routes} from '@angular/router';

import {ProjectsComponent} from './projects.component';
import {AuthGuard} from '../shared/authentication/auth.guard';
import {CreateProjectComponent} from './create/createproject.component';

export const ProjectRoutes: Routes = [{
    path: '',
    children: [{
        canActivate: [AuthGuard],
        path: 'projects',
        component: ProjectsComponent
    }, {
        canActivate: [AuthGuard],
        path: 'projects/create',
        component: CreateProjectComponent
    }]
}];

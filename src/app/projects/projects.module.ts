import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { ProjectsComponent } from './projects.component';
import {ProjectRoutes} from './projects.routing';
import {CreateProjectComponent} from './create/createproject.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ProjectRoutes),
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [ProjectsComponent, CreateProjectComponent]
})

export class ProjectsModule {}

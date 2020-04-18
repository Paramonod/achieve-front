import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { PagesRoutes } from './pages.routing';

import { RegisterComponent } from './register/register.component';
import { LockComponent } from './lock/lock.component';
import { LoginComponent } from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import { ErrorComponent} from './error/error.component';
import {RegisterwizardComponent} from './registerwizard/registerwizard.component';
import {RegisterwizardService} from './registerwizard/registerwizard.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PagesRoutes),
        FormsModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
        LockComponent,
        LogoutComponent,
        ErrorComponent,
        RegisterwizardComponent
    ],
    providers: [RegisterwizardService]
})

export class PagesModule {}

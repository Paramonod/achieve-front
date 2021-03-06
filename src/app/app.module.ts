import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {Http, HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';

import {SidebarModule} from './sidebar/sidebar.module';
import {FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import {FooterModule} from './shared/footer/footer.module';
import {NavbarModule} from './shared/navbar/navbar.module';
import {AdminLayoutComponent} from './layouts/admin/admin-layout.component';
import {AuthLayoutComponent} from './layouts/auth/auth-layout.component';
import {CoreModule} from './shared/core.module';
import {ConfigService} from './shared/config.service';
import {AppRoutes} from './app.routing';
import {AuthCallbackComponent} from './auth-callback/auth-callback.component';
import {SilentCallbackComponent} from './silent-callback/silent-callback.component';
import {BrowserModule} from '@angular/platform-browser';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {ProjectRoutes} from './projects/projects.routing';
import {ProjectsModule} from './projects/projects.module';


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SimpleNotificationsModule.forRoot({
            timeOut: 4000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            clickIconToClose: true
        }),
        FormsModule,
        RouterModule.forRoot(AppRoutes, {
            useHash: true
        }),
        NgbModule.forRoot(),
        HttpModule,
        SidebarModule,
        NavbarModule,
        FooterModule,
        FixedPluginModule,
        CoreModule,
        HttpClientModule,
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        AuthLayoutComponent,
        AuthCallbackComponent,
        SilentCallbackComponent
    ],
    bootstrap: [AppComponent],
    providers: [ConfigService],
})

export class AppModule {
}

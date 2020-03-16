import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {APP_BASE_HREF} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';

import {SidebarModule} from './sidebar/sidebar.module';
import {FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import {FooterModule} from './shared/footer/footer.module';
import {NavbarModule} from './shared/navbar/navbar.module';
import {AdminLayoutComponent} from './layouts/admin/admin-layout.component';
import {AuthLayoutComponent} from './layouts/auth/auth-layout.component';
import {AppRoutes} from './app.routing';
import {MsalGuard, MsalModule} from '@azure/msal-angular';
import {MsalInterceptor} from '@azure/msal-angular';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {Logger} from 'msal';

const map0 = new Map<string, string[]>();
map0.set('https://graph.microsoft.com/v2.0/me', ['user.read', 'mail.send']);

@NgModule({
    imports: [
        MsalModule.forRoot({
            auth: {
                clientId: '1cc364b2-9bbd-4baa-9f63-bc0e8d9f79a3',
                authority: 'https://login.microsoftonline.com/common/',
                validateAuthority: true,
                redirectUri: 'https://localhost:4200/',
                postLogoutRedirectUri: 'https://localhost:4200/',
                navigateToLoginRequestUrl: true
            },
            cache: {
                cacheLocation: 'localStorage',
                storeAuthStateInCookie: true, // set to true for IE 11
            },
            framework: {
                unprotectedResources: ['https://www.microsoft.com/en-us/'],
            },
            system: {}
        }, {
            popUp: false,
            consentScopes: ['user.read', 'openid', 'profile'],
            extraQueryParameters: {}
        }),
        BrowserAnimationsModule,
        FormsModule,
        RouterModule.forRoot(AppRoutes, {
            useHash: true
        }),
        NgbModule.forRoot(),
        HttpModule,
        SidebarModule,
        NavbarModule,
        FooterModule,
        FixedPluginModule
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        AuthLayoutComponent,
    ],
    bootstrap: [AppComponent],
    providers: [],
})

export class AppModule {
}

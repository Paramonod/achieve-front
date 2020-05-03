import {Injectable} from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {HubConnection, HubConnectionState, IHttpConnectionOptions} from '@microsoft/signalr';
import {AdConnectModel} from '../models/ad-connect-model';
import {Observable} from 'rxjs';
import {ConfigService} from '../shared/config.service';
import {AuthService} from '../shared/authentication/auth.service';

@Injectable({
    providedIn: 'root'
})
export class SignalRService {
    private authHubName = 'auth';
    private userHubName = 'users';
    public authHubConnection: signalR.HubConnection;
    public userHubConnection: signalR.HubConnection;
    public domain;
    public domainSubscriber = new Observable((observer) => {
        this.authHubConnection.on('Connect', (data: AdConnectModel) => {
            observer.next(data);
            observer.complete();
        })
    });

    constructor(private configService: ConfigService, private authService: AuthService) {
        this.buildHubs();
        this.startConnections();
    }

    private buildHubs() {
        this.authHubConnection = this.buildConnection(this.authHubName);
    }

    private async startConnections() {
        await this.startConnection(this.authHubConnection);
    }


    public buildConnection = (hub: string) => {
        return new signalR.HubConnectionBuilder()
            .withUrl(this.configService.resourceApiURI + '/hubs/' + hub)
            .withAutomaticReconnect()
            .build()
    }

    public async startConnection(conn: HubConnection) {
        await conn
            .start()
            .then(() => {
                console.log('Connection started...');
            })
            .catch(err => {
                console.log('Error while connection: ' + err);

                setTimeout(function () {
                    this.startConnection(conn);
                }, 3000);
            })
    }


    public buildAuthorizedHubs() {
        var options: IHttpConnectionOptions = {
            accessTokenFactory: () => {
                return this.authService.JwtToken;
            }
        };

        this.userHubConnection = this.buildAuthorizedConnection(this.userHubName, options);
    }

    private startAuthorizedConnections() {
        this.startAuthorizedConnection(this.userHubConnection);
    }

    public buildAuthorizedConnection(hub: string, options: IHttpConnectionOptions) {
        return new signalR.HubConnectionBuilder()
            .withUrl(this.configService.resourceApiURI + '/hubs/' + hub, options)
            .build()
    }

    public async startAuthorizedConnection(conn: HubConnection) {
        await conn
            .start()
            .then(() => {
                console.log('Connection started...');
            })
            .catch(err => {
                console.log('Error while connection: ' + err);
                setTimeout(function () {
                    // this.startAuthorizedConnection(conn);
                }, 3000);
            })
    }

    public connect(data: AdConnectModel) {
        if (this.authHubConnection == null) {
            this.buildHubs()
        }
        if (this.authHubConnection.state != HubConnectionState.Connected) {
            this.startConnection(this.authHubConnection)
        }
        this.authHubConnection.invoke('Connect', data)
            .catch(err => console.error(err));
    }

}



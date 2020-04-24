import {Injectable} from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {HubConnection, HubConnectionState} from '@microsoft/signalr';
import {AdConnectModel} from '../models/ad-connect-model';
import {Observable} from 'rxjs';
import {ConfigService} from '../shared/config.service';

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

    constructor(private configService: ConfigService) {
        this.buildHubs();
        this.startConnections();
    }

    private buildHubs() {
        this.authHubConnection = this.buildConnection(this.authHubName);
        // this.userHubConnection = this.buildConnection(this.userHubName);
    }

    private startConnections() {
        this.startConnection(this.authHubConnection);
        // this.startConnection(this.userHubConnection);
    }


    public buildConnection = (hub: string) => {
        return new signalR.HubConnectionBuilder()
            .withUrl(this.configService.resourceApiURI + '/hubs/' + hub)
            .withAutomaticReconnect()
            .build()
    }

    public startConnection = (conn: HubConnection) => {
        conn
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

    public connect = (data: AdConnectModel) => {
        if (this.authHubConnection.state != HubConnectionState.Connected) {
            this.startConnection(this.authHubConnection)
        }
        this.authHubConnection.invoke('Connect', data)
            .catch(err => console.error(err));
    }

}



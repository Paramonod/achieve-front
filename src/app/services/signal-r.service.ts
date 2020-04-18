import {Injectable} from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {AdConnectModel} from '../models/ad-connect-model';

@Injectable({
    providedIn: 'root'
})
export class SignalRService {
    private hubConnection: signalR.HubConnection;

    constructor() {
        this.buildConnection();
        this.startConnection();
    }

    public buildConnection = () => {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://api.it108.org/hubs/auth')
            .withAutomaticReconnect()
            .build()
    }

    public startConnection = () => {
        this.registerEvents();
        this.hubConnection
            .start()
            .then(() => {
                console.log('Connection started...');
            })
            .catch(err => {
                console.log('Error while connection: ' + err);

                setTimeout(function () {
                    this.startConnection();
                }, 3000);
            })
    }

    public connect = (data: AdConnectModel) => {
        this.hubConnection.invoke('Connect', data)
            .catch(err => console.error(err));
    }

    public registerEvents() {
        this.hubConnection.on('Connect', (data: AdConnectModel) => {
            console.log(data);
        })
    }
}

import {Injectable} from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {AdConnectModel} from '../models/ad-connect-model';
import {RegisterwizardComponent} from '../pages/registerwizard/registerwizard.component';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SignalRService {
    private hubConnection: signalR.HubConnection;
    public domain;

    constructor() {
        this.buildConnection();
        this.startConnection();
        this.domain = new Observable((observer) => {
            let watchId: number;

            this.hubConnection.on('Connect', (data: AdConnectModel) => {
                observer.next(data);
            })

            // When the consumer unsubscribes, clean up data ready for next subscription.
            return {
                unsubscribe() {
                    navigator.geolocation.clearWatch(watchId);
                }
            };
        });
    }

    public buildConnection = () => {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://api.it108.org/hubs/auth')
            .withAutomaticReconnect()
            .build()
    }

    public startConnection = () => {
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

}



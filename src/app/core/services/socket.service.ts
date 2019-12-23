import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SocketService {

    private host = `${environment.host}:${environment.port}`;
    private socket: any;

    constructor() {
    }

    connect() {
        this.socket.on('connect', () => {
            console.log('[INFO] Connected to ws');
        });

        this.socket.on('disconnect', () => {
            console.log('[INFO] Disconnected from ws');
        });
    }

    on(event) {

        return new Observable(observer => {

            this.socket = io(this.host);

            this.socket.on(event, (data) => {
                observer.next(data);
            });

            return () => {
                this.socket.disconnect();
            };
        });

    }

}

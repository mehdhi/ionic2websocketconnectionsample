import {Injectable, Component, Inject} from 'angular2/core';
import {$WebSocket} from 'angular2-websocket/angular2-websocket';
import {bootstrap} from 'angular2/platform/browser';
  
@Injectable()
export class ConnectionService {

    private _status: number;

    //private connection: $WebSocket;

    constructor( private connection : $WebSocket = new $WebSocket("ws://echo.websocket.org") ) {

        console.log("Starting connection");

       //this.connection = new $WebSocket("ws://echo.websocket.org");
        
        this.connection.onClose(this.onCloseHandler);
        this.connection.onError(this.onErrorHandler);
        this.connection.onOpen(this.onOpenHandler);
        this.connection.onMessage(this.onRecieveHandler, {});

    }

    send() {
        var msg = {
            author: "author",
            message: "hi"
        }

        this.sendMessage(JSON.stringify(msg));
        console.log("send button fired");
    }

    public connect() {
        this.connection.connect(true);
    }

    public disconnect() {
        this.connection.close(false);
    }

    private reconnect() {
        this.connection.reconnect();
    }

    public sendMessage(msg: any) {
        this.connection.send(msg);
    }

    private onRecieveHandler(evt: MessageEvent) {
        console.log("Recieved Data From Server\nData: " + evt.data);
       
    }

    private onErrorHandler(evt: Event) {
        console.log('Sorry, '
            + 'but there s some problem with your '
            + 'socket or the server is down'
            + "\nError: " + JSON.stringify(evt));
       
    }

    private onOpenHandler(evt: Event) {
        console.log('Server connected ');
    }

    private onCloseHandler(evt: CloseEvent) {
        console.log('Sorry, '
            + 'but there s some problem with your '
            + 'socket or the server is down' + evt.code);

    }

}
bootstrap(ConnectionService, [$WebSocket]);
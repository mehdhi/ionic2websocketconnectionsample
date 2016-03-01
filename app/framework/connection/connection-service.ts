import {Injectable, Component, Inject, provide} from 'angular2/core';
import {$WebSocket} from 'angular2-websocket/angular2-websocket';
import {bootstrap} from 'angular2/platform/browser';
import {Http} from 'angular2/http';
  
@Component({
  providers: [ provide( $WebSocket, { useValue: new $WebSocket("ws://echo.websocket.org") } ) ]
})
@Injectable()
export class ConnectionService {

    private _status: number;

    constructor( private connection : $WebSocket ) {

        console.log("Starting connection");      
        this.connection.onClose(this.onCloseHandler);
        this.connection.onError(this.onErrorHandler);
        this.connection.onOpen(this.onOpenHandler);
        this.connection.onMessage(this.onRecieveHandler, {});

    }

    getData(){
        return "Hello";
    }
    send() {
        var msg = {
            author: "tymspy",
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

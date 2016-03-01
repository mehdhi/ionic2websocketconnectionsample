import {App, Platform} from 'ionic-framework/ionic';
import {TabsPage} from './pages/tabs/tabs';
import {ConnectionService} from './framework/connection/connection-service'
import {$WebSocket} from 'angular2-websocket/angular2-websocket';
import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {Http} from 'angular2/http';

// https://angular.io/docs/ts/latest/api/core/Type-interface.html
import {Type} from 'angular2/core';


@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {},
  providers : [ provide( $WebSocket, { useValue: new $WebSocket("ws://echo.websocket.org") }), ConnectionService]
})
export class MyApp {
  rootPage: Type = TabsPage;

  constructor(platform: Platform, private conn : ConnectionService) {
    platform.ready().then(() => {
      this.conn.connect();
      console.log(this.conn.getData());
      this.conn.send();
    });
  }
}

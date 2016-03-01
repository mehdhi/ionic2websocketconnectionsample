import {App, Platform} from 'ionic-framework/ionic';
import {TabsPage} from './pages/tabs/tabs';
import {ConnectionService} from './framework/connection/connection-service'
import {$WebSocket} from 'angular2-websocket/angular2-websocket';
import {bootstrap} from 'angular2/platform/browser';

// https://angular.io/docs/ts/latest/api/core/Type-interface.html
import {Type} from 'angular2/core';


@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {}
})
export class MyApp {
  rootPage: Type = TabsPage;

  constructor(platform: Platform, private conn : ConnectionService) {
    platform.ready().then(() => {
      this.conn.connect();
    });
  }
}
bootstrap(MyApp, [$WebSocket, ConnectionService]);
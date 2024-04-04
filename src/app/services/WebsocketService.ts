import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
var SockJs = require("sockjs-client");
var Stomp = require("stompjs");

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private subject: WebSocketSubject<any> | null = null;
  stompClient: any;

  constructor() {}

  public connect() {
    let socket = new SockJs(`http://localhost:8080/websocket`);

    let stompClient = Stomp.over(socket);

    return stompClient;
  }

  public sendMessage(message: any) {
    if (this.subject) {
      this.subject.next(message);
    } else {
      console.error('WebSocket not connected!');
    }
  }

  public closeConnection() {
    if (this.subject) {
      this.subject.complete();
      this.subject = null;
    }
  }
}

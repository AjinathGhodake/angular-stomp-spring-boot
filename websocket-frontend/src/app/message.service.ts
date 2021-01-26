import { Injectable } from '@angular/core';
declare var SockJS;
declare var Stomp;
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor() {
    this.initializeWebSocketConnection();
  }
  public stompClient;
  public msg = [];
  initializeWebSocketConnection() {
    const serverUrl = 'http://localhost:8082/socket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, (frame) => {
      that.stompClient.subscribe('/message', (message) => {
        if (message.body) {
          that.msg.push(message.body);
        }
      });
      that.stompClient.subscribe(
        `/user/${frame.headers['user-name']}/queue`,
        (message) => {
          if (message.body) {
            that.msg.push(message.body);
          }
        }
      );
    });
  }

  sendMessage(message) {
    this.stompClient.send('/app/send/message', {}, message);
  }
  sendMessageToUser(message) {
    this.stompClient.send('/app/send/hello', {}, message);
  }
}

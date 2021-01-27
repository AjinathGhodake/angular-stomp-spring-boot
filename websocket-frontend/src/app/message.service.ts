import { Injectable } from "@angular/core";
declare var SockJS;
declare var Stomp;
export enum MessageType {
  CHAT,
  JOIN,
  LEAVE,
}

export interface IChatMessage {
  type: MessageType;
  content: string;
  sender: string;
}
export class ChatMessage implements IChatMessage {
  type: MessageType;
  content: string;
  sender: string;
  constructor(type: string, content: string, sender: string) {
    this.type = MessageType.JOIN;
    this.content = content;
    this.sender = sender;
  }
}
@Injectable({
  providedIn: "root",
})
export class MessageService {
  constructor() {
    this.initializeWebSocketConnection();
  }
  public stompClient;
  public msg: ChatMessage[] = [];
  initializeWebSocketConnection() {
    const serverUrl = "http://localhost:8082/socket";
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, (frame) => {
      that.stompClient.subscribe("/register", ({ body }) => {
        that.msg.push(JSON.parse(body));
      });
      that.stompClient.subscribe("/queue/public", ({ body }) => {
        that.msg.push(JSON.parse(body));
      });
      that.stompClient.subscribe(
        `/user/${frame.headers["user-name"]}/queue`,
        (message) => {
          if (message.body) {
            that.msg.push(JSON.parse(message.body));
          }
        }
      );
    });
  }
  addUser(message) {
    this.stompClient.send("/app/chat.addUser", {}, JSON.stringify(message));
  }
  sendMessage(message) {
    this.stompClient.send("/app/send", {}, JSON.stringify(message));
  }
  sendMessageToUser(message) {
    this.stompClient.send("/app/send/user", {}, JSON.stringify(message));
  }
}

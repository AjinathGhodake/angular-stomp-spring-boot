import { Component } from "@angular/core";
import { ChatMessage, MessageService, MessageType } from "./message.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "websocket-frontend";
  input;
  user;
  constructor(private messageService: MessageService) {}
  sendMessage() {
    if (this.input && this.user) {
      const chatMessage: ChatMessage = {
        sender: this.user,
        content: this.input,
        type: MessageType.CHAT,
      };
      this.messageService.sendMessage(chatMessage);
      this.input = "";
    }
  }
  addUser() {
    if (this.user) {
      const chatMessage: ChatMessage = {
        sender: this.user,
        content: "Connected user " + this.user,
        type: MessageType.JOIN,
      };
      this.messageService.addUser(chatMessage);
    }
  }
  sendMessageToUser() {
    if (this.input && this.user) {
      const chatMessage: ChatMessage = {
        sender: this.user,
        content: this.input,
        type: MessageType.CHAT,
      };
      this.messageService.sendMessageToUser(chatMessage);
      this.input = "";
    }
  }
}

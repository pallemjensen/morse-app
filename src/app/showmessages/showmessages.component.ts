import { Component, OnInit } from '@angular/core';
import {MessageService} from '../message/shared/message.service';
import {Subscription} from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-showmessages',
  templateUrl: './showmessages.component.html',
  styleUrls: ['./showmessages.component.scss']
})
export class ShowmessagesComponent {

  messages: any[];
  subMessages: Subscription;
  latest: any;

  constructor(private messageService: MessageService) {
    this.subMessages = this.messageService.getMessagesLastByLimit(10)
      .subscribe(messages => {
        this.messages = messages;
        this.latest = messages[0];
      });
  }

  convertMessage(message: string): string {
    return this.messageService.convertToText(message);
  }

}

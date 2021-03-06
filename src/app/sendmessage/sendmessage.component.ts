import {Component, OnInit} from '@angular/core';
import {MessageService} from '../message/shared/message.service';
import {Observable} from 'rxjs/internal/Observable';
import {Subscription} from 'rxjs/internal/Subscription';


@Component({
  selector: 'app-sendmessage',
  templateUrl: './sendmessage.component.html',
  styleUrls: ['./sendmessage.component.scss']
})
export class SendmessageComponent  {


  title = 'Palles';
  messages: any[];
  messagesPaged: Observable<any[]>;
  latest: any;
  message = '';
  humanReadableMessage = '';
  time: number;
  subMessages: Subscription;

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


  space() {
    this.message += '/';
    this.humanReadableMessage = this.messageService.convertToText(this.message);
  }

  send() {
    const time = new Date();
    this.messageService.addMessage(time, this.message.trim()).then(done => {
      console.log('saved');
    }, err => {
      console.log(err);
    });
    this.clear();
  }

  morse(active) {
    if (active) {
      this.time = (new Date()).getTime();
    } else {
      const clickTime = (new Date()).getTime() - this.time;
      if (clickTime > 120) {
        this.message += '-';
      } else {
        this.message += '.';
      }
      this.time = -1;
    }
  }

  next() {
    this.message += ' ';
    this.humanReadableMessage = this.messageService.convertToText(this.message);
  }

  clear() {
    this.message = '';
    this.humanReadableMessage = '';
  }


}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MessageComponentComponent} from './message-component/message-component.component';
import { Component} from '@angular/core';
import {ShowmessagesComponent} from './showmessages/showmessages.component';
import {SendmessageComponent} from './sendmessage/sendmessage.component';


const routes: Routes = [
  { path: 'message', component: MessageComponentComponent},
  { path: 'main', component: Component},
  { path: 'showmessages', component: ShowmessagesComponent},
  { path: 'sendmessage', component: SendmessageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    CommonModule]
  ,exports: [RouterModule],
})
export class AppRoutingModule { }

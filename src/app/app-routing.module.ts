import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MessageComponentComponent} from './message-component/message-component.component';
import { Component} from '@angular/core';


const routes: Routes = [
  { path: 'message', component: MessageComponentComponent},
  { path: 'main', component: Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    CommonModule]
  ,exports: [RouterModule],
})
export class AppRoutingModule { }

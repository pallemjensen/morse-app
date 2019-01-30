import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import {MessageService} from './message/shared/message.service';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { MessageComponentComponent } from './message-component/message-component.component';
import { AppRoutingModule } from './app-routing.module';
import { ShowmessagesComponent } from './showmessages/showmessages.component';
import { SendmessageComponent } from './sendmessage/sendmessage.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponentComponent,
    ShowmessagesComponent,
    SendmessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    MomentModule, AppRoutingModule
  ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

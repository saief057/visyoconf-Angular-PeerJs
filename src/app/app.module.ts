import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {SocketIoModule} from "ngx-socket-io";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { VisyoCoRoomComponent } from './visyo-co-room/visyo-co-room.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VisyoCoRoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot({
      url: '/'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

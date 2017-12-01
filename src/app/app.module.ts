import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { AppComponent } from './app.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAcDzMU79ou1QE5OvZm4JfpfkM8f2gwPno",
      authDomain: "day-of.firebaseapp.com",
      databaseURL: "https://day-of.firebaseio.com",
      projectId: "day-of",
      storageBucket: "day-of.appspot.com",
      messagingSenderId: "131965932953"
    }),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

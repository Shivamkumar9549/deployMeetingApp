import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TimepickerComponent } from './timepicker/timepicker.component';


@NgModule({
  declarations: [
    AppComponent,
    TimepickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
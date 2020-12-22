import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HopdongComponent } from './hopdong/hopdong.component';
import { NgxPrintModule } from 'ngx-print';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HopdongComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPrintModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

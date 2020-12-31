import { LichSuComponent } from './hopdong/lichsu/lichsu.component';
import { TienTePipe } from './hopdong/pipecustom/currency.pipe';
import { ToastrModule } from 'ngx-toastr';
import { HopDongPopup } from './hopdong/popup/hopdop.popup';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HopdongComponent } from './hopdong/hopdong.component';
import { NgxPrintModule } from 'ngx-print';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { QuanLyPopUp } from './hopdong/popupQL/quanly.popup';
import { MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS, MAT_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR } from '@angular/material/button-toggle';
import { MAT_DATE_LOCALE } from '@angular/material/core';
@NgModule({
  declarations: [
    AppComponent,
    HopdongComponent,
    HopDongPopup,
    TienTePipe,
    QuanLyPopUp,
    LichSuComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPrintModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    HttpClientModule,
    FilterPipeModule,
    ToastrModule.forRoot(),


  ],
  providers: [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' }},
              {provide: MAT_DATE_LOCALE, useValue:'vi-VN'}                
],
  bootstrap: [AppComponent]
})
export class AppModule { }

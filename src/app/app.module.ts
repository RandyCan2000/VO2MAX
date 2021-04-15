import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { GraphlineComponent } from './component/graphline/graphline.component';
import { HomeComponent } from './component/home/home.component';
import { ReportsComponent } from './component/reports/reports.component';
import { RecordComponent } from './component/record/record.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http'

//Angular Material
import { ListadoComponent } from './component/listado/listado.component';
import { MaterialModule } from './material/material.module' 
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    GraphlineComponent,
    HomeComponent,
    ReportsComponent,
    RecordComponent,
    ListadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ListadoComponent
  ]
})
export class AppModule { }

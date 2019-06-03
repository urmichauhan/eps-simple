import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
@NgModule({   
    imports: [
        AppModule,
        BrowserModule.withServerTransition({ appId: 'ssr-example' }),  
    ],
 
    bootstrap: [AppComponent],
 
})
export class BrowserAppModule  { }
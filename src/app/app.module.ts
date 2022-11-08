import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ImageComponent } from './components/Image.component';
import { NgxCaptureModule } from 'ngx-capture';

declare var jquery: any;
declare var $: any;

@NgModule({
  declarations: [AppComponent, ImageComponent],
  imports: [BrowserModule, AppRoutingModule, SlickCarouselModule, NgxCaptureModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

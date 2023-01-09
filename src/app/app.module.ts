import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ThreeCanvasComponent } from './three-canvas/three-canvas.component';

@NgModule({
  declarations: [
    AppComponent,
    ThreeCanvasComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ThreeCanvasComponent } from './three-canvas/three-canvas.component';
import { EarthPaneComponent } from './three-canvas/earth-pane/earth-pane.component';
import { MoonsPaneComponent } from './three-canvas/moons-pane/moons-pane.component';

@NgModule({
  declarations: [
    AppComponent,
    ThreeCanvasComponent,
    EarthPaneComponent,
    MoonsPaneComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

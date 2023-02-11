import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ThreeCanvasComponent } from './three-canvas/three-canvas.component';
import { EarthPaneComponent } from './three-canvas/earth-pane/earth-pane.component';
import { MoonsPaneComponent } from './three-canvas/moons-pane/moons-pane.component';
import { MousePaneComponent } from './three-canvas/mouse-pane/mouse-pane.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
// import {NgbdNavBasic} from './three-canvas/earth-pane/accordion/accordion-static';

@NgModule({
  declarations: [
    AppComponent,
    ThreeCanvasComponent,
    EarthPaneComponent,
    MoonsPaneComponent,
    MousePaneComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    NgbModule,
    NgbNavModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    FormsModule,
    JsonPipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

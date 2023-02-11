import { Component, Input } from '@angular/core';
import { ResourceData } from '../three-models';

@Component({
  selector: 'ds-earth-pane',
  templateUrl: './earth-pane.component.html',
  styleUrls: ['./earth-pane.component.scss']
})
export class EarthPaneComponent {

  active = 1;

  @Input() paneInfo = {} as ResourceData;

  public getEarthName() {
    return this.paneInfo.name;
  }
  public getDescription() {
    return this.paneInfo.description;
  }
}
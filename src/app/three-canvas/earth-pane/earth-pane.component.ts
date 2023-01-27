import { Component, Input } from '@angular/core';
import { ResourceData } from '../three-models';

@Component({
  selector: 'ds-earth-pane',
  templateUrl: './earth-pane.component.html',
  styleUrls: ['./earth-pane.component.scss']
})
export class EarthPaneComponent {

  @Input() paneInfo = {} as ResourceData;

  public getEarthName() {
    return this.paneInfo.name;
  }
}

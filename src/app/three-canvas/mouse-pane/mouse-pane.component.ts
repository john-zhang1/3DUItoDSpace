import { Component, Input } from '@angular/core';
import { UserObject } from '../three-models';

@Component({
  selector: 'ds-mouse-pane',
  templateUrl: './mouse-pane.component.html',
  styleUrls: ['./mouse-pane.component.scss']
})
export class MousePaneComponent {
  @Input() paneInfo = {} as UserObject;

  public getPaneInfoName() {
    let name: string = '';
    let rd = this.paneInfo.resourcedata;
    if(typeof rd !== 'undefined') {
      if(typeof name !== 'undefined') {
        name = rd.name;
      }
    }
    return name;
  }

}

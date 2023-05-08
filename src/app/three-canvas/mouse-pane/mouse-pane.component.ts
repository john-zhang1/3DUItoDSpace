import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { ResourceType, UserObject } from '../three-models';

@Component({
  selector: 'ds-mouse-pane',
  templateUrl: './mouse-pane.component.html',
  styleUrls: ['./mouse-pane.component.scss']
})
export class MousePaneComponent implements OnInit, AfterViewInit {
  @Input() paneInfo = {} as UserObject;

  ngOnInit() {}
  ngAfterViewInit() {}

  public getPaneInfoName1() {
    let name: string = '';
    let rtype: ResourceType;
    let strength: number = 0;
    let rd = this.paneInfo.resourcedata;
    if(typeof rd !== 'undefined') {
      name = rd.name;
      rtype = rd.resourcetype;
      strength = rd.strength as number;
      if(typeof rd.name !== 'undefined' && typeof rd.resourcetype !== 'undefined') {
        if (rd.resourcetype === ResourceType.COMMUNITY || rd.resourcetype === ResourceType.COLLECTION) {
          return rd.name + " [" + strength +"]";
        }
      }
    }
    return name;    
  }

  public getPaneResourceData() {
    let rd = this.paneInfo.resourcedata;
    if(typeof rd !== 'undefined') {
      return rd;
    } else {
      return null;
    }
  }

}

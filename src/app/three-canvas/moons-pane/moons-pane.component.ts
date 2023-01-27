import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { UserObject } from '../three-models';
import { SITEDATASET, COMMUNITYDATASET, COLLECTIONDATASET } from '../mock-data';

@Component({
  selector: 'ds-moons-pane',
  templateUrl: './moons-pane.component.html',
  styleUrls: ['./moons-pane.component.scss']
})
export class MoonsPaneComponent implements OnInit, AfterViewInit {

  @Input() paneInfo = {} as UserObject;

  ngOnInit() { }

  ngAfterViewInit(): void { }

  private getPaneInfoChildren() {
    let info: number[] = [];
    let rd = this.paneInfo.resourcedata;
    if(typeof rd !== 'undefined') {
      let info = rd.children;
      if(typeof info !== 'undefined') {
        return info;
      }
    }
    return info;
  }

  public getPaneInfo() {
    let names: string[] = [];
    let children = this.getPaneInfoChildren();
    if(children.length === 0) {
      names.push("This is a Collection");
    }
    children.forEach((id) => {
      let name = this.getObjName(id);
      if(name !== '') {
        names.push(name);
      }
    })
    return names;
  }

  private getObjName(id: number) {
    let name: string = '';
    let communities = COMMUNITYDATASET;
    let collections = COLLECTIONDATASET;
    communities.forEach((community) => {
      if(community.handleID === id) {
        name = community.name;
      }
    })
    collections.forEach((collection) => {
      if(collection.handleID === id) {
        name = collection.name;
      }
    })
    return name;
  }

}

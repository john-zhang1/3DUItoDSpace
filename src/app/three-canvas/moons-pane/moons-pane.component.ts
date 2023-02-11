import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { MoonPair, ResourceData, UserObject } from '../three-models';
import { SITEDATASET, COMMUNITYDATASET, COLLECTIONDATASET } from '../mock-data';
import { Output, EventEmitter } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
  selector: 'ds-moons-pane',
  templateUrl: './moons-pane.component.html',
  styleUrls: ['./moons-pane.component.scss']
})
export class MoonsPaneComponent implements OnInit, AfterViewInit {

  @Input() paneInfo = {} as UserObject;

  @Output() newItemEvent = new EventEmitter<number>();
  @Output() selectedItemEvent = new EventEmitter<number>();

  @Input() constResources = new Map<number, ResourceData>();

  public browseID: number = -1;

  public currentPage = 1;
  public pageSize: number = 10;
  public collectionSize: number = 0;
  public moons = [] as MoonPair[];

  ngOnInit() {
    this.moons = this.loadResourceMoonPair();
  }

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

  private getPaneInfoCollectionName() {
    let name: string = '';
    let rd = this.paneInfo.resourcedata;
    if(typeof rd !== 'undefined') {
      if(typeof name !== 'undefined') {
        name = rd.name;
      }
    }
    return name;
  }

  public getPaneInfo() {
    let names: string[] = [];
    let children = this.getPaneInfoChildren();
    if(children.length === 0) {
      names.push("Collection: " + this.getPaneInfoCollectionName());
    }
    children.forEach((id) => {
      let name = this.getObjName(id);
      if(name !== '') {
        names.push(name);
      }
    })
    return names;
  }

  public getObjName(id: number) {
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

  public getPaneResourceData() {
    let rd = this.paneInfo.resourcedata;
    if(typeof rd !== 'undefined') {
      return rd;
    } else {
      return null;
    }
  }

  public getMoonsPanePairs() {
    let pairs: MoonPair[] = [];
    let pair = {} as MoonPair;
    let rd = this.paneInfo.resourcedata;
    if(typeof rd !== 'undefined') {
      let children = rd.children
      if(typeof children !== 'undefined') {
        children.forEach((child) => {
          pair.id = child;
          pair.name = this.getObjName(child);
          pairs.push(pair);
        })    
      }
    }
    return pairs;
  }

  public loadResourceMoonPair() {
    let pairs = [] as MoonPair[];
    this.constResources.forEach((mapItem) => {
      let pair = {} as MoonPair;
      pair.id = mapItem.handleID as number;
      pair.name = mapItem.name;
      pairs.push(pair);
    })
    return pairs;
  }

  public browseById(id: number) {
    this.newItemEvent.emit(id);
  }

  public selectedItem(item: any) {
    this.selectedItemEvent.emit((item.item as MoonPair).id);
  }


  public getCollectionSize() {
    return this.getPaneInfoChildren().length;
  }

  public getClass() {
    return this.getCollectionSize() > this.pageSize ? 'pactive' : 'depactive';
  }

  public clickedItem: number = - 1;


  public model!:  MoonPair;

  formatter = (item: MoonPair) => item.name;

	search: OperatorFunction<string, readonly { id: number; name: string }[]> = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(200),
			distinctUntilChanged(),
			filter((term) => term.length >= 2),
			map((term) => this.moons.filter((moon) => new RegExp(term, 'mi').test(moon.name)).slice(0, 10)),
		);

}
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { FlatResourceNode, MoonPair, ResourceData, UserObject } from '../three-models';
import { COMMUNITYDATASET, COLLECTIONDATASET, SITEDATASET } from '../mock-data';
import { Output, EventEmitter } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { FlatTreeControl } from '@angular/cdk/tree';
import { ArrayDataSource } from '@angular/cdk/collections';

@Component({
  selector: 'ds-moons-pane',
  templateUrl: './moons-pane.component.html',
  styleUrls: ['./moons-pane.component.scss']
})
export class MoonsPaneComponent implements OnInit, AfterViewInit {

  @Input() paneInfo = {} as UserObject;

  @Output() browseItemEvent = new EventEmitter<number>();
  @Output() selectedItemEvent = new EventEmitter<number>();
  @Output() openCloseItemEvent = new EventEmitter<number>();

  @Input() constResources = new Map<number, ResourceData>();
  @Input() showlist = false;

  public browseID: number = -1;

  public currentPage = 1;
  public pageSize: number = 10;
  public collectionSize: number = 0;
  public moons = [] as MoonPair[];

  public flatNodes: FlatResourceNode[] = [];
  public flatNodeLevel = 0;
  public levelHelperMap = new Map<number, number>();
  public TREE_DATA: FlatResourceNode[] = [];
  public dataSource!: ArrayDataSource<FlatResourceNode>;

  ngOnInit() {
    this.moons = this.loadResourceMoonPair();
    this.formFlatNodes(0);
    this.flatNodes.shift();
    this.TREE_DATA = this.flatNodes;
    this.dataSource = new ArrayDataSource(this.TREE_DATA);
  }

  ngAfterViewInit(): void {}

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
    console.log("names: "+names);
    return names;
  }

  public getObjName(id: number) {
    this.showlist = true;
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
    this.browseItemEvent.emit(id);
  }

  public openCloseById(id: number) {
    this.openCloseItemEvent.emit(id);
  }

  public onSelect(item: any, input: HTMLInputElement) {
    item.preventDefault();
    this.selectedItemEvent.emit((item.item as MoonPair).id);
    input.value = '';
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

  treeControl = new FlatTreeControl<FlatResourceNode>(
    node => node.level, node => node.expandable);

  // dataSource = new ArrayDataSource(this.TREE_DATA);

  hasChild = (_: number, node: FlatResourceNode) => node.expandable;

  getParentNode(node: FlatResourceNode) {
    const nodeIndex = this.TREE_DATA.indexOf(node);

    for (let i = nodeIndex - 1; i >= 0; i--) {
      if (this.TREE_DATA[i].level === node.level - 1) {
        return this.TREE_DATA[i];
      }
    }

    return null;
  }

  shouldRender(node: FlatResourceNode) {
    const parent = this.getParentNode(node);
    return !parent || parent.isExpanded;
  }

  public getFlatNodes() {
    return new ArrayDataSource(this.flatNodes);
  }

  private formFlatNodesByID(rootID: number) {
    let rd = JSON.parse(JSON.stringify(this.findResourceDataByID(rootID))) as ResourceData;
    let node = {} as FlatResourceNode;
    node.id = rd.handleID as number;
    node.name = rd.name;
    node.strength = rd.strength as number;
    if(this.levelHelperMap.size === 0) {
      this.levelHelperMap.set(rootID, 0);
    }
    node.level = this.levelHelperMap.get(rootID) as number;

    let childIDs = rd.children;
    node.expandable = rd.children.length > 0 ? true : false;
    this.flatNodes.push(node);

    if(childIDs.length > 0) {
      childIDs.forEach((cid) => {
        this.levelHelperMap.set(cid, this.levelHelperMap.get(rootID) as number + 1);
      })
    }
    while(childIDs.length > 0) {
      let cid = childIDs.shift() as number;
      this.formFlatNodesByID(cid);
    }   
  }

  // Community / Collection list, from site 0
  private formFlatNodes(rootID: number) {
    let rd = JSON.parse(JSON.stringify(this.findResourceDataByID(rootID))) as ResourceData;
    let node = {} as FlatResourceNode;
    node.id = rd.handleID as number;
    node.name = rd.name;
    node.strength = rd.strength as number;
    if(this.levelHelperMap.size === 0) {
      this.levelHelperMap.set(rootID, -1);
    }
    node.level = this.levelHelperMap.get(rootID) as number;
    let childIDs = rd.children;
    node.expandable = rd.children.length > 0 ? true : false;
    this.flatNodes.push(node);

    if(childIDs.length > 0) {
      childIDs.forEach((cid) => {
        this.levelHelperMap.set(cid, this.levelHelperMap.get(rootID) as number + 1);
      })
    }
    while(childIDs.length > 0) {
      let cid = childIDs.shift() as number;
      this.formFlatNodes(cid);
    }   
  }

  private findResourceDataByID(id: number) {
    let alldata: ResourceData[] = [];
    alldata.push(...SITEDATASET);
    alldata.push(...COMMUNITYDATASET);
    alldata.push(...COLLECTIONDATASET);
    let cc = {} as ResourceData;
    for(let i=0;i<alldata.length;i++) {
      if(alldata[i].handleID === id) {
        cc = alldata[i];
        break;
      }
    }
    return cc;
  }
}
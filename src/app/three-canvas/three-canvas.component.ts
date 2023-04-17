import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import * as TWEEN from '@tweenjs/tween.js';
// import { GUI } from 'dat.gui';
import { UserObject, ResourceData, ItemResourceData , SpherePacking, PackingHelper, ResourceType, NestedResourceNode } from './three-models';
import { SITEDATASET, COMMUNITYDATASET, COLLECTIONDATASET } from './mock-data';
import { ITEMDATASET, ITEMDATASET2 } from './mock-item-data';
import { Mesh, Vector2, Vector3 } from 'three';

@Component({
  selector: 'ds-three-canvas',
  templateUrl: './three-canvas.component.html',
  styleUrls: ['./three-canvas.component.scss']
})
export class ThreeCanvasComponent implements OnInit, AfterViewInit {

  ngOnInit() {
    this.loadData();
    this.earthPane = SITEDATASET[0];
  }

  public renderer!: THREE.WebGLRenderer;
  public scene!: THREE.Scene;
  public camera!: THREE.PerspectiveCamera;
  public mesh!: THREE.Mesh;
  public light: THREE.AmbientLight | any;

  // Stage Properties
  public cameraZ = 100;
  public fieldOfView = 90;
  public nearClippingPlane = 1;
  public farClippingPlane = 25000;
  // Helper Properties

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
  public loder = new THREE.TextureLoader();
  public geometry = new THREE.SphereGeometry(1.5, 32, 32);

  // * Old variables from Connection
  public radius = 1650;
  public tilt = 0.41;
  public floatTween = new TWEEN.Tween({x:0, y:0, z:0});
  public touchTween = new TWEEN.Tween({x:0, y:0, z:0});
  public controls!: TrackballControls;
  public mouseClock = new THREE.Clock();  // added Timer to calculate duration between automatic tweens
  public mouseupTime: number = 0;
  public indexCurrent = 0;

  public meshArray: THREE.Mesh[] = [];
  public meshMap = new Map<number, Mesh>();
  public lines: THREE.Line[] = [];
  public lineMap = new Map<string, THREE.Line>();
  public resourcedataMap = new Map<number, ResourceData>();
  public itemResourcedataMap = new Map<string, ItemResourceData>();
  public resourceNodes: NestedResourceNode[] = [];

  public targetRotationX = 0.05; // rotation vars, tweak these to tweak the speed while rotating an object
  public targetRotationY = 0.05;

  public currentObj = new THREE.Mesh();
  public viewDistance = 4 * this.radius;

  public theObjects = ['Sun', 'Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];
  public objectTex = ['0xfff8a3', '0xdfb47f', '0xb46b1c', '0x235c77', '0xa25714', '0xd29a69', '0xf5c583', '0x95adb9', '0x6086e7'];
  public objectRadius = [50, 100, 150, 150, 150, 150, 150, 150, 150];
  // Array that stores pictures
  public planetPics = ['assets/textures/earth_atmos_2048.jpg', 'assets/textures/earthbump1k.jpg', 'assets/textures/earthmap1k.jpg', 'assets/textures/jupiter2_1k.jpg', 'assets/textures/land_ocean_ice_cloud_2048.jpg', 'assets/textures/mars_1k_color.jpg', 'assets/textures/mercurymap.jpg', 'assets/textures/saturnmap.jpg', 'assets/textures/neptunemap.jpg'];
  public look = new THREE.Vector3(0, 0, 0);
  public pics = ['assets/textures/new/earth_color.jpg', 'assets/textures/new/jupiter_color.jpg', 'assets/textures/new/mars_color.jpg', 'assets/textures/new/neptune_color.jpg', 'assets/textures/new/pluto_color.jpg', 'assets/textures/new/saturn_color.jpg', 'assets/textures/new/venus_color.jpg'];

  // public gui = new GUI();
  // public cubeFolder!: GUI;

  public INTERSECTED = new THREE.Mesh();
  public INTERSECTEDMTAERIAL: any = null;

  public earthPane = {} as ResourceData;
  public moonsPane = {} as UserObject;
  public mousePane = {} as UserObject;
  public showListOnMoons = false;

  public matMenuTimer: any;

  @ViewChild('canvas')
  public canvasRef!: ElementRef;

  @HostListener('window:click', ['$event'])
  onDocumentMouseDown(event: MouseEvent) {
    this.matMenuTimer = setTimeout( () => {this.singleClickOnMesh(event);}, 150);
  }

  public async singleClickOnMesh(event: MouseEvent) {
    if (!this.matMenuTimer) return;
    event.preventDefault();
    TWEEN.removeAll();
    // const vector = new THREE.Vector3((event.clientX / this.canvas.clientWidth) * 2 - 1, - (event.clientY / this.canvas.clientHeight) * 2 + 1, 0.5);
    const look = new THREE.Vector3();
    const raycaster = new THREE.Raycaster();
    const mouse = this.getMouse(event);
    // this.camera.updateMatrixWorld();
    raycaster.setFromCamera( mouse, this.camera );
    const intersects = raycaster.intersectObjects( this.meshArray, false );
    const moveCam = (camiX: number, camiY: number, camiZ: number, look: THREE.Vector3) => {
      this.camera.position.x = camiX;
      this.camera.position.y = camiY;
      this.camera.position.z = camiZ;
      this.camera.lookAt(look);
      this.camera.updateProjectionMatrix();
    }
    if (intersects.length > 0 ) {
      this.showListOnMoons = true;
      this.intersectionRestore();
      // Info pane
      this.earthPane = this.getEarthPaneInfo(intersects[0].object as THREE.Mesh);
      this.moonsPane = this.getMoonsPaneInfo(intersects[0].object as THREE.Mesh); 
      if((intersects[0].object.userData as UserObject).resourcedata.resourcetype === ResourceType.COMMUNITY) {
        // this.earthPane = this.getEarthPaneInfo(intersects[0].object as THREE.Mesh);
        // this.moonsPane = this.getMoonsPaneInfo(intersects[0].object as THREE.Mesh);  
      }
      else if((intersects[0].object.userData as UserObject).resourcedata.resourcetype === ResourceType.COLLECTION) {
        let uid = (intersects[0].object.userData as UserObject).resourcedata.uuid as string;
        let itemdataset = this.findItemsByCollectionUuid(uid);

      }

      let cx = intersects[0].object.position.x;
      let cy = intersects[0].object.position.y;
      let cz = intersects[0].object.position.z;  
      if(!(cx==0 && cy==0 && cz==0)) {
        this.controls.enabled = false;
        TWEEN.removeAll();
        this.touchTween = new TWEEN.Tween( {x: this.camera.position.x, y: this.camera.position.y, z: this.camera.position.z} )
          .to( {x: intersects[0].object.position.x, y: intersects[0].object.position.y, z: intersects[0].object.position.z }, 400 )
          .easing(TWEEN.Easing.Cubic.InOut)
          .onUpdate(function(o) {
            moveCam(o.x, o.y, o.z, look)
          })
          .start()
          await new Promise(f => setTimeout(f, 400));
          this.controls.enabled = true;
          // this.createGroupMeshes(intersects[0].object as THREE.Mesh);
          (document.querySelector('.mouse') as HTMLElement).style.display = 'none';
      } else {
        this.controls.enabled = true;
      }
      // this.setupDatGui(intersects[0].object as THREE.Mesh);
    } else {
      this.controls.enabled = true;
      this.targetRotationX = 0;
      this.targetRotationX = 0;
    }
  }

  @HostListener('window:dblclick', ['$event'])
  onDocumentMouseDownDBLClick(event: MouseEvent) {
    clearTimeout(this.matMenuTimer);
    this.matMenuTimer = undefined;

    event.preventDefault();
    this.intersectionRestore();
    const raycaster = new THREE.Raycaster();
    const mouse = this.getMouse(event);
    raycaster.setFromCamera( mouse, this.camera );
    const intersects = raycaster.intersectObjects( this.meshArray, false );
    if (intersects.length > 0 ) {
      this.controls.enabled = false;
      TWEEN.removeAll();
      if((intersects[0].object.userData as UserObject).showchildren) {
        this.deleteChildrenChain((intersects[0].object.userData as UserObject).resourcedata.handleID as number);
      } else {
        this.createChildrenChain((intersects[0].object.userData as UserObject).resourcedata.handleID as number);
        (intersects[0].object.userData as UserObject).showchildren = true;  
      }
      this.controls.enabled = true;
    } else {
      this.controls.enabled = true;
      this.targetRotationX = 0;
      this.targetRotationX = 0;
    }
  }


  @HostListener('window:mousemove', ['$event'])
  onDocumentMouseOver(event: MouseEvent) {
    event.preventDefault();
    let mouse = this.getMouse(event);
    let raycaster = new THREE.Raycaster();
    raycaster.setFromCamera( mouse, this.camera );
    const intersects = raycaster.intersectObjects( this.meshArray, false );
    if (intersects.length > 0 ) {
      if ( intersects[ 0 ].object !== this.INTERSECTED ) {
        if ( Object.keys(this.INTERSECTED).length > 0 ) {
          this.intersectionRestore();
          }
        this.INTERSECTED = intersects[ 0 ].object as THREE.Mesh;
        this.INTERSECTEDMTAERIAL = (intersects[ 0 ].object as THREE.Mesh).material;
        (document.querySelector('.mouse') as HTMLElement).style.display = 'block';
        (intersects[0].object as THREE.Mesh).material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
        let ele = document.querySelector('.mouse') as HTMLElement;
        let mousepaneposition = this.worldCoordToMouse2DCoord(intersects[ 0 ].object.position, ele);
        ele.style.top = mousepaneposition.y + 'px'; ele.style.left = mousepaneposition.x + 'px';
        this.camera.updateProjectionMatrix();
      }
      this.mousePane = this.getMousePaneInfo(intersects[0].object as THREE.Mesh);
    }
    else {
      if (  Object.keys(this.INTERSECTED).length > 0  ) {
        this.intersectionRestore();
        this.mousePane = this.getMousePaneInfo(new THREE.Mesh());
        (document.querySelector('.mouse') as HTMLElement).style.display = 'none';
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: UIEvent) {
    const windowResizeHanlder = () => { 
      const { innerHeight, innerWidth } = window;
      this.renderer.setSize(innerWidth, innerHeight);
      this.camera.aspect = innerWidth / innerHeight;
      this.camera.updateProjectionMatrix();
    };
    windowResizeHanlder();
  }

  private elapsedDuration = 45;
  public renderTween() {

    let theta = 0;

    theta += 0.2;

    // this.camera.position.x = this.radius * Math.sin( theta * Math.PI / 360 );
    // this.camera.position.y = this.radius * Math.sin( theta * Math.PI / 360 );
    // this.camera.position.z = this.radius * Math.cos( theta * Math.PI / 360 );
    // this.camera.lookAt( this.scene.position );


    const look = new THREE.Vector3();
    let checkTime = this.mouseClock.getElapsedTime(); // auto tween setup
    let elapsedTime = checkTime - this.mouseupTime;
    let cameraX = this.radius * Math.sin( theta * Math.PI / 360 );
    let cameraY = this.radius * Math.sin( theta * Math.PI / 360 );
    let cameraZ =  this.radius * Math.cos( theta * Math.PI / 360 );
    const moveCam = (camiX: number, camiY: number, camiZ: number, look: THREE.Vector3) => {
      this.camera.position.x = camiX;
      this.camera.position.y = camiY;
      this.camera.position.z = camiZ;
      this.camera.lookAt(look);
      this.camera.updateProjectionMatrix();
    }
      if (elapsedTime >= 0) {
          // TWEEN.removeAll();
          let meshSelected = this.meshArray[this.indexCurrent] as THREE.Mesh;
          this.floatTween = new TWEEN.Tween({ x: this.camera.position.x, y: this.camera.position.y, z: this.camera.position.z })
              .to({ x: meshSelected.position.x, y: meshSelected.position.y, z: meshSelected.position.z }, 1000)
              .easing(TWEEN.Easing.Bounce.Out)
              .onUpdate(function(o) {
                moveCam(o.x, o.y, o.z, look)
              })
              .start();
          this.updateTimer();
      }
      // actually rotate the currentObj while rendering, adjust speed of the rotation here 
      // currentObj.rotation.x += (targetRotationX + currentObj.rotation.x) / 3000;
      // currentObj.rotation.y += (targetRotationY + currentObj.rotation.y) / 3000;
      // // render
      // this.renderer.render(this.scene, this.camera);

  };

  private updateTimer() { // function to update the timer between autotween cycles
    this.mouseupTime = this.mouseClock.getElapsedTime();
    this.indexCurrent = Math.floor(Math.random() * this.meshArray.length);
  }

  ngAfterViewInit(): void {
    this.createScence();
    this.configScene();
    this.configCamera();
    this.configRenderer();
    this.configControls();
    // this.createLight();
    // this.creatStars();
    this.createInitGeometriesOnPlane();
    // this.createSecondLevelCCMeshes();
    // this.createThirdLevelCCMeshes();
    // this.createFourthLevelCCMeshes();
    // this.createRestLevelCCMeshes();
    // this.createItemMeshes(this.getMeshByID(10476));
    // this.createGroupMeshes();
    // this.createGeometries();
    // this.createGeometriesOnPlane();
    // this.startRendering();
    this.animate();
    // this.findChildrenIDBFS(0);
    // console.log('this.meshArray length ' + this.meshArray.length);
  }


  public createScence() {
    // Scene
    this.scene = new THREE.Scene();
    // Camera
    let aspectRatio = this.calculateAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    )
    this.camera.position.z = this.cameraZ;
  }

  public startRenderingLoop() {
    // Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    let component: ThreeCanvasComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.animate();
      component.renderer.render(component.scene, component.camera);
    }());
  }

  public getNum(min: number, max: number) {
    return (Math.random() * (max - min) + min) * 1.5;
  }

  // Reflect function code
  ////////////////////

  private calculateAspectRatio(): number {
    const height = this.canvas.clientHeight;
    if (height === 0) {
      return 0;
    }
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  constructor() {}

  configScene() {
    this.scene.background = new THREE.Color(0x000000);
  }

  configCamera() {
    this.camera.aspect = this.calculateAspectRatio();
    this.camera.updateProjectionMatrix();
    // this.camera.position.set(0, 0, 100);
    this.camera.lookAt(this.scene.position);
  }

  configRenderer() {
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
  }

  configControls() {
    this.controls = new TrackballControls(this.camera, this.canvas);
    this.controls.rotateSpeed = 2.4;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.2;
    this.controls.noZoom = false;
    this.controls.noPan = false;
    this.controls.staticMoving = false;
    this.controls.dynamicDampingFactor = 0.3;
    this.controls.minDistance = 1000;//this.radius * 0.1;
    this.controls.maxDistance = this.radius * 5;
    this.controls.update();
  }

  createLight() {
    this.light = new THREE.AmbientLight(0xfff5f2);
    this.light.position.set(0, 0, 0);
    this.scene.add(this.light);
  }

  private createMesh(radius: number,segmentsX: number, segmentsY: number, texture?: string) {
    let material: THREE.MeshBasicMaterial;
    if( typeof texture === 'undefined') {
      let color = Math.random() * 0xffffff;
      material = new THREE.MeshBasicMaterial({ color: color });
    } else {
      material = new THREE.MeshBasicMaterial({ map: this.loder.load(texture) });
    }
    const geometry = new THREE.SphereGeometry(radius, segmentsX, segmentsY);
    geometry.computeTangents();
    const mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);
    return mesh;
  }

//   function makeObjects(rad) {
//     var geo = new THREE.SphereGeometry(rad, 20, 20);
//     var color = Math.random() * 0xffffff;
//     var material = new THREE.MeshBasicMaterial({ color: color });
//     sphere = new THREE.Mesh(geo, material);
//     sphere.position.x = 0;
//     sphere.position.y = 0;
//     sphere.position.z = 0;
//     var objLen = objects.length - 1;
//     sphere.id = objects[objLen].id + 1;
//     sphere.type = 4;
//     sphere.hosteddata = [];
//     sphere.packing = [];
//     sphere.radius = rad;
//     scene.add(sphere);
//     objects.push(sphere);
//     return sphere;
// }
  public createGeometries() {
    let posArray = this.get3DPackingList(1200, 150);
    let storedPosArray = this.get3DPackingList(800, 100);

    for (let i=0; i<6; i++) {
        let mesh: THREE.Mesh;
        if(i==0) {
          mesh = this.createMesh(200, 100, 50, this.planetPics[i%5]);
          mesh.position.set(0, 0, 0);
          mesh.userData = posArray;
        } else {
          mesh = this.createMesh(150, 100, 50, this.planetPics[i%5]);
          mesh.userData = storedPosArray;
          let ind =  Math.floor(Math.random() * posArray.length);
          if (posArray[ind].occupied) {
              while (posArray[ind].occupied) {
                ind = Math.floor(Math.random() * posArray.length);
              }
          }
          posArray[ind].occupied = true;
          mesh.position.set(posArray[ind].position.x, posArray[ind].position.y, posArray[ind].position.z);
          this.createLines(this.meshArray[0], mesh, 0x0000ff);
        }
        // mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 4 + 2;
        this.scene.add(mesh);
        this.meshArray.push(mesh);
    }
    if(this.meshArray.length > 0) {
      this.currentObj = this.meshArray[0];
    }
  }

  createGeometriesOnPlane() {
    let posArray = this.get2DPackingList(750, 100);
    let storedPosArray = this.get3DPackingList(1000, 100);
    let iData: UserObject;  
    
    for (let i=0; i<6; i++) {
        let mesh: THREE.Mesh;
        if(i==0) {
          mesh = this.createMesh(100, 100, 50, this.planetPics[i%5]);
          mesh.position.set(0, 0, 0);
          mesh.userData = posArray;

        } else {
          mesh = this.createMesh(100, 100, 50, this.planetPics[i%5]);
          mesh.userData = storedPosArray;
          let ind =  Math.floor(Math.random() * posArray.length);
          if (posArray[ind].occupied) {
              while (posArray[ind].occupied) {
                ind = Math.floor(Math.random() * posArray.length);
              }
          }
          posArray[ind].occupied = true;
          mesh.position.set(posArray[ind].position.x, posArray[ind].position.y, posArray[ind].position.z);
          this.createLines(this.meshArray[0], mesh, 0x888888);
        }
        // mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 4 + 2;
        this.scene.add(mesh);
        this.meshArray.push(mesh);
        // userdata
        // mesh.userData =  iData;
        if(i==0) {
          // this.setupDatGui(mesh);
        }
    }
    if(this.meshArray.length > 0) {
      this.currentObj = this.meshArray[0];
    }
  }

  createGroupMeshes(center: THREE.Mesh) {
    let posArray = center.userData as SpherePacking[];
    if(posArray.length == 0) {
      posArray = this.get3DPackingList(800, 100);
    }
    let spheresNum = Math.floor((posArray.length) / 3);
    const geo = new THREE.SphereGeometry(150, 50, 30);
    const geometry = new THREE.SphereGeometry(80, 20, 20);
    const color = Math.random() * 0xffffff;
    const material = new THREE.MeshBasicMaterial({ color: color });
    let x = center.position.x;
    let y = center.position.y;
    let z = center.position.z;

    for (let i=0; i<spheresNum; i++) {
      let mesh = new THREE.Mesh(geometry, material);
      posArray[i+2].occupied = true;
      mesh.position.set( posArray[i+2].position.x + x, posArray[i+2].position.y + y, posArray[i+2].position.z + z);
      this.createLines(mesh, center);
      this.meshArray.push(mesh);
      this.scene.add(mesh);
    }
  }

  public viewCanvas() {
    const mainPlanet = this.meshArray[0];
    mainPlanet.position.set(mainPlanet.position.x+100,mainPlanet.position.y+100,mainPlanet.position.z+100);
  }

  animate() {
    requestAnimationFrame(()=>this.animate());
    // this.indexCurrent.rotation.x += 0.05;

    // this.mesh.rotation.x += 0.05;
    // this.mesh.rotation.y += 0.01;
    // this.meshRotations();
    this.controls.update();
    // this.renderTween();
    this.renderer.render(this.scene, this.camera);
    TWEEN.update();
  }

  public startRendering() {
    let component: ThreeCanvasComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.animate();
      component.renderer.render(component.scene, component.camera);
    }());
  }

  private creatStars() {
    const vertices = [];

    for ( let i = 0; i < 50000; i ++ ) {
    
      const x = THREE.MathUtils.randFloatSpread( 8000 );
      const y = THREE.MathUtils.randFloatSpread( 8000 );
      const z = THREE.MathUtils.randFloatSpread( 8000 );
    
      vertices.push( x, y, z );
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
    
    const material = new THREE.PointsMaterial( { color: 0x888888 } );
    
    const points = new THREE.Points( geometry, material );
    
    this.scene.add( points );
  }

  private createCloud() {

  }

  private meshRotations() {
    for (let i=0;i<this.meshArray.length;i++) {
      const geo = this.meshArray[i];
      geo.rotation.x += (this.targetRotationX + geo.rotation.x) / 3000;
      geo.rotation.y += (this.targetRotationY + geo.rotation.y) / 3000;
    }
  }

  public moveCam1(camiX: number, camiY: number, camiZ: number, look: THREE.Vector3) {
    this.camera.position.x = camiX;
    this.camera.position.y = camiY;
    this.camera.position.z = camiZ;
    this.camera.lookAt(look);
    this.camera.updateProjectionMatrix();
  }

  public render() {
    requestAnimationFrame(()=>this.render());
    // this.animate();
    this.renderer.render(this.scene, this.camera);
  }

  public get3DPackingList(dist: number, rad: number) {
    let positionArray = [];
    let delta = 2 * Math.asin(rad / dist);
    for (let beta = 0; beta < Math.PI; beta = beta + delta) {
      let R = Math.sin(beta) * dist; // rad of selected circle
      let alpha = 2 * Math.asin(rad / R);
      let numofspheres = Math.floor(2 * Math.PI / alpha);
      for (let i = 0; i < numofspheres; i++) {
        let angle = alpha * i;
        let position = new THREE.Vector3(
          Math.sin(beta) * Math.cos(angle) * dist,
          Math.sin(beta) * Math.sin(angle) * dist,
          Math.cos(beta) * dist
        );
        positionArray.push({ position: position, occupied: false });
      }
    }
    return positionArray;
  }

  public createLines_0(mesh1: THREE.Mesh, mesh2: THREE.Mesh, linecolor?: number) {
    if (typeof linecolor === 'undefined') {
      linecolor = 0x6699CC;
    }
    const material = new THREE.LineBasicMaterial( { color: linecolor } );this.scene.traverse
    const points = [];
    points.push( mesh1.position );
    points.push( mesh2.position );    
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const line = new THREE.Line( geometry, material );
    this.scene.add( line );
    this.lines.push(line);
  }
  public createLines(parentmesh1: THREE.Mesh, mesh2: THREE.Mesh, linecolor?: number) {
    const parameters = [[ 0.25, 0xff7700, 1 ], [ 0.5, 0xff9900, 1 ], [ 0.75, 0xffaa00, 0.75 ], [ 1, 0xffaa00, 0.5 ], [ 1.25, 0x000833, 0.8 ],
  [ 3.0, 0xaaaaaa, 0.75 ], [ 3.5, 0xffffff, 0.5 ], [ 4.5, 0xffffff, 0.25 ], [ 5.5, 0xffffff, 0.125 ]];

    // const material = new THREE.LineBasicMaterial( { color: 0xff7700, opacity: 0.125} );
    // const material = new THREE.LineBasicMaterial( { color: 0xffaa00, linewidth: 0.5, opacity: 0.125, vertexColors: true });
    const material = new THREE.LineBasicMaterial( { color: 0xffaa00, linewidth: 0.5, opacity: 0.125 });
    const points = [];
    points.push( parentmesh1.position );
    points.push( mesh2.position );    
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const line = new THREE.Line( geometry, material );
    this.scene.add( line );
    this.lines.push(line);
    const lineid = (parentmesh1.userData as UserObject).resourcedata.handleID + '-' + (mesh2.userData as UserObject).resourcedata.handleID;
    this.lineMap.set(lineid, line);
  }

  public createItemMeshes(object: THREE.Scene | THREE.Mesh) {
    if(typeof object === 'undefined') {
      object = this.scene;
    }

    // const parameters = [[ 0.25, 0xff7700, 1 ], [ 0.5, 0xff9900, 1 ], [ 0.75, 0xffaa00, 0.75 ], [ 1, 0xffaa00, 0.5 ], [ 1.25, 0x000833, 0.8 ], [ 3.0, 0xaaaaaa, 0.75 ], [ 3.5, 0xffffff, 0.5 ], [ 4.5, 0xffffff, 0.25 ], [ 5.5, 0xffffff, 0.125 ]];
    const parameters = [[ 0.25, 0xff7700, 1 ], [ 0.5, 0xff9900, 1 ], [ 0.75, 0xffaa00, 0.75 ], [ 1, 0xffaa00, 0.5 ]];

    const lsg = this.createLineSegmentGeometry();

    for ( let i = 0; i < parameters.length; ++ i ) {

      const p = parameters[ i ];

      const material = new THREE.LineBasicMaterial( { color: p[ 1 ], opacity: p[ 2 ] } );

      const line = new THREE.LineSegments( lsg, material );
      line.scale.x = line.scale.y = line.scale.z = p[ 0 ];
      // line.rotation.y = Math.random() * Math.PI;
      line.updateMatrix();
      object.add( line );

    }

    // const material = new THREE.LineBasicMaterial( { color: linecolor } );this.scene.traverse
    // const points = [];
    // points.push( mesh1.position );
    // points.push( mesh2.position );    
    // const geometry = new THREE.BufferGeometry().setFromPoints( points );
    // const line = new THREE.Line( geometry, material );
    // this.scene.add( line );
    // this.lines.push(line);
  }

    public createLineSegmentGeometry() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const vertex = new THREE.Vector3();
    for ( let i = 0; i < 10000; i ++ ) {
      vertex.x = Math.random() * 2 - 1;
      vertex.y = Math.random() * 2 - 1;
      vertex.z = Math.random() * 2 - 1;
      vertex.normalize();
      vertex.multiplyScalar( 100 );
      vertices.push( vertex.x, vertex.y, vertex.z );
      vertex.multiplyScalar( Math.random() * 0.09 + 1 );
      vertices.push( vertex.x, vertex.y, vertex.z );
    }
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
    return geometry;
  }

  public get2DPackingList(dist: number, rad: number, vertex?: THREE.Vector3, offset?: number ) {
    if(typeof vertex === 'undefined') {
      vertex = new THREE.Vector3(0, 0, 0);
    }
    if(typeof offset === 'undefined') {
      offset = 0;
    }
    offset = offset % (2 * Math.PI);
    let positionArray = [];
    let alpha = 4 * Math.asin(0.5 * rad / dist);
    let numofspheres = Math.floor(2 * Math.PI / alpha);
    let angle = offset;
    for (let i = 0; i < numofspheres; i++) {
      let position = new THREE.Vector3(
        Math.sin(angle) * dist + vertex.x,
        Math.cos(angle) * dist + vertex.x,
        vertex.z
      );
      positionArray.push({ position: position, occupied: false });
      angle += alpha;
  }
    return positionArray;
  }

  private getMouse(event: MouseEvent) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const mouse = new THREE.Vector2();
    mouse.x = ( x / this.canvas.clientWidth ) *  2 - 1;
    mouse.y = ( y / this.canvas.clientHeight) * - 2 + 1;
    return mouse;
  }

  // private setupDatGui(mesh: THREE.Mesh) {
  //   if(typeof this.cubeFolder === 'undefined') {
  //     // this.gui.removeFolder(this.cubeFolder);
  //     this.cubeFolder = this.gui.addFolder('Information');
  //   }
    
    
    // this.cubeFolder.add(mesh.userData as UserObject, 'name');
    // this.cubeFolder.add(mesh.userData as UserObject, 'uuid');
    // this.cubeFolder.open();
    // // cubeFolder.domElement.innerHTML = 'hello';
    // console.log("All folders "+this.cubeFolder.__folders + '-' + this.cubeFolder.__folders[0]);
    // console.log("DOM "+this.cubeFolder.domElement.innerHTML);
  //   let domelement = '<ul><li class="title">Information</li><li class="cr string"><div><span class="property-name">name</span><div class="c"><input type="text"></div></div></li><li class="cr string"><div><span class="property-name">uuid</span><div class="c"><input type="text"></div></div></li></ul>';
  //   this.cubeFolder.domElement.innerHTML = domelement
  // }

  private getEarthPaneInfo(earth: THREE.Mesh) {
    const info = (earth.userData as UserObject).resourcedata;
    return info;
  }

  private getMoonsPaneInfo(moons: THREE.Mesh) {
    let info = moons.userData as UserObject;
    return info;
  }

  private getMousePaneInfo(mouse: THREE.Mesh) {
    let info = mouse.userData as UserObject;
    return info;
  }

  private getChildrenOutward3DPacking(distance: number, radius: number, base: THREE.Mesh) {
    let oPacking = [] as SpherePacking[];
    let center = new THREE.Vector3(0, 0, 0);
    let packings = this.get3DPackingList(distance, radius);
    let aPackings = this.tweakedPackingList(base, packings);
    let distanceToCenter = base.position.distanceTo(center);
    let minDistance = Math.sqrt(Math.pow(distanceToCenter, 2) + Math.pow(distance, 2));
    aPackings.forEach((vertex) => {
      let dist = vertex.position.distanceTo(center);
      if(dist > minDistance) {
        oPacking.push(vertex);
      }
    })
    return oPacking;
  }
  private getChildrenOutward3DPackingSorted(distance: number, radius: number, base: THREE.Mesh) {
    let oPacking = [] as SpherePacking[];
    let center = new THREE.Vector3(0, 0, 0);
    let packings = this.get3DPackingList(distance, radius);
    let aPackings = this.tweakedPackingList(base, packings);
    let distanceToCenter = base.position.distanceTo(center);
    let minDistance = Math.sqrt(Math.pow(distanceToCenter, 2) + Math.pow(distance, 2));
    let helpers: PackingHelper[] = [];
    aPackings.forEach((vertex) => {
      let dist = vertex.position.distanceTo(center);
      if(dist > minDistance) {
        // oPacking.push(vertex);
        let helper = {} as PackingHelper;
        helper.distance = dist;
        helper.packing = vertex;
        helpers.push(helper);
      }
    })
    let sortedHelpers = helpers.sort((a, b) => b.distance - a.distance); 
    sortedHelpers.forEach((helper) => {
      oPacking.push(helper.packing);
    })
    return oPacking;
  }

  private getChildrenOutward2DPacking(distance: number, radius: number, base: THREE.Mesh) {
    let oPacking = [] as SpherePacking[];
    let center = new THREE.Vector3(0, 0, 0);
    let packings = this.get2DPackingList(distance, radius);
    let aPackings = this.tweakedPackingList(base, packings);
    let distanceToCenter = base.position.distanceTo(center);
    let minDistance = Math.sqrt(Math.pow(distanceToCenter, 2) + Math.pow(distance, 2));
    aPackings.forEach((vertex) => {
      let dist = vertex.position.distanceTo(center);
      if(dist > minDistance) {
        oPacking.push(vertex);
      }
    })
    return oPacking;
  }

  private tweakedPackingList(base: THREE.Mesh, packing: SpherePacking[]) {
    let aPacking = [] as SpherePacking[];
    let x = base.position.x;
    let y = base.position.y;
    let z = base.position.z;
    packing.forEach((vertex) => {
      let pos = new THREE.Vector3();
      let sp = {} as SpherePacking;
      pos.set(vertex.position.x + x, vertex.position.y + y, vertex.position.z + z);
      sp.position = pos;
      sp.occupied = vertex.occupied;
      aPacking.push(sp);
    })
    return aPacking;
  }

  /*
  Breadth First Search                
  */
  private findChildrenIDBFS(rootID: number) {
    let queue: number[] = [];
    let children: number[] = [];
    queue.push(rootID);
    children.push(rootID);
    let currentID: number;
    while(queue.length > 0) {
      currentID = queue.shift() as number;
      if(this.resourcedataMap.has(currentID)) {
        this.resourcedataMap.get(currentID)?.children.forEach((cid) => {
          queue.push(cid);
          children.push(cid);
        })
      }
    }
    return children;
  }

  createInitGeometriesOnPlane() {
    let posArray2D = this.get2DPackingList(400, 100);
    let posArray3D = this.get3DPackingList(400, 100);
    let cData: ResourceData[] = [];

    cData.push(...SITEDATASET);
    cData.push(...this.findTopLevelCommunityData())

    for (let i = 0; i < cData.length; i++) {
        let mesh: THREE.Mesh;
        let repdata = {} as UserObject;
        if(i == 0) {
          mesh = this.createMesh(100, 100, 50, this.planetPics[0]);
          mesh.position.set(0, 0, 0);
          repdata.packing2 = posArray2D;
          repdata.packing3 = posArray3D;
          repdata.showchildren = true;
          repdata.resourcedata = cData[i];
          mesh.userData = repdata;
        } else {
          let index = Math.floor(Math.random() * this.pics.length);
          mesh = this.createMesh(100, 100, 50, this.pics[index]);
          let ind =  4 * i - 4;
          posArray2D[ind].occupied = true;
          mesh.position.set(posArray2D[ind].position.x, posArray2D[ind].position.y, posArray2D[ind].position.z);
          repdata.packing2 = this.getChildrenOutward2DPacking(400, 100, mesh);
          repdata.packing3 = this.getChildrenOutward3DPackingSorted(400, 100, mesh);
          repdata.showchildren = false;
          repdata.resourcedata = cData[i];
          mesh.userData = repdata;
          this.createLines(this.meshArray[0], mesh, 0x888888);
        }
        // mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 4 + 2;
        // this.scene.add(mesh);
        this.meshArray.push(mesh);
        this.meshMap.set(cData[i].handleID as number, mesh);
        // userdata
        // mesh.userData =  iData;
        if(i==0) {
          // this.setupDatGui(mesh);
        }
    }
    if(this.meshArray.length > 0) {
      this.currentObj = this.meshArray[0];
    }
  }

  private createSecondLevelCCMeshes() {
    let topLevelCommunityData = this.findTopLevelCommunityData();
    for(let i=0;i<topLevelCommunityData.length;i++) {
      let children = this.findDirectChildrenData(topLevelCommunityData[i]);
      let base = this.getMeshByID(topLevelCommunityData[i].handleID as number);
      let packing = (base.userData as UserObject).packing3;
      for(let j=0;j<children.length;j++) {
        let index = Math.floor(Math.random() * this.pics.length);
        let mesh = this.createMesh(50, 100, 50, this.pics[index]);
        if(children[j].resourcetype === ResourceType.COLLECTION) {
          mesh.position.copy(packing[j].position.multiplyScalar(1.5));
        } else {
          mesh.position.copy(packing[j].position);
        }
        packing[j].occupied = true;
        let repdata = {} as UserObject;
        repdata.packing2 = this.getChildrenOutward2DPacking(400, 100, mesh);
        repdata.packing3 = this.getChildrenOutward3DPackingSorted(400, 100, mesh);
        repdata.showchildren = false;
        repdata.resourcedata = children[j];
        mesh.userData = repdata;
        this.createLines(base, mesh, 0x888888);
        this.meshArray.push(mesh);
        this.meshMap.set(children[j].handleID as number, mesh);
      }
    }    
  }

  private createThirdLevelCCMeshes() {
    let secondLevelCCData = this.findSecondLevelCCData();
    for(let i=0;i<secondLevelCCData.length;i++) {
      let children = this.findDirectChildrenData(secondLevelCCData[i]);
      let base = this.getMeshByID(secondLevelCCData[i].handleID as number);
      let packing = (base.userData as UserObject).packing3;
      for(let j=0;j<children.length;j++) {
        let mesh = this.createMesh(50, 100, 50);
        mesh.position.copy(packing[j].position);
        packing[j].occupied = true;
        let repdata = {} as UserObject;
        repdata.packing2 = this.getChildrenOutward2DPacking(400, 50, mesh);
        repdata.packing3 = this.getChildrenOutward3DPackingSorted(400, 50, mesh);
        repdata.showchildren = false;
        repdata.resourcedata = children[j];
        mesh.userData = repdata;
        this.createLines(base, mesh, 0x888888);
        this.meshArray.push(mesh);
        this.meshMap.set(children[j].handleID as number, mesh);
      }
    }
  }

  private createFourthLevelCCMeshes() {
    let thirdLevelCCData = this.findThirdLevelCCData();
    for(let i=0;i<thirdLevelCCData.length;i++) {
      let children = this.findDirectChildrenData(thirdLevelCCData[i]);
      let base = this.getMeshByID(thirdLevelCCData[i].handleID as number);
      let packing = (base.userData as UserObject).packing3;
      for(let j=0;j<children.length;j++) {
        let mesh = this.createMesh(50, 100, 50);
        mesh.position.copy(packing[j].position);
        packing[j].occupied = true;
        let repdata = {} as UserObject;
        repdata.packing2 = this.getChildrenOutward2DPacking(400, 50, mesh);
        repdata.packing3 = this.getChildrenOutward3DPackingSorted(400, 50, mesh);
        repdata.showchildren = false;
        repdata.resourcedata = children[j];
        mesh.userData = repdata;
        this.createLines(base, mesh, 0x888888);
        this.meshArray.push(mesh);
        this.meshMap.set(children[j].handleID as number, mesh);
      }
    }
  }

  private createRestLevelCCMeshes() {
    let restLevelCCData = this.findRestLevelCCData();
    for(let i=0;i<restLevelCCData.length;i++) {
      let children = this.findDirectChildrenData(restLevelCCData[i]);
      let base = this.getMeshByID(restLevelCCData[i].handleID as number);
      let packing = (base.userData as UserObject).packing3;
      for(let j=0;j<children.length;j++) {
        let mesh = this.createMesh(50, 100, 50);
        mesh.position.copy(packing[j].position);
        packing[j].occupied = true;
        let repdata = {} as UserObject;
        repdata.packing2 = this.getChildrenOutward2DPacking(400, 50, mesh);
        repdata.packing3 = this.getChildrenOutward3DPackingSorted(400, 50, mesh);
        repdata.showchildren = false;
        repdata.resourcedata = children[j];
        mesh.userData = repdata;
        this.createLines(base, mesh, 0x888888);
        this.meshArray.push(mesh);
        this.meshMap.set(children[j].handleID as number, mesh);
      }
    }
  }

  private createCCBranches(id: number) {
    let list = this.findChildrenIDBFS(id);
    if(id === 0) {

    }
    list.forEach((b) => {

    })
  }




  private getMeshByID(id: number) {
    let mesh = new THREE.Mesh();
    this.meshArray.forEach((m) => {
      let uo = m.userData as UserObject;
      if(typeof uo  !== 'undefined') {
        if(uo.resourcedata.handleID === id) {
          mesh = m;
        }
      }
    })
    return mesh;
  }

  private findTopLevelCommunityData() {
    let resources: ResourceData[] = [];
    let ids = this.findTopLevelCommunityIDs();
    ids.forEach((id) => {
      let rd = this.resourcedataMap.get(id) as ResourceData;
      resources.push(rd);
    })
    return resources;
  }

  private findSecondLevelCCData() {
    let resources: ResourceData[] = [];
    let ids = this.findSecondLevelCCIDs();
    ids.forEach((id) => {
      let rd = this.resourcedataMap.get(id) as ResourceData;
      resources.push(rd);
    })
    return resources;
  }

  private findThirdLevelCCData() {
    let resources: ResourceData[] = [];
    let ids = this.findThirdLevelCCIDs();
    ids.forEach((id) => {
      let rd = this.resourcedataMap.get(id) as ResourceData;
      resources.push(rd);
    })
    return resources;
  }

  private findFourthLevelCCData() {
    let resources: ResourceData[] = [];
    let ids = this.findFourthLevelCCIDs();
    ids.forEach((id) => {
      let rd = this.resourcedataMap.get(id) as ResourceData;
      resources.push(rd);
    })
    return resources;
  }

  private findRestLevelCCData() {
    let resources: ResourceData[] = [];
    let ids = this.findRestLevelCCIDs();
    ids.forEach((id) => {
      let rd = this.resourcedataMap.get(id) as ResourceData;
      resources.push(rd);
    })
    return resources;
  }

  private findDirectChildrenData(rd: ResourceData) {
    let children = rd.children;
    let dcd: ResourceData[] = [];
    children.forEach((id) => {
      let rd = this.resourcedataMap.get(id) as ResourceData;
      dcd.push(rd);
    })
    return dcd;
  }

  private findTopLevelCommunityIDs() {
    let comms: number[] = [];
    let communities: ResourceData[] = [];
    communities.push(...COMMUNITYDATASET);
    communities.forEach((c) => {
      if(c.parent === 0) {
        comms.push(c.handleID as number);
      }
    })
    return comms;
  }

  private findSecondLevelCCIDs() {
    let ids: number[] = [];
    let tops = this.findTopLevelCommunityIDs();
    tops.forEach((top) => {
      let rd = this.resourcedataMap.get(top) as ResourceData;
      rd.children.forEach((child) => {
        ids.push(child);
      }) 
  })
    return ids;
  }

  private findThirdLevelCCIDs() {
    let ids: number[] = [];
    let seconds = this.findSecondLevelCCIDs();
    seconds.forEach((second) => {
      let rd = this.resourcedataMap.get(second) as ResourceData;
      rd.children.forEach((child) => {
        ids.push(child);
      }) 
  })
    return ids;
  }

  private findFourthLevelCCIDs() {
    let ids: number[] = [];
    let thirds = this.findThirdLevelCCIDs();
    thirds.forEach((third) => {
      let rd = this.resourcedataMap.get(third) as ResourceData;
      rd.children.forEach((child) => {
        ids.push(child);
      })
  })
    return ids;
  }

  private findRestLevelCCIDs() {
    let ids: number[] = [];
    let fourths = this.findFourthLevelCCIDs();
    fourths.forEach((fourth) => {
      let cids = this.findChildrenIDBFS(fourth);
      cids.forEach((cid) => {
        let rd = this.resourcedataMap.get(cid) as ResourceData;
        rd.children.forEach((child) => {
          ids.push(child);
        })
      })
    })
    return ids;
  }

  private intersectionRestore() {
    this.INTERSECTED.material = this.INTERSECTEDMTAERIAL;
    this.INTERSECTED = new THREE.Mesh();
    this.INTERSECTEDMTAERIAL = null;
  }

  private worldCoordToMouse2DCoord(position: Vector3, div: HTMLElement) {
    let pos = position.clone();
    pos.project( this.camera );
    let offset = this.findOffset(div);

    pos.x = ( pos.x + 1) * this.canvas.clientWidth / 2  + offset.x;
    pos.y = - ( pos.y - 1) * this.canvas.clientHeight / 2 + offset.y;
    pos.z = 0;
    return pos;
  }

  private findOffset(div: HTMLElement) {
    let pos = new Vector2();
    if (div.offsetParent !== null) {
      do {
        pos.x += div.offsetLeft;
        pos.y += div.offsetTop;
      } while (div.offsetParent);
    }
    return pos;
  }

  public openCloseDirectChildMeshesByID(id: number) {
    if(this.meshMap.has(id)) {
      if((this.meshMap.get(id)?.userData as UserObject).showchildren){
        let baseMesh = this.meshMap.get(id) as Mesh;
        let parentObject = baseMesh.userData as UserObject;
        parentObject.showchildren = false;
        let children = parentObject.resourcedata.children;
        children.forEach((c) => {
          this.deleteMesh(c);
        })
        // Update parent packing
        parentObject.packing3.forEach((p) => {
          p.occupied = false;
        })
      } else {
        let baseMesh = this.meshMap.get(id) as Mesh;
        let parentObject = baseMesh.userData as UserObject;
        parentObject.showchildren = true;
        let children = parentObject.resourcedata.children;
        children.forEach((c) => {
          let index = Math.floor(Math.random() * this.pics.length);
          let mesh = this.createMesh(50, 100, 50, this.pics[index]);
          mesh.position.copy(this.getPosition(this.meshMap.get(id) as Mesh) as Vector3);
          mesh.userData = this.generateUserData(c, mesh, false);
          this.createLines(baseMesh, mesh, 0x888888);
          this.meshArray.push(mesh);
          this.meshMap.set((this.resourcedataMap.get(c) as ResourceData).handleID as number, mesh);
        })
      }
    }
  }

  public deleteMesh(id: number) {
    let mesh = {} as Mesh;
    let parentMesh = {} as Mesh;
    if(this.meshMap.has(id)) {
      mesh = this.meshMap.get(id) as Mesh;
      parentMesh = this.meshMap.get((mesh.userData as UserObject).resourcedata.parent) as Mesh;
    }
    this.deleteLineToParent(parentMesh, mesh);
    this.scene.remove(mesh);
    this.meshMap.delete(id);
    // Remove from meshArray
    let ind = this.meshArray.indexOf(mesh, 0);
    this.meshArray.splice(ind, 1);
  }

  public deleteLineToParent(parentMesh: Mesh, mesh: Mesh) {
    const lineid = (parentMesh.userData as UserObject).resourcedata.handleID + '-' + (mesh.userData as UserObject).resourcedata.handleID;
    let line = this.lineMap.get(lineid) as THREE.Line;
    this.lineMap.delete(lineid);
    this.scene.remove(line);
  }

  public async searchMeshByID(id: number) {
    this.browseMeshByID(id);
  }

  public async browseMeshByID(id: number) {
    if(!this.meshMap.has(id)) {
      // this.createChildrenChain(id);
      this.createParentChain(id);
    }

    let mesh = this.meshMap.get(id) as Mesh;
    await new Promise(f => setTimeout(f, 400));
    const look = new THREE.Vector3();
    const moveCam = (camiX: number, camiY: number, camiZ: number, look: THREE.Vector3) => {
      this.camera.position.x = camiX;
      this.camera.position.y = camiY;
      this.camera.position.z = camiZ;
      this.camera.lookAt(look);
      this.camera.updateProjectionMatrix();
    }

    let cx = mesh.position.x;
    let cy = mesh.position.y;
    let cz = mesh.position.z;
    if(!(cx==0 && cy==0 && cz==0)) {
      this.controls.enabled = false;
      TWEEN.removeAll();
      this.touchTween = new TWEEN.Tween( {x: this.camera.position.x, y: this.camera.position.y, z: this.camera.position.z} )
        .to( {x: mesh.position.x, y: mesh.position.y, z: mesh.position.z }, 400 )
        .easing(TWEEN.Easing.Cubic.InOut)
        .onUpdate(function(o) {
          moveCam(o.x, o.y, o.z, look)
        })
        .start()
        await new Promise(f => setTimeout(f, 400));
        this.controls.enabled = true;
        this.earthPane = this.getEarthPaneInfo(mesh);
        this.moonsPane = this.getMoonsPaneInfo(mesh);

      } else {
        this.controls.enabled = true;
        this.targetRotationX = 0;
        this.targetRotationX = 0;
      }
      // this.createParentChain(id);
      // this.controls.enabled = true;
  }

  public loadData() {
    let dataset: ResourceData[] = [];
    dataset.push(...SITEDATASET);
    dataset.push(...COMMUNITYDATASET);
    dataset.push(...COLLECTIONDATASET);
    dataset.forEach((d) => {
      this.resourcedataMap.set(d.handleID as number, d);
    })

    let itemdataset: ItemResourceData[] = [];
    itemdataset.push(...ITEMDATASET);
    itemdataset.push(...ITEMDATASET2);
    itemdataset.forEach((i) => {
      this.itemResourcedataMap.set(i.uuid as string, i);
    })
  }

  // Find a chain of meshes that don't exist in space 
  private findVacantParentChain(id: number) {
    let chain: number[] = [];
    while(!this.meshMap.has(id)) {
      if(this.resourcedataMap.has(id)) {
        chain.push(id);
        let pid = (this.resourcedataMap.get(id) as ResourceData).parent as number;
        id = pid;
      } else {
        return [];
      }
    }
    return chain;
  }

  private createParentChain(id: number) {
    let chain = this.findVacantParentChain(id).reverse();
    if(chain.length > 0) {
      chain.forEach((cid) => {
        let index = Math.floor(Math.random() * this.pics.length);
        let mesh = this.createMesh(50, 100, 50, this.pics[index]);
        let parentID = (this.resourcedataMap.get(cid) as ResourceData).parent as number;
        let parentMesh = this.meshMap.get(parentID) as Mesh;
        let packing = (parentMesh.userData as UserObject).packing3;
        let occupiedFlag = false;
        for(let i=0;i<packing.length;i++) {
          if(!occupiedFlag) {
            if(!packing[i].occupied) {
              mesh.position.copy(packing[i].position);
              packing[i].occupied = true;
              mesh.userData = this.generateUserData(cid, mesh, true);
              this.createLines(this.meshMap.get(parentID) as Mesh, mesh, 0x888888);
              this.meshArray.push(mesh);
              this.meshMap.set((this.resourcedataMap.get(cid) as ResourceData).handleID as number, mesh);
              occupiedFlag = true;
            }
          }
        }
      })
    }
  }

  private getPosition(base: Mesh) {
    let packing = (base.userData as UserObject).packing3;
    for(let i=0;i<packing.length;i++) {
      if(!packing[i].occupied) {
        packing[i].occupied = true;
        return packing[i].position;
      }
    }
    return new Vector3();
  }

  private createChildrenChain(id: number) {
    let chain = this.findChildrenIDBFS(id);
    for(let i=0;i<chain.length;i++) {
      let resourcedata = this.resourcedataMap.get(chain[i]) as ResourceData;
      if(!this.meshMap.has(chain[i])) {
        let parent = this.meshMap.get(resourcedata.parent) as Mesh;
        let packing = (parent?.userData as UserObject).packing3;
        let mesh = this.createMesh(50, 100, 50, this.planetPics[i%5]);
        let occupiedFlag = false;
        for(let j=0;j<packing.length;j++) {
          if(!occupiedFlag) {
            if(!packing[j].occupied) {
              mesh.position.copy(packing[j].position);
              packing[j].occupied = true;
              mesh.userData = this.generateUserData(chain[i], mesh, true);
              this.createLines(parent, mesh, 0x888888);
              this.meshArray.push(mesh);
              this.meshMap.set(chain[i], mesh);
              occupiedFlag = true;
            }
          }
        }
      }
    }
  }

  private deleteChildrenChain(id: number) {
    let chain = this.findChildrenIDBFS(id).reverse();
    let rootID = chain.pop() as number; // Keep the clicked mesh
    let parentObject = this.meshMap.get(rootID)?.userData as UserObject;
    chain.forEach((c) => {
      this.deleteMesh(c);
    })
    parentObject.showchildren = false;
    parentObject.packing3.forEach((p) => {
      p.occupied = false;
    })
  }

  private generateUserData(id: number, base: Mesh, showstatus: boolean) {
    let repdata = {} as UserObject;
    repdata.packing2 = this.getChildrenOutward2DPacking(400, 100, base);
    repdata.packing3 = this.getChildrenOutward3DPackingSorted(400, 100, base);
    repdata.showchildren = showstatus;
    repdata.resourcedata = this.resourcedataMap.get(id) as ResourceData;
    return repdata;
  }

  private formNestedNodesByID(id: number) {
    let rd = this.resourcedataMap.get(id) as ResourceData;
    let node = {} as NestedResourceNode;
    node.id = rd.handleID as number;
    node.name = rd.name;
    node.strength = rd.strength as number;
    let childIDs = rd.children;
    let cNodes = [] as NestedResourceNode[];
    while(childIDs.length > 0) {
      let cid = childIDs.shift() as number;
      let cNode = this.formNestedNodesByID(cid);
      cNodes.push(cNode);
    }
    node.children = cNodes;
    return node;
  }

  public HandleToUUID(id: number) {
    return (this.resourcedataMap.get(id) as ResourceData).uuid; 
  }

  public findItemsByCollectionUuid(uuid: string) {
    let itemMap = new Map<string, ItemResourceData>();
    let itemData = this.itemResourcedataMap;
    itemData.forEach((i) => {
      if(i.parentUUID[0]===uuid) {
        itemMap.set(i.uuid, i);
      }
    })
    console.log("itemMap size: "+itemMap.size);
    return itemMap;
  }
}

// Click on an item button: 
// 1) Check if its owningcollection exists in Scene: 
//    a) true: generate item obj, tween it to center, display profile info, generate surrounding objects, change breadcrums
//    b) false: generate its owningcollection and parents if needed, generate item obj, tween it to center, display profile info, generate surrounding objects, change breadcrums
// Click on a collection/community button:
// 1) Check if it exists in Scene:
//    a) true: tween it to center, display profile info, change breadcrums
//    b) false: check if its direct parents exist, generate if not, tween it to center, display profile info, change breadcrums
// Click on a collection/community or Center:
//  1) Check if it exists in Scene
//    a) true: tween to center, display profile info, change breadcrums
//    b) false: generate it and its parents if needed, display profile info, change breadcrums

// Info pane 1 (left), Info pane 2 (right)
// Info pane 1: Item: Simple page + stats charts (motion); Col/Com/Center: Name + description + logo + Strength + stats charts (motion)
// Info pane 2: Srach bar + Community/Collection page

// tween.js graphs chain

// Controls
// Use your mouse or trackpad to navigate the scene. To zoom, use a scroll motion. When viewing a planet, you can move around a planet using a click + drag motion.
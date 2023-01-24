import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import * as TWEEN from '@tweenjs/tween.js';
import { GUI } from 'dat.gui';
import { UserObject, ResourceData } from './canvasutils';
import { SITEDATASET, COMMUNITYDATASET, COLLECTIONDATASET } from './mock-data';

@Component({
  selector: 'ds-three-canvas',
  templateUrl: './three-canvas.component.html',
  styleUrls: ['./three-canvas.component.scss']
})
export class ThreeCanvasComponent implements OnInit, AfterViewInit {

  ngOnInit() {}

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
  public lines: THREE.Line[] = [];

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

  public gui = new GUI();
  public cubeFolder!: GUI;

  @ViewChild('canvas')
  public canvasRef!: ElementRef;

  @HostListener('window:click', ['$event'])
  async onDocumentMouseDown(event: MouseEvent) {
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
    event.preventDefault();
    const raycaster = new THREE.Raycaster();
    const mouse = this.getMouse(event);
    raycaster.setFromCamera( mouse, this.camera );
    const intersects = raycaster.intersectObjects( this.meshArray, false );
    if (intersects.length > 0 ) {
      let cx = intersects[0].object.position.x;
      let cy = intersects[0].object.position.y;
      let cz = intersects[0].object.position.z;  
      if(!(cx==0 && cy==0 && cz==0)) {
        this.createGroupMeshes(intersects[0].object as THREE.Mesh);
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
    this.createLight();
    this.creatStars();
    this.createInitGeometriesOnPlane();
    // this.createGroupMeshes();
    // this.createGeometries();
    // this.createGeometriesOnPlane();
    // this.startRendering();
    this.animate();
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

  private createMesh(radius: number,segmentsX: number, segmentsY: number, texture?: string ) {
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
  createGeometries() {
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
          if (posArray[ind].valid == 1) {
              while (posArray[ind].valid == 1)
                  ind = Math.floor(Math.random() * posArray.length);
          }
          posArray[ind].valid = 1;
          mesh.position.set(posArray[ind].pos.x, posArray[ind].pos.y, posArray[ind].pos.z);
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
          if (posArray[ind].valid == 1) {
              while (posArray[ind].valid == 1)
                  ind = Math.floor(Math.random() * posArray.length);
          }
          posArray[ind].valid = 1;
          mesh.position.set(posArray[ind].pos.x, posArray[ind].pos.y, posArray[ind].pos.z);
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

  createInitGeometriesOnPlane() {
    let posArray2D = this.get2DPackingList(400, 100);
    let posArray3D = this.get3DPackingList(400, 100);
    console.log("3D position length: " + posArray3D.length)
    let cData = this.getTopCommunities();
    let mesh: THREE.Mesh;

    for (let i = 0; i < cData.length + 1; i++) {
        let mesh: THREE.Mesh;
        let repdata = {} as UserObject;
        if(i == 0) {
          // SHAREOK
          mesh = this.createMesh(100, 100, 50, this.planetPics[0]);
          mesh.position.set(0, 0, 0);
          let sdata = SITEDATASET;``
          repdata.packing2 = posArray2D;
          repdata.packing3 = posArray3D;
          repdata.showstatus = true;
          repdata.resourcedata = sdata;
          mesh.userData = repdata;
        } else {
          mesh = this.createMesh(100, 100, 50);
          repdata.packing2 = posArray2D;
          repdata.packing3 = posArray3D;
          repdata.showstatus = false;
          repdata.resourcedata = cData[i-1];
          mesh.userData = repdata;

          let ind =  4 * i - 4;
          posArray2D[ind].valid = 1;
          mesh.position.set(posArray2D[ind].pos.x, posArray2D[ind].pos.y, posArray2D[ind].pos.z);
          this.createLines(this.meshArray[0], mesh, 0x888888);
        }
        // mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 4 + 2;
        // this.scene.add(mesh);
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
    let posArray = center.userData as { pos: THREE.Vector3; valid: number; }[];
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
      posArray[i+2].valid = 1;
      mesh.position.set( posArray[i+2].pos.x + x, posArray[i+2].pos.y + y, posArray[i+2].pos.z + z);
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
        positionArray.push({ pos: position, valid: 0 });
      }
    }
    return positionArray;
  }

  public createLines(mesh1: THREE.Mesh, mesh2: THREE.Mesh, linecolor?: number) {
    if (typeof linecolor === 'undefined') {
      linecolor = 0x6699CC;
    }
    const material = new THREE.LineBasicMaterial( { color: linecolor } );
    const points = [];
    points.push( mesh1.position );
    points.push( mesh2.position );    
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const line = new THREE.Line( geometry, material );
    this.scene.add( line );
    this.lines.push(line);
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
      positionArray.push({ pos: position, valid: 0 });
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

  private setupDatGui(mesh: THREE.Mesh) {
    if(typeof this.cubeFolder === 'undefined') {
      // this.gui.removeFolder(this.cubeFolder);
      this.cubeFolder = this.gui.addFolder('Information');
    }
    
    
    // this.cubeFolder.add(mesh.userData as UserObject, 'name');
    // this.cubeFolder.add(mesh.userData as UserObject, 'uuid');
    // this.cubeFolder.open();
    // // cubeFolder.domElement.innerHTML = 'hello';
    // console.log("All folders "+this.cubeFolder.__folders + '-' + this.cubeFolder.__folders[0]);
    // console.log("DOM "+this.cubeFolder.domElement.innerHTML);
    let domelement = '<ul><li class="title">Information</li><li class="cr string"><div><span class="property-name">name</span><div class="c"><input type="text"></div></div></li><li class="cr string"><div><span class="property-name">uuid</span><div class="c"><input type="text"></div></div></li></ul>';
    this.cubeFolder.domElement.innerHTML = domelement
  }

  private getTopCommunities() {
    let cData = COMMUNITYDATASET;
    let tc: ResourceData[] = [];
    cData.forEach((element) => {
      if(element.parent === 0) {
        tc.push(element);
      }
    })
    return tc;
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
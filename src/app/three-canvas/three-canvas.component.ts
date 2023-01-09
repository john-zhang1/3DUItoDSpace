import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import * as TWEEN from '@tweenjs/tween.js';

@Component({
  selector: 'ds-three-canvas',
  templateUrl: './three-canvas.component.html',
  styleUrls: ['./three-canvas.component.scss']
})
export class ThreeCanvasComponent implements OnInit, AfterViewInit {

  public renderer!: THREE.WebGLRenderer;
  public scene!: THREE.Scene;
  public camera!: THREE.PerspectiveCamera;
  public mesh!: THREE.Mesh;
  public light: THREE.AmbientLight | any;

  public getScreenWidth: any;
  public getScreenHeight: any;

  // Mesh Properties

  public rotationSpeedX = 0.05;
  public rotationSpeedY = 0.01;
  public size = 200;

  // Stage Properties
  public cameraZ = -10;
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
  public rotationSpeed = 0.1; // initial rotation speed of object
  public container: any;
  public floatTween = new TWEEN.Tween({x:0, y:0, z:0});
  public touchTween = new TWEEN.Tween({x:0, y:0, z:0});
  public floatAgain: any;
  public controls!: TrackballControls;
  public mouseClock = new THREE.Clock();  // added Timer to calculate duration between automatic tweens
  public mouseupTime: number = 0;
  public indexCurrent = 0;

  public meshArray: THREE.Mesh[] = [];

  public targetRotationX = 0.05; // rotation vars, tweak these to tweak the speed while rotating an object
  public targetRotationY = 0.05;
  public sunRotation = 0.25;
  public targetRotationOnMouseDownX = 0.05;
  public targetRotationOnMouseDownY = 0.05;

  public mouseX = 0; // vars for tracking mouse position
  public mouseY = 0;
  public mouseXOnMouseDown = 0;
  public mouseYOnMouseDown = 0;
  public innerWidthOffset = 200;
  // window.innerWidth = window.innerWidth - innerWidthOffset;
  public windowHalfX = window.innerWidth / 2;
  public windowHalfY = window.innerHeight / 2;

  public vector: any;
  public ray: any;
  public intersects: any;
  public object = new THREE.Mesh();
  public currentObj = new THREE.Mesh();
  public objects = Array<THREE.Mesh>;
  public segmentsX: any;
  public segmentsY: any; // for optimization, the default number of segments can be adjusted for ALL objects 

  public theObjects = ['Sun', 'Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];
  public objectTex = ['0xfff8a3', '0xdfb47f', '0xb46b1c', '0x235c77', '0xa25714', '0xd29a69', '0xf5c583', '0x95adb9', '0x6086e7'];
  public objectRadius = [50, 100, 150, 150, 150, 150, 150, 150, 150];
  public planetXPos = [0, this.getNum(250, 500), this.getNum(-500, -100), this.getNum(-500, -100), this.getNum(-500, -100), this.getNum(-550, -250), this.getNum(250, 500), this.getNum(250, 500), this.getNum(250, 500)];
  public planetYPos = [0, this.getNum(250, 500), this.getNum(250, 500), this.getNum(-500, -100), this.getNum(-500, -100), this.getNum(250, 500), this.getNum(250, 500), this.getNum(-500, -100), this.getNum(-500, -100)];
  public planetZPos = [0, this.getNum(-500, -100), this.getNum(250, 500), this.getNum(-500, -100), this.getNum(250, 500), this.getNum(-500, -100), this.getNum(250, 500), this.getNum(-500, -100), this.getNum(250, 500)];
  // Array that stores pictures
  public planetPics = ['assets/textures/earth_atmos_2048.jpg', 'assets/textures/earthbump1k.jpg', 'assets/textures/earthmap1k.jpg', 'assets/textures/jupiter2_1k.jpg', 'assets/textures/land_ocean_ice_cloud_2048.jpg', 'assets/textures/mars_1k_color.jpg', 'assets/textures/mercurymap.jpg', 'assets/textures/saturnmap.jpg', 'assets/textures/neptunemap.jpg'];
  public look = new THREE.Vector3(0, 0, 0);
  public trigger = 0;

  @ViewChild('canvas')
  public canvasRef!: ElementRef;

  @HostListener('window:click', ['$event'])
  async onDocumentMouseDown(event: MouseEvent) {
    event.preventDefault();
    TWEEN.removeAll();
    const vector = new THREE.Vector3((event.clientX / this.canvas.clientWidth) * 2 - 1, - (event.clientY / this.canvas.clientHeight) * 2 + 1, 0.5);

    const look = new THREE.Vector3();
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    mouse.x = ( event.clientX / this.canvas.clientWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / this.canvas.clientHeight ) * 2 + 1;
    raycaster.setFromCamera( mouse, this.camera );
    const intersects = raycaster.intersectObjects( this.meshArray, false );
    const moveCam = (camiX: number, camiY: number, camiZ: number, look: THREE.Vector3) => {
      this.camera.position.x = camiX;
      this.camera.position.y = camiY;
      this.camera.position.z = camiZ;
      this.camera.lookAt(look);
      this.camera.updateProjectionMatrix();
    }

    if (intersects.length > 0) {
      this.controls.enabled = false;
      console.log("Camera Position before: "+ this.camera.position.x + ","+this.camera.position.y +","+this.camera.position.z);
      console.log("Intersect Position before: "+ intersects[0].object.position.x + ","+intersects[0].object.position.y +","+intersects[0].object.position.z);
      console.log("Planet 1 Position before: "+ this.meshArray[1].position.x + ","+this.meshArray[1].position.y +","+this.meshArray[1].position.z);
      console.log("Planet 2 Position before: "+ this.meshArray[2].position.x + ","+this.meshArray[2].position.y +","+this.meshArray[2].position.z);
      TWEEN.removeAll();
      this.touchTween = new TWEEN.Tween( {x: this.camera.position.x, y: this.camera.position.y, z: this.camera.position.z} )
        .to( {x: intersects[0].object.position.x, y: intersects[0].object.position.y, z: intersects[0].object.position.z }, 400 )
        .easing(TWEEN.Easing.Cubic.InOut)
        .onUpdate(function(o) {
          moveCam(o.x, o.y, o.z, look)
        })
        .start()
        await new Promise(f => setTimeout(f, 1000));
        console.log("Camera Position after: "+ this.camera.position.x + ","+this.camera.position.y +","+this.camera.position.z);
        console.log("Intersect Position after: "+ intersects[0].object.position.x + ","+intersects[0].object.position.y +","+intersects[0].object.position.z);
        console.log("Planet 1 Position after: "+ this.meshArray[1].position.x + ","+this.meshArray[1].position.y +","+this.meshArray[1].position.z);
        console.log("Planet 2 Position after: "+ this.meshArray[2].position.x + ","+this.meshArray[2].position.y +","+this.meshArray[2].position.z);  
    } else {
      this.controls.enabled = true;
      this.targetRotationX = 0;
      this.targetRotationX = 0;
    }
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

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.createScence();
    this.configScene();
    this.configCamera();
    this.configRenderer();
    this.configControls();
    this.createLight();
    this.creatStars();
    this.createGeometries();
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
    this.camera.position.set(0, 0, 100);
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
    this.controls.minDistance = this.radius * 1.1;
    this.controls.maxDistance = this.radius * 100;
    this.controls.update();
  }

  createLight() {
    this.light = new THREE.AmbientLight(0xfff5f2);
    this.light.position.set(0, 0, 0);
    this.scene.add(this.light);
  }

  private createMesh(radius: number,segmentsX: number, segmentsY: number, texture: string ) {
    const geometry = new THREE.SphereGeometry(radius, segmentsX, segmentsY);
    geometry.computeTangents();
    const material = new THREE.MeshBasicMaterial({ map: this.loder.load(texture) });
    const mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);
    return mesh;
  }

  createGeometries() {
    for (let i=0; i<10; i++) {
        const mesh = this.createMesh(this.objectRadius[i]/3, 100, 50, this.planetPics[i%5]);
        mesh.position.set(this.planetXPos[i%9], this.planetYPos[i%9], this.planetZPos[i%9]);
        mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 4 + 2;
        this.scene.add(mesh);
        this.meshArray.push(mesh);
    }
    if(this.meshArray.length > 0) {
      this.currentObj = this.meshArray[0];
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

  public getSphericalPackingList(dist: number, rad: number) {
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

}

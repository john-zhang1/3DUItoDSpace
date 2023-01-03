import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';


@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.scss']
})
export class CubeComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas')
  public canvasRef!: ElementRef;

  // Reflect code
  ////////////////////
  public renderer!: THREE.WebGLRenderer;
  public scene!: THREE.Scene;
  public camera!: THREE.PerspectiveCamera;
  public mesh: THREE.Mesh | any;
  public light: THREE.AmbientLight | any;

  ////////////////////
  public getScreenWidth: any;
  public getScreenHeight: any;

  // Cube Properties

  public rotationSpeedX = 0.05;
  public rotationSpeedY = 0.01;
  public size = 200;
  public texture: string = '/assets/textures/earthmap1k.jpg';
  // Stage Properties
  public cameraZ = 10;
  public fieldOfView = 90;
  public nearClippingPlane = 1;
  public farClippingPlane = 25000;
  // Helper Properties

  // 

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
  public loder = new THREE.TextureLoader();
  // public geometry = new THREE.BoxGeometry(1, 1, 1);
  // public geometry = new THREE.PlaneGeometry(1, 1, 10);
  // public geometry = new THREE.CylinderGeometry(1.5, 1.5, 1, 32);
  // public geometry = new THREE.IcosahedronGeometry(1.5, 0);
  // public geometry = new THREE.ConeGeometry(1, 2, 32);
  public geometry = new THREE.SphereGeometry(1.5, 32, 32);

  public material = new THREE.MeshBasicMaterial({ map: this.loder.load(this.texture) });
  public cube = new THREE.Mesh(this.geometry, this.material);


  // * Old variables from Connection
  public radius = 5;
  public tilt = 0.41;
  public rotationSpeed = 0.1; // initial rotation speed of object
  public container: any;
  public stats: any;
  public floatTween: any;
  public floatAgain: any;
  public touchTween: any; // tween vars
  public controls!: TrackballControls;
  public projector: any; // typical objects for Three.js
  public mouseClock = new THREE.Clock();  // added Timer to calculate duration between automatic tweens
  public mouseupTime: any;
  public objectSelect: any; // vars for automatic tweening of objects

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
  public object: Object | any;
  public currentObj!: THREE.Mesh;
  public objects: Object[] | any;
  public segmentsX: any;
  public segmentsY: any; // for optimization, the default number of segments can be adjusted for ALL objects 

  public theObjects = ['Sun', 'Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];
  public objectTex = ['0xfff8a3', '0xdfb47f', '0xb46b1c', '0x235c77', '0xa25714', '0xd29a69', '0xf5c583', '0x95adb9', '0x6086e7'];
  public objectRadius = [50, 100, 150, 150, 150, 150, 150, 150, 150];
  public planetXPos = [0, this.getRandom(250, 500), this.getRandom(-500, -100), this.getRandom(-500, -100), this.getRandom(-500, -100), this.getRandom(-550, -250), this.getRandom(250, 500), this.getRandom(250, 500), this.getRandom(250, 500)];
  public planetYPos = [0, this.getRandom(250, 500), this.getRandom(250, 500), this.getRandom(-500, -100), this.getRandom(-500, -100), this.getRandom(250, 500), this.getRandom(250, 500), this.getRandom(-500, -100), this.getRandom(-500, -100)];
  public planetZPos = [0, this.getRandom(-500, -100), this.getRandom(250, 500), this.getRandom(-500, -100), this.getRandom(250, 500), this.getRandom(-500, -100), this.getRandom(250, 500), this.getRandom(-500, -100), this.getRandom(250, 500)];
  // Array that stores pictures
  public planetPics = ['assets/textures/earth_atmos_2048.jpg', 'assets/textures/earthbump1k.jpg', 'assets/textures/earthmap1k.jpg', 'assets/textures/jupiter2_1k.jpg', 'assets/textures/land_ocean_ice_cloud_2048.jpg', 'assets/textures/mars_1k_color.jpg', 'assets/textures/mercurymap.jpg', 'assets/textures/saturnmap.jpg', 'assets/textures/neptunemap.jpg'];
  public look = new THREE.Vector3(0, 0, 0);
  public trigger = 0;


  ngOnInit() { }

  ngAfterViewInit() {
    // this.createScence();
    // this.startRenderingLoop();
    // this.init();
    this.configScene();
    this.configCamera();
    this.configRenderer();
    this.configControls();
    this.createLight();
    this.createMesh();
    this.startRendering();
  }

  public createScence() {
    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);
    this.scene.add(this.cube);

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

  public init() {

    this.scene = new THREE.Scene();
    let aspectRatio = this.calculateAspectRatio();
    this.camera = new THREE.PerspectiveCamera(90, aspectRatio, 1, 25000);

    this.camera.position.z = 2500; // tweaking the camera for the trackball
    this.camera.setFocalLength(12);
    this.camera.lookAt(this.look);
    this.scene.add(this.camera);
    // mouseClock.start(); // starting the clock, used for tweens and animation
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    /* 
    controls 
    */
    this.controls = new TrackballControls(this.camera, this.canvas);
    this.segmentsX = 36;
    this.segmentsY = 36;

    this.controls.rotateSpeed = 0.4; // tweak the controls
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.2;

    this.controls.noZoom = false;
    this.controls.noPan = false;

    this.controls.staticMoving = false;
    this.controls.dynamicDampingFactor = 0.3;

    this.controls.minDistance = this.radius * 1.1;
    this.controls.maxDistance = this.radius * 100;
    //controls.enabled = false;
    //controls.keys = [ 65, 83, 68 ]; // [ rotateKey, zoomKey, panKey ]

    this.scene.add(new THREE.AmbientLight(0xfff5f2));
    /* 
    OBJECT CREATION 
    */
    const objectRadiusSelected = this.objectRadius[2];

    const geometry = new THREE.SphereGeometry(objectRadiusSelected, this.segmentsX, this.segmentsY);
    const material = new THREE.MeshBasicMaterial({ map: this.loder.load(this.planetPics[4]) });
    for (let i = 0; i < 1; i++) { /* draw the planets */
      const mesh = new THREE.Mesh(geometry, material);
      if (i == 0) {
        mesh.position.x = 0;
        mesh.position.y = 0;
        mesh.position.z = 0;
      }
      else {
        if (i % 8 == 0) {
          mesh.position.x = this.getRandom(250, 500);
          mesh.position.y = this.getRandom(250, 500);
          mesh.position.z = this.getRandom(250, 500);
        } else if (i % 8 == 1) {
          mesh.position.x = this.getRandom(250, 500);
          mesh.position.y = this.getRandom(250, 500);
          mesh.position.z = this.getRandom(-550, -100);
        } else if (i % 8 == 2) {
          mesh.position.x = this.getRandom(250, 500);
          mesh.position.y = this.getRandom(-550, -100);
          mesh.position.z = this.getRandom(250, 500);
        } else if (i % 8 == 3) {
          mesh.position.x = this.getRandom(-550, -100);
          mesh.position.y = this.getRandom(250, 500);
          mesh.position.z = this.getRandom(250, 500);
        } else if (i % 8 == 4) {
          mesh.position.x = this.getRandom(250, 500);
          mesh.position.y = this.getRandom(-550, -100);
          mesh.position.z = this.getRandom(-550, -100);
        } else if (i % 8 == 5) {
          mesh.position.x = this.getRandom(-550, -100);
          mesh.position.y = this.getRandom(250, 500);
          mesh.position.z = this.getRandom(-550, -100);
        } else if (i % 8 == 6) {
          mesh.position.x = this.getRandom(-550, -100);
          mesh.position.y = this.getRandom(-550, -100);
          mesh.position.z = this.getRandom(250, 500);
        } else {
          mesh.position.x = this.getRandom(-550, -100);
          mesh.position.y = this.getRandom(-550, -100);
          mesh.position.z = this.getRandom(-550, -100);
        }
      }
      mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 4 + 2;
      // this.object[i].name = this.theObjects[i%9];
      // this.object[i].radius = this.objectRadius[0];
      // this.object[i].doubleSided = true;
      // if (i > 0)
      //     this.objects.push(mesh);
      this.scene.add(mesh);
    }

    // currently selected object, basically a null on init
    this.currentObj = new THREE.Mesh(new THREE.SphereGeometry(20, 16, 16), new THREE.MeshBasicMaterial({ map: this.loder.load(this.planetPics[4]) }));
    this.scene.add(this.currentObj);

    // projector = new THREE.Projector(); // helper object for mouse selection
    this.renderer.render(this.scene, this.camera);
    // container.appendChild(renderer.domElement); // adds the render engine to the DOM
    /*
    STATS
    Good for dev, not for production
    Comment these lines when deploying for production, comment the stats library so it isnt included
    */
    // stats = new Stats();
    // stats.domElement.style.position = 'absolute';
    // stats.domElement.style.top = '0px';
    // container.appendChild(stats.domElement);
    /*
    EVENT Listeners
    */

    // document.addEventListener('mousedown', onDocumentMouseDown, false);
    // document.addEventListener('touchstart', onDocumentTouchStart, false);
  }

  public animateCube() {
    this.cube.rotation.x += this.rotationSpeedX;
    this.cube.rotation.y += this.rotationSpeedY;
  }

  public startRenderingLoop() {
    // Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    let component: CubeComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.animateCube();
      component.renderer.render(component.scene, component.camera);
    }());
  }

  public getRandom(min: number, max: number) {
    return Math.random() * (max - min) + min;
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

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(90, 800 / 640, 1, 25000);
  }

  configScene() {
    this.scene.background = new THREE.Color(0x000000);
  }

  configCamera() {
    this.camera.aspect = this.calculateAspectRatio();
    this.camera.updateProjectionMatrix();
    this.camera.position.set(0, 0, 10);
    this.camera.lookAt(this.scene.position);
  }

  configRenderer() {
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
  }

  configControls() {
    this.controls = new TrackballControls(this.camera, this.canvas);
    this.controls.rotateSpeed = 0.4;
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

  createMesh() {
    const geometry = new THREE.SphereGeometry(1.5, 32, 32);
    const material = new THREE.MeshBasicMaterial({ map: this.loder.load(this.texture) });
    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);
  }

  animate() {
    this.mesh.rotation.x += this.rotationSpeedX;
    this.mesh.rotation.y += this.rotationSpeedY;
    this.controls.update();
  }

  public startRendering() {
    let component: CubeComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.animate();
      component.renderer.render(component.scene, component.camera);
    }());
  }

}

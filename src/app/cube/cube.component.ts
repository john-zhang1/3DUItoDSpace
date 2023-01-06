import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { Easing, Tween, update } from "@tweenjs/tween.js";

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.scss']
})

export class CubeComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas')
  public canvasRef!: ElementRef;

  // counter = 0;
  // @HostListener('window:click', ['$event'])
  // shareok(event: MouseEvent) {
  //   this.counter++;
  // }
  // resetCounter() {
  //   this.counter = 0;
  // }
  @HostListener('window:resize', ['$event'])
  onResize(event:MouseEvent) {
    let screenWidth=window.innerWidth;

    if(screenWidth>760)
      {
        this.screenMode="big"
      }
      else
      {
        this.screenMode="small";
      }
  }

  // Reflect code
  ////////////////////
  public renderer!: THREE.WebGLRenderer;
  public scene!: THREE.Scene;
  public camera!: THREE.PerspectiveCamera;
  public mesh!: THREE.Mesh;
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
  public cameraZ = -10;
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
  public radius = 1650;
  public tilt = 0.41;
  public rotationSpeed = 0.1; // initial rotation speed of object
  public container: any;
  public floatTween: any;
  public floatAgain: any;
  public touchTween: any; // tween vars
  public controls!: TrackballControls;
  public projector: any; // typical objects for Three.js
  public mouseClock = new THREE.Clock();  // added Timer to calculate duration between automatic tweens
  public mouseupTime: number = 0;
  public objectSelect = new THREE.Mesh();

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

  screenMode:any;
  ngOnInit() {
    //Initial screenMode setup
    let screenWidth=window.innerWidth;

    if(screenWidth>760)
      {
        this.screenMode="big"
      }
      else
      {
        this.screenMode="small";
      }  
   }

  ngAfterViewInit() {
    // this.createScence();
    // this.startRenderingLoop();

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

  public animateCube() {
    this.cube.rotation.x += 0.05;
    this.cube.rotation.y += 0.01;
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

  animate() {
    requestAnimationFrame(()=>this.animate());
    // this.objectSelect.rotation.x += 0.05;

    // this.mesh.rotation.x += 0.05;
    // this.mesh.rotation.y += 0.01;
    // this.meshRotations();
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  public startRendering() {
    let component: CubeComponent = this;
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


//   render2() {
//     let checkTime = this.mouseClock.getElapsedTime();
//     let elapsedTime = checkTime - this.mouseupTime;
//     let elapsedDuration = 45;
//     if (elapsedTime >= elapsedDuration) {
//         Tween.remove(floatTween);
//         Tween.remove(touchTween);
//         let floatTween = new Tween({ x: this.camera.position.x, y: this.camera.position.y, z: this.camera.position.z })
//             .to({ x: this.object[this.objectSelect].position.x, y: object[this.objectSelect].position.y, z: object[this.objectSelect].position.z }, elapsedDuration * 1000)
//             .easing(Easing.Quadratic.InOut)
//             .onUpdate(function () {
//                 radian = (this.a / 180) * Math.PI;
//                 moveCam(this.x, this.y, this.z, 12, 12, look);
//                 var tempVec = new THREE.Vector3(this.x, this.y, this.z);
//                 _rotateEnd = tempVec;
//             }).start();
//         this.updateTimer();
//     }
//     // actually rotate the currentObj while rendering, adjust speed of the rotation here 
//     currentObj.rotation.x += (targetRotationX + currentObj.rotation.x) / 3000;
//     currentObj.rotation.y += (targetRotationY + currentObj.rotation.y) / 3000;
//     // render
//     renderer.render(scene, camera);

// }

// updateTimer() {
//   mouseupTime = this.mouseClock.getElapsedTime();
//   objectSelect = Math.ceil(this.getNum(1, 8));
// }
}

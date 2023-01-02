import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.scss']
})
export class CubeComponent implements OnInit, AfterViewInit{

  @ViewChild('canvas')
  public canvasRef!: ElementRef;

  public getScreenWidth: any;
  public getScreenHeight: any;
  
  // Cube Properties

  public rotationSpeedX = 0.05;
  
  public rotationSpeedY = 0.01;
  
  public size = 200;
  
  public texture: string = "/assets/textures/earthmap1k.jpg";

  // Stage Properties

  public cameraZ = 400;

  public fieldOfView = 1;

  public nearClippingPlane = 1;

  public farClippingPlane = 1000;

  // Helper Properties

  public camera!: THREE.PerspectiveCamera;

  public get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
  public loder = new THREE.TextureLoader();
  // public geometry = new THREE.BoxGeometry(1, 1, 1);
  // public geometry = new THREE.PlaneGeometry(1, 1, 10);
  // public geometry = new THREE.CylinderGeometry(1.5, 1.5, 1, 32);
  // public geometry = new THREE.IcosahedronGeometry(1.5, 0);
  // public geometry = new THREE.ConeGeometry(1, 2, 32);
  public geometry = new THREE.SphereGeometry(1.5, 32, 32);

  public material = new THREE.MeshBasicMaterial({map: this.loder.load(this.texture)});
  public cube = new THREE.Mesh(this.geometry, this.material);
  public renderer!: THREE.WebGLRenderer;
  public scene!: THREE.Scene;

  ngOnInit() { }

  ngAfterViewInit() {
    this.createScence();
    this.startRenderingLoop();
   }

   public createScence() {
    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);
    this.scene.add(this.cube);
  
    // Camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    )
    this.camera.position.z = this.cameraZ;
  }

  public getAspectRatio() {
    return this.canvas.clientWidth /this.canvas.clientHeight;
  }

  public animateCube() {
    this.cube.rotation.x += this.rotationSpeedX;
    this.cube.rotation.y += this.rotationSpeedY;
  }

  public startRenderingLoop() {
    // Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas});
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    let component: CubeComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.animateCube();
      component.renderer.render(component.scene, component.camera);
    }());
  }
}

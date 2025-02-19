import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

@Component({
  selector: 'app-token-rave',
  standalone: true,
  templateUrl: './token-rave.component.html',
  styleUrls: ['./token-rave.component.css'],
})
export class TokenRaveComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas') private canvasRef!: ElementRef<HTMLCanvasElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private tokenMesh!: THREE.Mesh;
  private animationFrameId: number | null = null;

  ngOnInit() {
    console.log('TokenRave component initialized');
  }

  ngAfterViewInit() {
    console.log('TokenRave initialized');
    this.initThreeJS();
    this.loadSTLModel();
    this.animate();
    
    // Force initial resize
    this.onResize();
  }

  ngOnDestroy() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.disposeThreeJS();
  }

  @HostListener('window:resize')
  onResize() {
    if (!this.canvasRef) return;

    const canvas = this.canvasRef.nativeElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }

  private initThreeJS() {
    this.scene = new THREE.Scene();
    this.scene.background = null; // Fond transparent
    
    const container = this.canvasRef.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      canvas: container // Utiliser directement le canvas référencé
    });
    
    this.renderer.setSize(width, height);
    this.camera.position.z = 5;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;
    this.controls.screenSpacePanning = false;

    // Ajout des lumières ici plutôt que dans loadSTLModel
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(ambientLight, directionalLight);
  }

  private loadSTLModel() {
    const loader = new STLLoader();
    const modelPath = 'assets/Rave.stl';
    
    console.log('Loading STL from:', modelPath);
    
    loader.load(
      modelPath,
      (geometry) => {
        console.log('STL loaded successfully');
        const material = new THREE.MeshPhongMaterial({ 
          color: 0x007bff,
          specular: 0x111111,
          shininess: 200
        });
        this.tokenMesh = new THREE.Mesh(geometry, material);

        geometry.center();
        geometry.computeVertexNormals(); // Important pour l'éclairage

        const box = new THREE.Box3().setFromObject(this.tokenMesh);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 4.5 / maxDim;
        
        this.tokenMesh.scale.set(scale, scale, scale);
        this.tokenMesh.rotation.x = -Math.PI / 2; // Correction de l'orientation si nécessaire

        this.scene.add(this.tokenMesh);

        // Ajuster la caméra
        const center = box.getCenter(new THREE.Vector3());
        this.camera.position.set(center.x, center.y + maxDim, center.z + maxDim * 1.5);
        this.camera.lookAt(center);
        this.controls.target.copy(center);
        this.controls.update();
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      (error) => {
        console.error('Error loading STL:', error);
      }
    );
  }

  private animate() {
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    if (this.tokenMesh) {
      this.tokenMesh.rotation.y += 0.005;
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  private disposeThreeJS() {
    this.scene.clear();
    this.renderer.dispose();
    this.controls.dispose();
  }
}

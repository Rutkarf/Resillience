import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { MeshPhysicalMaterial } from 'three';

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
  private tokenGroup!: THREE.Group;
  private animationFrameId: number | null = null;
  private mainMaterial!: MeshPhysicalMaterial;
  private colorChangeInterval: any;

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
    if (this.colorChangeInterval) {
      clearInterval(this.colorChangeInterval);
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
    this.scene.background = null;
    
    const canvas = this.canvasRef.nativeElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      canvas: canvas,
      alpha: true
    });
    
    this.renderer.setSize(width, height);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.camera.position.z = 5;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;
    this.controls.screenSpacePanning = false;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(-5, 5, -5);
    pointLight.castShadow = true;
    this.scene.add(ambientLight, directionalLight, pointLight);
  }

  private loadSTLModel() {
    const loader = new STLLoader();
    const modelPath = 'assets/Rave.stl';
  
    console.log('Loading STL from:', modelPath);
  
    loader.load(
      modelPath,
      (geometry) => {
        console.log('STL loaded successfully');
  
        this.mainMaterial = new MeshPhysicalMaterial({
          color: 0xFF00FF, // Rose fuchsia
          metalness: 0.5,
          roughness: 0.5,
          reflectivity: 0.5,
          clearcoat: 0.3,
          clearcoatRoughness: 0.5
        });
  
        const outlineMaterial = new THREE.ShaderMaterial({
          uniforms: {
            color: { value: new THREE.Color(0x00ffff) }
          },
          vertexShader: `
            void main() {
              vec4 pos = modelViewMatrix * vec4(position + normal * 0.03, 1.0);
              gl_Position = projectionMatrix * pos;
            }
          `,
          fragmentShader: `
            uniform vec3 color;
            void main() {
              gl_FragColor = vec4(color, 0.5);
            }
          `,
          side: THREE.BackSide,
          transparent: true
        });
  
        geometry.center();
        geometry.computeVertexNormals();
  
        const mesh = new THREE.Mesh(geometry, this.mainMaterial);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        const outlineMesh = new THREE.Mesh(geometry, outlineMaterial);
        outlineMesh.scale.multiplyScalar(1.05);
  
        this.tokenGroup = new THREE.Group();
        this.tokenGroup.add(mesh);
        this.tokenGroup.add(outlineMesh);
  
        const box = new THREE.Box3().setFromObject(this.tokenGroup);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 4.5 / maxDim;
        
        this.tokenGroup.scale.set(scale, scale, scale);
        this.tokenGroup.rotation.x = -Math.PI / 2;
  
        this.scene.add(this.tokenGroup);
  
        const center = box.getCenter(new THREE.Vector3());
        this.camera.position.set(center.x, center.y + maxDim, center.z + maxDim * 1.5);
        this.camera.lookAt(center);
        this.controls.target.copy(center);
        this.controls.update();

        this.startColorChange();
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

    if (this.tokenGroup) {
      this.tokenGroup.rotation.y += 0.005;
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  private disposeThreeJS() {
    this.scene.clear();
    this.renderer.dispose();
    this.controls.dispose();
  }

  private startColorChange() {
    this.colorChangeInterval = setInterval(() => {
      this.changeColor();
    }, 1000); // Change color every second
  }

  private changeColor() {
    const hue = Math.random();
    const saturation = 0.5 + Math.random() * 0.5; // 0.5 to 1
    const lightness = 0.4 + Math.random() * 0.2; // 0.4 to 0.6
    this.mainMaterial.color.setHSL(hue, saturation, lightness);
  }
}

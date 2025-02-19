import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-particul-bg',
  standalone: true,
  template: '<div #canvasContainer></div>',
  styles: [
    `
      :host {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1; /* Place it behind all other content */
      }

      div {
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class ParticulBGComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasContainer') canvasRef!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private particles!: THREE.Points;

  ngOnInit() {}

  ngAfterViewInit() {
    this.initThreeJS();
    this.createParticles();
    this.animate();
  }

  private initThreeJS() {
    const container = this.canvasRef.nativeElement;

    // Create scene
    this.scene = new THREE.Scene();

    // Create camera
    const width = container.clientWidth;
    const height = container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 5;

    // Create renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(this.renderer.domElement);
  }

  private createParticles() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000; // Number of particles
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20; // Random positions in a cube
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
    });

    this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
    this.scene.add(this.particles);
  }

  private animate() {
    requestAnimationFrame(() => this.animate());

    // Rotate the particle system for a dynamic effect
    if (this.particles) {
      this.particles.rotation.y += 0.001;
      this.particles.rotation.x += 0.0005;
    }

    this.renderer.render(this.scene, this.camera);
  }
}
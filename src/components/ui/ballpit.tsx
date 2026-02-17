"use client"

import { useRef, useEffect } from "react";
import {
  Clock,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  SRGBColorSpace,
  MathUtils,
  Vector2,
  Vector3,
  MeshPhysicalMaterial,
  ShaderChunk,
  Color,
  Object3D,
  InstancedMesh,
  PMREMGenerator,
  SphereGeometry,
  AmbientLight,
  PointLight,
  ACESFilmicToneMapping,
  Raycaster,
  Plane,
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";


// Custom shader for depth-based coloring
const patchShader = (material: MeshPhysicalMaterial) => {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = { value: 0 };
    shader.uniforms.uColor1 = { value: new Color("#6DD5FA") };
    shader.uniforms.uColor2 = { value: new Color("#2980B9") };

    shader.vertexShader = `
      varying vec3 vWorldPosition;
      ${shader.vertexShader}
    `.replace(
      `#include <project_vertex>`,
      `#include <project_vertex>
      vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;`
    );

    shader.fragmentShader = `
      uniform float uTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      varying vec3 vWorldPosition;
      ${shader.fragmentShader}
    `.replace(
      `vec4 diffuseColor = vec4( diffuse, opacity );`,
      `
      float depth = smoothstep(-1.0, 1.0, vWorldPosition.z * 0.2);
      vec3 mixedColor = mix(uColor1, uColor2, depth + 0.1);
      vec4 diffuseColor = vec4(mixedColor, opacity);
      `
    );
  };
};

function createBallpit(canvas: HTMLCanvasElement, { followCursor = true, count = 200, gravity = 0.7, friction = 0.8, wallBounce = 0.95 }) {
  // --- Basic Setup ---
  let width = canvas.clientWidth;
  let height = canvas.clientHeight;
  let isDisposed = false;

  const scene = new Scene();
  const camera = new PerspectiveCamera(50, width / height, 0.1, 100);
  camera.position.set(0, 0, 10);

  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;

  // --- Environment & Lighting ---
  const environment = new RoomEnvironment();
  const pmremGenerator = new PMREMGenerator(renderer);
  scene.environment = pmremGenerator.fromScene(environment).texture;
  environment.dispose();

  scene.add(new AmbientLight(0xffffff, 0.5));
  const pointLight = new PointLight(0xffffff, 5);
  pointLight.position.set(2, 5, 5);
  scene.add(pointLight);

  // --- Spheres ---
  const sphereRadius = 0.3;
  const sphereGeometry = new SphereGeometry(sphereRadius, 32, 32);
  const sphereMaterial = new MeshPhysicalMaterial({
    roughness: 0.1,
    metalness: 0.9,
  });
  patchShader(sphereMaterial);

  const spheres = new InstancedMesh(sphereGeometry, sphereMaterial, count);
  scene.add(spheres);

  // --- Physics Simulation ---
  const spheresData = Array.from({ length: count }, () => ({
    position: new Vector3(
      MathUtils.randFloatSpread(width / 100),
      MathUtils.randFloatSpread(height / 100),
      MathUtils.randFloatSpread(2)
    ),
    velocity: new Vector3(),
    radius: sphereRadius,
  }));

  const dummy = new Object3D();
  const clock = new Clock();

  // --- Cursor Interaction ---
  const mouse = new Vector2(-100, -100);
  const mouseVelocity = new Vector2();
  let lastMousePos = new Vector2();

  const raycaster = new Raycaster();
  const plane = new Plane(new Vector3(0, 0, 1), 0);

  function updateMousePosition(e: MouseEvent | TouchEvent) {
    const event = 'touches' in e ? e.touches[0] : e;
    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / width) * 2 - 1;
    const y = -((event.clientY - rect.top) / height) * 2 + 1;

    raycaster.setFromCamera({ x, y }, camera);
    const intersectPoint = new Vector3();
    if (raycaster.ray.intersectPlane(plane, intersectPoint)) {
        mouse.set(intersectPoint.x, intersectPoint.y);
    }
  }

  if (followCursor) {
    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("touchmove", updateMousePosition);
  }

  // --- Animation Loop ---
  function tick() {
    if (isDisposed) return;

    const delta = Math.min(clock.getDelta(), 0.1);
    
    // Update mouse velocity
    mouseVelocity.copy(mouse).sub(lastMousePos).divideScalar(delta);
    lastMousePos.copy(mouse);

    const aspect = width / height;
    const bounds = {
      x: (10 * aspect) / 2 - sphereRadius,
      y: 10 / 2 - sphereRadius,
      z: 5 - sphereRadius
    };
    
    // Update spheres
    for (let i = 0; i < count; i++) {
      const data = spheresData[i];

      // Gravity
      data.velocity.y -= gravity * delta;
      
      // Friction
      data.velocity.multiplyScalar(1 - friction * delta);

      // Mouse interaction
      if (followCursor) {
        const mouseForce = new Vector3(mouse.x, mouse.y, 0).sub(data.position);
        const dist = mouseForce.length();
        if (dist < 2) {
            const force = (1 - dist / 2) * 0.5;
            mouseForce.normalize().multiplyScalar(-force);
            data.velocity.add(mouseForce);

            // Add velocity from mouse movement
             data.velocity.x += mouseVelocity.x * 0.02;
             data.velocity.y += mouseVelocity.y * 0.02;
        }
      }

      data.position.add(data.velocity.clone().multiplyScalar(delta));

      // Wall collisions
      if (Math.abs(data.position.x) > bounds.x) {
        data.position.x = Math.sign(data.position.x) * bounds.x;
        data.velocity.x *= -wallBounce;
      }
      if (Math.abs(data.position.y) > bounds.y) {
        data.position.y = Math.sign(data.position.y) * bounds.y;
        data.velocity.y *= -wallBounce;
      }
       if (Math.abs(data.position.z) > bounds.z) {
        data.position.z = Math.sign(data.position.z) * bounds.z;
        data.velocity.z *= -wallBounce;
      }
    }
    
    // Sphere-sphere collisions
    for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
            const sphere1 = spheresData[i];
            const sphere2 = spheresData[j];
            const dist = sphere1.position.distanceTo(sphere2.position);
            const totalRadius = sphere1.radius + sphere2.radius;

            if (dist < totalRadius) {
                const normal = sphere1.position.clone().sub(sphere2.position).normalize();
                const overlap = totalRadius - dist;
                
                sphere1.position.add(normal.clone().multiplyScalar(overlap / 2));
                sphere2.position.add(normal.clone().multiplyScalar(-overlap / 2));

                const v1 = sphere1.velocity;
                const v2 = sphere2.velocity;

                const x1 = sphere1.position;
                const x2 = sphere2.position;

                const v1_new = v1.clone().sub(x1.clone().sub(x2).multiplyScalar(v1.clone().sub(v2).dot(x1.clone().sub(x2)) / (x1.clone().sub(x2).lengthSq())));
                const v2_new = v2.clone().sub(x2.clone().sub(x1).multiplyScalar(v2.clone().sub(v1).dot(x2.clone().sub(x1)) / (x2.clone().sub(x1).lengthSq())));

                sphere1.velocity.copy(v1_new);
                sphere2.velocity.copy(v2_new);
            }
        }
    }

    // Update instance matrix
    spheresData.forEach((data, i) => {
      dummy.position.copy(data.position);
      dummy.updateMatrix();
      spheres.setMatrixAt(i, dummy.matrix);
    });
    spheres.instanceMatrix.needsUpdate = true;

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  tick();

  // --- Resize ---
  function handleResize() {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
  window.addEventListener("resize", handleResize);

  // --- Cleanup ---
  function dispose() {
    isDisposed = true;
    window.removeEventListener("resize", handleResize);
     if (followCursor) {
        window.removeEventListener("mousemove", updateMousePosition);
        window.removeEventListener("touchmove", updateMousePosition);
    }
    renderer.dispose();
    sphereGeometry.dispose();
    sphereMaterial.dispose();
    pmremGenerator.dispose();
    scene.remove(spheres);
  }

  return { dispose };
}


const Ballpit = ({ className = "", followCursor = true, ...props }) => {
  const canvasRef = useRef(null);
  const effectInstanceRef = useRef<any>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    effectInstanceRef.current = createBallpit(canvas, {
      followCursor,
      ...props,
    });

    return () => {
      if (effectInstanceRef.current) {
        effectInstanceRef.current.dispose();
      }
    };
  }, [followCursor, props.count, props.gravity]); // Rerun if these key props change

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        pointerEvents: followCursor ? "auto" : "none", // Only capture events if interactive
      }}
    />
  );
};

export default Ballpit;

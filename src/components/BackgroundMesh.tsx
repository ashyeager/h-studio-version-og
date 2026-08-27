import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

const DigitalTopologyMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uResolution: new THREE.Vector2(1, 1),
  },
  // Vertex Shader
  `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;

    varying vec2 vUv;
    varying vec3 vPosition;
    varying float vElevation;

    // Simplex Noise 3D
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

    float snoise(vec3 v){ 
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 = v - i + dot(i, C.xxx) ;

      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );

      vec3 x1 = x0 - i1 + 1.0 * C.xxx;
      vec3 x2 = x0 - i2 + 2.0 * C.xxx;
      vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

      i = mod(i, 289.0 ); 
      vec4 p = permute( permute( permute( 
                i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
              + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

      float n_ = 1.0/7.0; 
      vec3  ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z *ns.z); 

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );  

      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );

      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);

      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                    dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
      vUv = uv;
      vec3 pos = position;

      float t = uTime * 0.05; // Extremely slow, continuous motion
      
      // Flowing data: terrain shifts across the Y axis
      vec2 flowPos = vec2(pos.x, pos.y - uTime * 0.5);
      
      // Digital topology generation: Smooth geometric grid with hills and valleys
      float wave1 = sin(flowPos.x * 0.08) * cos(flowPos.y * 0.08) * 1.0;
      
      float noise1 = snoise(vec3(flowPos.x * 0.04, flowPos.y * 0.04, t * 0.2)) * 1.5;
      
      // OPTIMIZATION: Replaced expensive secondary 3D noise with a cheaper interference wave to maintain 60FPS
      float noise2 = sin(flowPos.x * 0.15 + t) * cos(flowPos.y * 0.15 - t * 0.8) * 0.4;
      
      float elevation = wave1 + noise1 + noise2;
      
      // Mouse interaction: subtle ripple
      float dist = distance(pos.xy, uMouse * 0.5);
      
      float mouseInfluence = smoothstep(20.0, 0.0, dist);
      float mouseRipple = sin(dist * 1.0 - uTime * 2.0) * 0.1 * mouseInfluence;
      
      elevation += mouseRipple + (mouseInfluence * 0.2);

      pos.z += elevation;
      
      vElevation = pos.z;
      vPosition = pos;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying float vElevation;

    void main() {
      // Premium Digital Palette
      vec3 baseGrid = vec3(0.06, 0.06, 0.06); // Dark Graphite
      vec3 highlightWhite = vec3(0.65, 0.65, 0.70); // Soft White / Silver
      vec3 cyanEnergy = vec3(0.0, 0.7, 0.9); // Subtle Electric Cyan
      vec3 emeraldEnergy = vec3(0.0, 0.5, 0.3); // Deep Emerald Hints

      // Radial fade to blend into edges and horizon
      float distFromCenter = length(vPosition.xy);
      
      // Fade heavily in the distance (y goes up to 40 in local coords)
      float horizonFade = smoothstep(30.0, -5.0, vPosition.y); 
      // Also fade the sides and front heavily
      float edgeFade = smoothstep(25.0, 4.0, distFromCenter);
      
      // Sphere separation and contact shadow
      vec2 sphereProj = vec2(0.0, 0.0); // Center of projection beneath the sphere
      float distToSphere = length(vPosition.xy - sphereProj);
      
      // Deep contact shadow directly beneath
      float contactShadow = smoothstep(1.0, 8.0, distToSphere);
      // Broader ambient occlusion shadow
      float ambientShadow = smoothstep(4.0, 18.0, length(vPosition.xy - vec2(0.0, 3.0)));
      
      float fade = horizonFade * edgeFade * (0.2 + 0.8 * contactShadow * ambientShadow);

      // Base wireframe color
      vec3 color = baseGrid;
      
      // Elevation-based highlights
      float peakHighlight = smoothstep(0.0, 2.0, vElevation);
      color = mix(color, highlightWhite, peakHighlight * 0.4);

      // Wave Energy flowing through the mesh
      float energyWave = (sin(vPosition.y * 0.15 - uTime * 0.6) + 1.0) * 0.5;
      float cyanGlow = smoothstep(0.6, 1.0, energyWave) * peakHighlight;
      float emeraldGlow = smoothstep(0.8, 1.0, (cos(vPosition.x * 0.1 + uTime * 0.4) + 1.0) * 0.5) * peakHighlight;
      
      color += cyanEnergy * cyanGlow * 0.3;
      color += emeraldEnergy * emeraldGlow * 0.15;

      // Scanning data streams (Soft white with energy hints)
      float streamY = smoothstep(0.99, 1.0, sin(vPosition.y * 0.1 - uTime * 0.4));
      float streamX = smoothstep(0.99, 1.0, sin(vPosition.x * 0.1 + uTime * 0.3));
      
      color += mix(highlightWhite, cyanEnergy, 0.5) * streamY * 0.15;
      color += mix(highlightWhite, emeraldEnergy, 0.5) * streamX * 0.1;

      // Subtle data pulse 
      float pulse = (sin(vPosition.x * 0.03 + vPosition.y * 0.03 - uTime * 0.2) + 1.0) * 0.5;
      pulse = pow(pulse, 4.0);
      color += highlightWhite * pulse * 0.08;
      
      // Premium floor reflection & underglow beneath the sphere
      float coreReflection = smoothstep(6.0, 0.0, distToSphere);
      float haloReflection = smoothstep(14.0, 2.0, distToSphere);
      
      color += highlightWhite * coreReflection * 0.35;
      color += cyanEnergy * haloReflection * 0.15;

      // Dynamic transparency
      float alphaBase = 0.08;
      float alphaHighlights = peakHighlight * 0.1 + cyanGlow * 0.08 + emeraldGlow * 0.05 + streamY * 0.08 + streamX * 0.08 + pulse * 0.03 + coreReflection * 0.2 + haloReflection * 0.1;
      
      float alpha = (alphaBase + alphaHighlights) * fade;
      alpha = clamp(alpha, 0.0, 0.35); // Increased max opacity slightly for light bursts

      gl_FragColor = vec4(color, alpha);
    }
  `
);

function MeshSimulation() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport, mouse } = useThree();

  const mouseWorld = useRef(new THREE.Vector2(0, 0));

  const material = useMemo(() => {
    const mat = new DigitalTopologyMaterial();
    mat.wireframe = true;
    mat.transparent = true;
    mat.depthWrite = false;
    mat.blending = THREE.AdditiveBlending;
    return mat;
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      
      // Smoothly track mouse in world coordinates
      const targetX = (mouse.x * viewport.width) / 2;
      const targetY = (mouse.y * viewport.height) / 2;
      
      mouseWorld.current.x += (targetX - mouseWorld.current.x) * 0.02; // Very slow mouse tracking
      mouseWorld.current.y += (targetY - mouseWorld.current.y) * 0.02;

      materialRef.current.uniforms.uMouse.value.copy(mouseWorld.current);
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI * 0.48, 0, 0]} position={[0, -5, -8]}>
      {/* High-density geometry for fine wireframe lines. Optimized for mobile 60FPS. */}
      <planeGeometry args={[60, 60, 100, 100]} />
      <primitive object={material} ref={materialRef} />
    </mesh>
  );
}

export default function BackgroundMesh() {
  return (
    <div className="fixed inset-0 pointer-events-auto z-0">
      <Canvas camera={{ position: [0, 1, 8], fov: 45 }}>
        <MeshSimulation />
      </Canvas>
    </div>
  );
}

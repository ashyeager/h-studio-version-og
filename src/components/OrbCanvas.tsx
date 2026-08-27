import React, { useEffect, useRef } from "react";

export default function OrbCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isHovering: false, isDragging: false });
  const orbitRef = useRef({ radiusMult: 1, particleDensityMult: 1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = 500;
    let height = canvas.height = 500;

    // Handle high-DPI displays
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      // Prevent setting width/height to 0 during transitions
      if (rect.width === 0 || rect.height === 0) return;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);
    
    // Robust resize handling during layout shifts
    const observer = new ResizeObserver(() => {
      resize();
    });
    observer.observe(canvas);

    // 3D Point definition for wireframe sphere
    interface Point3D {
      x: number;
      y: number;
      z: number;
      ox: number; // Original x
      oy: number; // Original y
      oz: number; // Original z
    }

    const points: Point3D[] = [];
    const numPoints = 100;
    const radius = 150;

    // Distribute points evenly on a sphere using Fibonacci lattice
    for (let i = 0; i < numPoints; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / numPoints);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      points.push({ x, y, z, ox: x, oy: y, oz: z });
    }

    // Active signals traveling along paths
    interface DataPacket {
      p1Idx: number;
      p2Idx: number;
      progress: number;
      speed: number;
    }
    const packets: DataPacket[] = [];
    let maxPackets = 16;

    // Cosmic dust particles
    interface DustParticle {
      x: number;
      y: number;
      z: number;
      speed: number;
      angle: number;
      size: number;
      originZ: number;
    }
    const dustParticles: DustParticle[] = [];
    for (let i = 0; i < 60; i++) {
      dustParticles.push({
        x: (Math.random() - 0.5) * radius * 4,
        y: (Math.random() - 0.5) * radius * 4,
        z: (Math.random() - 0.5) * radius * 4,
        speed: 0.001 + Math.random() * 0.003,
        angle: Math.random() * Math.PI * 2,
        size: Math.random() * 1.5 + 0.5,
        originZ: (Math.random() - 0.5) * radius * 4,
      });
    }

    // Interactive Drag and Touch tracking variables
    let velocityX = 0;
    let velocityY = 0;
    let lastX = 0;
    let lastY = 0;

    const onStart = (clientX: number, clientY: number) => {
      mouseRef.current.isDragging = true;
      lastX = clientX;
      lastY = clientY;
    };

    const onMove = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const currentMouseX = clientX - rect.left;
      const currentMouseY = clientY - rect.top;

      mouseRef.current.targetX = (currentMouseX / rect.width) - 0.5;
      mouseRef.current.targetY = (currentMouseY / rect.height) - 0.5;

      // Check hover state (if mouse is within inner radius)
      const distFromCenter = Math.hypot(mouseRef.current.targetX, mouseRef.current.targetY);
      mouseRef.current.isHovering = distFromCenter < 0.35;

      if (mouseRef.current.isDragging) {
        const deltaX = clientX - lastX;
        const deltaY = clientY - lastY;

        // Directly apply drag force to rotational velocities
        velocityY += deltaX * 0.005;
        velocityX += deltaY * 0.005;

        lastX = clientX;
        lastY = clientY;
      }
    };

    const onEnd = () => {
      mouseRef.current.isDragging = false;
    };

    // Event listeners
    const handleMouseDown = (e: MouseEvent) => { onStart(e.clientX, e.clientY); };
    const handleMouseMove = (e: MouseEvent) => { onMove(e.clientX, e.clientY); };
    const handleMouseUp = () => { onEnd(); };
    const handleMouseLeave = () => {
      onEnd();
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
      mouseRef.current.isHovering = false;
    };
    const handleTouchStart = (e: TouchEvent) => { if (e.touches.length > 0) onStart(e.touches[0].clientX, e.touches[0].clientY); };
    const handleTouchMove = (e: TouchEvent) => { if (e.touches.length > 0) onMove(e.touches[0].clientX, e.touches[0].clientY); };
    const handleTouchEnd = () => { onEnd(); };

    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    const rotateX = (point: Point3D, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const y = point.y * cos - point.z * sin;
      const z = point.y * sin + point.z * cos;
      point.y = y;
      point.z = z;
    };

    const rotateY = (point: Point3D, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const x = point.x * cos + point.z * sin;
      const z = -point.x * sin + point.z * cos;
      point.x = x;
      point.z = z;
    };

    let pulseTime = 0;
    let orbitalAngle = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      pulseTime += 0.02;
      orbitalAngle += 0.005;

      // Friction / decay for velocities
      velocityX *= 0.92;
      velocityY *= 0.92;

      // Smooth mouse interpolation for ambient tracking (spring-dampened inertia)
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;
      
      // Dynamic hover states interpolation
      const targetRadiusMult = mouse.isHovering ? 1.4 : 1;
      const targetDensityMult = mouse.isHovering ? 2.5 : 1;
      orbitRef.current.radiusMult += (targetRadiusMult - orbitRef.current.radiusMult) * 0.1;
      orbitRef.current.particleDensityMult += (targetDensityMult - orbitRef.current.particleDensityMult) * 0.1;

      // Combine passive spin, interactive drag, and gentle hover displacement
      const baseSpinX = 0.0012;
      const baseSpinY = 0.0018;

      const currentAngleX = velocityX + baseSpinX + (!mouse.isDragging ? mouse.y * 0.015 : 0);
      const currentAngleY = velocityY + baseSpinY + (!mouse.isDragging ? mouse.x * 0.015 : 0);

      // Center point and focal length
      // Apply spring physics to the core based on mouse hover
      const coreOffsetX = (Number.isFinite(mouse.x) ? mouse.x : 0) * 40;
      const coreOffsetY = (Number.isFinite(mouse.y) ? mouse.y : 0) * 40;
      const cx = (width / 2) + coreOffsetX;
      const cy = (height / 2) + coreOffsetY;
      const fov = 380;

      // Draw soft shadow layer beneath 3D asset for grounding
      ctx.save();
      const shadowGrad = ctx.createRadialGradient(
        Number.isFinite(width) ? width/2 + coreOffsetX*0.5 : 0, 
        Number.isFinite(height) ? height/2 + 180 + coreOffsetY*0.5 : 0, 
        10, 
        Number.isFinite(width) ? width/2 + coreOffsetX*0.5 : 0, 
        Number.isFinite(height) ? height/2 + 180 + coreOffsetY*0.5 : 0, 
        120
      );
      shadowGrad.addColorStop(0, "rgba(0, 0, 0, 0.4)");
      shadowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.ellipse(width/2 + coreOffsetX*0.5, height/2 + 180 + coreOffsetY*0.5, 100, 30, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Rotate all 3D points
      points.forEach((p) => {
        rotateX(p, currentAngleX);
        rotateY(p, currentAngleY);
      });

      // 1. Draw glowing background ambient halo & core (Monochrome)
      const corePulse = Math.sin(pulseTime) * 10 + 65;
      const safeCx = Number.isFinite(cx) ? cx : 0;
      const safeCy = Number.isFinite(cy) ? cy : 0;
      const coreGrad = ctx.createRadialGradient(safeCx, safeCy, 2, safeCx, safeCy, corePulse * 1.5);
      coreGrad.addColorStop(0, "rgba(255, 255, 255, 0.1)");
      coreGrad.addColorStop(0.3, "rgba(100, 100, 100, 0.05)");
      coreGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(safeCx, safeCy, corePulse * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Find nearest neighbors for visual connections
      const maxConnections = 3;
      const connectedPairs: [number, number][] = [];

      for (let i = 0; i < points.length; i++) {
        const p1 = points[i];
        const neighbors = points
          .map((p2, idx) => ({
            idx,
            point: p2,
            dist: Math.hypot(p1.x - p2.x, p1.y - p2.y, p1.z - p2.z)
          }))
          .filter(n => n.dist > 1 && n.dist < 135)
          .sort((a, b) => a.dist - b.dist)
          .slice(0, maxConnections);

        neighbors.forEach(({ idx: p2Idx }) => {
          if (!connectedPairs.some(([a, b]) => (a === i && b === p2Idx) || (a === p2Idx && b === i))) {
            connectedPairs.push([i, p2Idx]);
          }
        });
      }

      // Dynamic particle emission density based on hover
      maxPackets = Math.floor(16 * orbitRef.current.particleDensityMult);

      // Spawn data packets traveling along the grid
      if (packets.length < maxPackets && connectedPairs.length > 0 && Math.random() < 0.2 * orbitRef.current.particleDensityMult) {
        const randomPair = connectedPairs[Math.floor(Math.random() * connectedPairs.length)];
        packets.push({
          p1Idx: randomPair[0],
          p2Idx: randomPair[1],
          progress: 0,
          speed: 0.01 + Math.random() * 0.02
        });
      }

      // Update and Draw packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const pack = packets[i];
        pack.progress += pack.speed;
        
        if (pack.progress >= 1) {
          packets.splice(i, 1);
          continue;
        }

        const p1 = points[pack.p1Idx];
        const p2 = points[pack.p2Idx];

        if (p1 && p2) {
          // Interpolate in 3D
          const px = p1.x + (p2.x - p1.x) * pack.progress;
          const py = p1.y + (p2.y - p1.y) * pack.progress;
          const pz = p1.z + (p2.z - p1.z) * pack.progress;

          const scale = fov / (fov + pz);
          const sx = cx + px * scale;
          const sy = cy + py * scale;

          // Depth opacity
          const alpha = Math.max(0.1, Math.min(1, (pz + radius) / (2 * radius)));

          ctx.beginPath();
          ctx.arc(sx, sy, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      }

      // Sort points by Z to draw back layers first
      const pointsWithIndices = points.map((p, index) => ({ p, index }));
      const sortedPoints = [...pointsWithIndices].sort((a, b) => b.p.z - a.p.z);

      // 2. Render connections (edges) - monochrome gradients
      ctx.lineWidth = 0.8;
      connectedPairs.forEach(([idx1, idx2]) => {
        const p1 = points[idx1];
        const p2 = points[idx2];
        
        const depth = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.01, Math.min(0.8, (depth + radius) / (2 * radius)));

        const scale1 = fov / (fov + p1.z);
        const scale2 = fov / (fov + p2.z);

        const x1 = cx + p1.x * scale1;
        const y1 = cy + p1.y * scale1;
        const x2 = cx + p2.x * scale2;
        const y2 = cy + p2.y * scale2;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);

        const grad = ctx.createLinearGradient(x1, y1, x2, y2);
        grad.addColorStop(0, `rgba(200, 200, 200, ${alpha * 0.2})`);
        grad.addColorStop(0.5, `rgba(255, 255, 255, ${alpha * 0.4})`);
        grad.addColorStop(1, `rgba(100, 100, 100, ${alpha * 0.05})`);
        
        ctx.strokeStyle = grad;
        ctx.stroke();
      });

      // 3. Render nodes with ambient occlusion and harsh specular highlights
      sortedPoints.forEach(({ p }) => {
        const scale = fov / (fov + p.z);
        
        let bx = cx + p.x * scale;
        let by = cy + p.y * scale;

        const depthAlpha = Math.max(0.1, Math.min(1, (p.z + radius) / (2 * radius)));
        const size = Math.max(0.8, ((p.z + radius) / (2 * radius)) * 3.5);

        ctx.beginPath();
        ctx.arc(bx, by, size, 0, Math.PI * 2);

        if (p.z > radius * 0.2) {
          // Specular highlight and ambient occlusion
          ctx.fillStyle = `rgba(255, 255, 255, ${depthAlpha})`;
          ctx.shadowBlur = 12;
          ctx.shadowColor = "rgba(255, 255, 255, 0.4)";
        } else {
          // Deep matte black / charcoal for background nodes
          ctx.fillStyle = `rgba(80, 80, 80, ${depthAlpha * 0.5})`;
          ctx.shadowBlur = 0;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 4. Render cosmic dust particles with velocity scaling
      dustParticles.forEach((dust) => {
        dust.angle += dust.speed * orbitRef.current.particleDensityMult;
        
        // Gentle rotation around the center
        const dx = Math.cos(dust.angle) * dust.x - Math.sin(dust.angle) * dust.y;
        const dy = Math.sin(dust.angle) * dust.x + Math.cos(dust.angle) * dust.y;
        
        const scale = fov / (fov + dust.z);
        if (scale < 0) return; // Behind camera
        
        const bx = cx + dx * scale;
        const by = cy + dy * scale;
        
        const alpha = Math.max(0.02, Math.min(0.5, (dust.z + radius * 3) / (radius * 6)));
        
        ctx.beginPath();
        ctx.arc(bx, by, dust.size * scale * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      });

      // 5. Render orbital tilted helper rings - expanding on hover
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(orbitalAngle);

      const ringRadius = radius * orbitRef.current.radiusMult;

      // Orbital shell 1
      ctx.beginPath();
      ctx.ellipse(0, 0, ringRadius * 1.18, ringRadius * 0.42, Math.PI / 6, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 0.8;
      ctx.setLineDash([4, 20]);
      ctx.stroke();

      // Orbital shell 2
      ctx.beginPath();
      ctx.ellipse(0, 0, ringRadius * 1.3, ringRadius * 0.32, -Math.PI / 4, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.setLineDash([]);
      ctx.stroke();

      // Ambient ring glow
      ctx.beginPath();
      ctx.ellipse(0, 0, ringRadius * 1.18, ringRadius * 0.42, Math.PI / 6, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.restore();

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseLeave);

      canvas.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-[440px] md:max-w-[500px] flex items-center justify-center select-none pointer-events-none">
      {/* Deep desaturated glow halo */}
      <div className="absolute inset-0 bg-radial-gradient from-brand-white/[0.03] via-transparent to-transparent rounded-full blur-3xl animate-pulse-glow" />
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain pointer-events-auto cursor-grab active:cursor-grabbing"
      />
    </div>
  );
}

import { useEffect, useRef } from "react";

export default function NetworkBackground({ paused = false }) {
  const canvasRef = useRef(null);
  const pausedRef = useRef(paused);
  const animationFrameRef = useRef(0);
  const resumeAnimationRef = useRef(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return undefined;

    const blue = "56,189,248";
    const navy = "125,165,255";
    const red = "255,92,98";
    const linkDistance = 165;
    const mouseDistance = 240;
    const frameInterval = 1000 / 60;
    const tau = Math.PI * 2;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let nodes = [];
    let packets = [];
    let shields = [];
    let ripples = [];
    let hexPattern;
    let mouse = { x: -999, y: -999 };
    let lastFrame = 0;
    let scanY = -80;
    let nextThreat = 0;
    let isVisible = !document.hidden;

    function createHexPattern() {
      const radius = 26;
      const tileWidth = Math.sqrt(3) * radius;
      const tileHeight = radius * 1.5;
      const tile = document.createElement("canvas");
      tile.width = Math.ceil(tileWidth * 2);
      tile.height = Math.ceil(tileHeight * 2);
      const tileContext = tile.getContext("2d");
      if (!tileContext) {
        hexPattern = null;
        return;
      }

      tileContext.strokeStyle = `rgba(${navy},.11)`;
      tileContext.lineWidth = 1;
      [[0, 0], [tileWidth / 2, tileHeight], [tileWidth, 0],
        [tileWidth * 1.5, tileHeight], [0, tileHeight * 2],
        [tileWidth, tileHeight * 2]].forEach(([x, y]) => {
        tileContext.beginPath();
        for (let index = 0; index < 6; index += 1) {
          const angle = (Math.PI / 3) * index + Math.PI / 6;
          tileContext.lineTo(
            x + Math.cos(angle) * radius,
            y + Math.sin(angle) * radius,
          );
        }
        tileContext.closePath();
        tileContext.stroke();
      });

      hexPattern = {
        pattern: context.createPattern(tile, "repeat"),
        width: tileWidth * 2,
        height: tileHeight * 2,
      };
    }

    function drawShield(x, y, size) {
      context.beginPath();
      context.moveTo(x, y - size);
      context.lineTo(x + size * 0.8, y - size * 0.6);
      context.lineTo(x + size * 0.8, y + size * 0.1);
      context.quadraticCurveTo(x + size * 0.8, y + size * 0.8, x, y + size * 1.1);
      context.quadraticCurveTo(x - size * 0.8, y + size * 0.8, x - size * 0.8, y + size * 0.1);
      context.lineTo(x - size * 0.8, y - size * 0.6);
      context.closePath();
    }

    function resize() {
      const bounds = canvas.parentElement?.getBoundingClientRect();
      if (!bounds) return;

      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const nodeCount = Math.max(32, Math.min(80, Math.round((width * height) / 18000)));
      nodes = Array.from({ length: nodeCount }, () => {
        const hub = Math.random() < 0.13;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: hub ? 5 : 2.6,
          hub,
          pulse: 0,
          glow: 0,
          threat: 0,
        };
      });

      const shieldCount = Math.max(4, Math.min(9, Math.round(width / 220)));
      shields = Array.from({ length: shieldCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vy: -(0.12 + Math.random() * 0.2),
        size: 14 + Math.random() * 16,
        phase: Math.random() * tau,
      }));
      createHexPattern();
    }

    function findNeighbor(node) {
      let nearest = null;
      let nearestDistance = linkDistance * linkDistance;
      nodes.forEach((candidate) => {
        if (candidate === node) return;
        const dx = node.x - candidate.x;
        const dy = node.y - candidate.y;
        const distance = dx * dx + dy * dy;
        if (distance < nearestDistance && distance > 400 && Math.random() < 0.5) {
          nearestDistance = distance;
          nearest = candidate;
        }
      });
      return nearest;
    }

    function sendPacket(node = nodes[Math.random() * nodes.length | 0]) {
      const destination = node && findNeighbor(node);
      if (destination) {
        packets.push({
          start: node,
          end: destination,
          progress: 0,
          speed: 0.011 + Math.random() * 0.012,
        });
      }
    }

    function draw(timestamp) {
      if (timestamp - lastFrame < frameInterval - 1) {
        if (!pausedRef.current) {
          animationFrameRef.current = window.requestAnimationFrame(draw);
        }
        return;
      }
      const delta = Math.min((timestamp - lastFrame) / 16.7 || 1, 3);
      lastFrame = timestamp;
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";

      if (hexPattern?.pattern) {
        const offsetX = (timestamp / 90) % hexPattern.width;
        const offsetY = (timestamp / 140) % hexPattern.height;
        context.fillStyle = hexPattern.pattern;
        context.save();
        context.translate(offsetX, offsetY);
        context.fillRect(
          -hexPattern.width,
          -hexPattern.height,
          width + hexPattern.width * 2,
          height + hexPattern.height * 2,
        );
        context.restore();
      }

      if (mouse.x >= 0 && mouse.y >= 0 && mouse.x <= width && mouse.y <= height) {
        const glow = context.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 230);
        glow.addColorStop(0, `rgba(${blue},.24)`);
        glow.addColorStop(1, `rgba(${blue},0)`);
        context.fillStyle = glow;
        context.fillRect(mouse.x - 230, mouse.y - 230, 460, 460);
        context.beginPath();
        context.arc(mouse.x, mouse.y, 4, 0, tau);
        context.fillStyle = "#BAE6FD";
        context.globalAlpha = 0.35;
        context.beginPath();
        context.arc(mouse.x, mouse.y, 10, 0, tau);
        context.fill();
        context.globalAlpha = 1;
        context.beginPath();
        context.arc(mouse.x, mouse.y, 4, 0, tau);
        context.fill();
      }

      scanY += 2 * delta;
      if (scanY > height + 120) scanY = -120;
      const scan = context.createLinearGradient(0, scanY - 140, 0, scanY);
      scan.addColorStop(0, `rgba(${blue},0)`);
      scan.addColorStop(1, `rgba(${blue},.24)`);
      context.fillStyle = scan;
      context.fillRect(0, scanY - 140, width, 140);
      context.fillStyle = `rgba(${blue},.18)`;
      context.fillRect(0, scanY - 1.5, width, 4.5);
      context.fillStyle = `rgba(${blue},.78)`;
      context.fillRect(0, scanY, width, 1.5);

      shields.forEach((shield) => {
        shield.y += shield.vy * delta;
        if (shield.y < -40) {
          shield.y = height + 40;
          shield.x = Math.random() * width;
        }
        const x = shield.x + Math.sin(timestamp / 1800 + shield.phase) * 14;
        context.strokeStyle = `rgba(${navy},.30)`;
        context.lineWidth = 1.4;
        drawShield(x, shield.y, shield.size);
        context.stroke();
        context.beginPath();
        context.moveTo(x - shield.size * 0.35, shield.y + shield.size * 0.05);
        context.lineTo(x - shield.size * 0.05, shield.y + shield.size * 0.35);
        context.lineTo(x + shield.size * 0.4, shield.y - shield.size * 0.25);
        context.strokeStyle = `rgba(${blue},.50)`;
        context.stroke();
      });

      nodes.forEach((node) => {
        if (!motionPreference.matches) {
          node.x += node.vx * delta;
          node.y += node.vy * delta;
          if (node.x < -20) node.x = width + 20;
          if (node.x > width + 20) node.x = -20;
          if (node.y < -20) node.y = height + 20;
          if (node.y > height + 20) node.y = -20;
        }
        const cursorDx = mouse.x - node.x;
        const cursorDy = mouse.y - node.y;
        const cursorDistance = Math.hypot(cursorDx, cursorDy);
        if (cursorDistance < mouseDistance) {
          const pull = (1 - cursorDistance / mouseDistance) * 0.035 * delta;
          node.x += cursorDx * pull;
          node.y += cursorDy * pull;
        }
        if (node.pulse > 0) node.pulse -= 0.013 * delta;
        if (node.threat > 0) node.threat -= 0.0035 * delta;
        node.glow = Math.max(0, node.glow - 0.02 * delta);
        if (Math.abs(node.y - scanY) < 26) node.glow = 1;
      });

      nodes.forEach((node, index) => {
        for (let next = index + 1; next < nodes.length; next += 1) {
          const neighbor = nodes[next];
          const dx = node.x - neighbor.x;
          const dy = node.y - neighbor.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < linkDistance) {
            const alpha = 0.45 * (1 - distance / linkDistance) + (node.glow + neighbor.glow) * 0.12;
            context.strokeStyle = `rgba(${blue},${alpha})`;
            context.lineWidth = 1.2;
            context.beginPath();
            context.moveTo(node.x, node.y);
            context.lineTo(neighbor.x, neighbor.y);
            context.stroke();
          }
        }

      });

      if (mouse.x >= 0 && mouse.y >= 0 && mouse.x <= width && mouse.y <= height) {
        const cursorLinks = nodes
          .map((node) => ({
            node,
            distance: Math.hypot(node.x - mouse.x, node.y - mouse.y),
          }))
          .filter(({ distance }) => distance < mouseDistance + 100)
          .sort((first, second) => first.distance - second.distance)
          .slice(0, 12);

        cursorLinks.forEach(({ node, distance }, index) => {
          const strength = Math.max(0, 1 - distance / (mouseDistance + 100));
          const line = context.createLinearGradient(node.x, node.y, mouse.x, mouse.y);
          line.addColorStop(0, `rgba(${blue},${0.3 + strength * 0.45})`);
          line.addColorStop(1, `rgba(${blue},${0.55 + strength * 0.4})`);
          context.strokeStyle = line;
          context.lineWidth = 2 + strength * 1.5;
          context.beginPath();
          context.moveTo(node.x, node.y);
          context.lineTo(mouse.x, mouse.y);
          context.stroke();

          const progress = (timestamp / 850 + index * 0.19) % 1;
          const sparkX = node.x + (mouse.x - node.x) * progress;
          const sparkY = node.y + (mouse.y - node.y) * progress;
          context.beginPath();
          context.arc(sparkX, sparkY, 2 + strength, 0, tau);
          context.fillStyle = "#E0F7FF";
          context.globalAlpha = 0.32;
          context.beginPath();
          context.arc(sparkX, sparkY, 6 + strength * 2, 0, tau);
          context.fill();
          context.globalAlpha = 1;
          context.beginPath();
          context.arc(sparkX, sparkY, 2 + strength, 0, tau);
          context.fill();
          node.glow = Math.max(node.glow, strength * 0.9);
        });

        let animatedLinks = 0;
        for (let first = 0; first < cursorLinks.length && animatedLinks < 16; first += 1) {
          for (let second = first + 1; second < cursorLinks.length && animatedLinks < 16; second += 1) {
            const start = cursorLinks[first];
            const end = cursorLinks[second];
            const dx = end.node.x - start.node.x;
            const dy = end.node.y - start.node.y;
            const distance = Math.hypot(dx, dy);
            if (distance >= linkDistance) continue;

            const strength = 1 - distance / linkDistance;
            context.strokeStyle = `rgba(${blue},${0.48 + strength * 0.4})`;
            context.lineWidth = 1.4 + strength;
            context.beginPath();
            context.moveTo(start.node.x, start.node.y);
            context.lineTo(end.node.x, end.node.y);
            context.stroke();

            const progress = (timestamp / 650 + animatedLinks * 0.13) % 1;
            context.beginPath();
            context.arc(
              start.node.x + dx * progress,
              start.node.y + dy * progress,
              2 + strength,
              0,
              tau,
            );
            context.fillStyle = "#E0F7FF";
            context.globalAlpha = 0.32;
            context.beginPath();
            context.arc(
              start.node.x + dx * progress,
              start.node.y + dy * progress,
              6 + strength * 2,
              0,
              tau,
            );
            context.fill();
            context.globalAlpha = 1;
            context.beginPath();
            context.arc(
              start.node.x + dx * progress,
              start.node.y + dy * progress,
              2 + strength,
              0,
              tau,
            );
            context.fill();
            start.node.glow = Math.max(start.node.glow, strength * 0.9);
            end.node.glow = Math.max(end.node.glow, strength * 0.9);
            animatedLinks += 1;
          }
        }
      }

      for (let index = packets.length - 1; index >= 0; index -= 1) {
        const packet = packets[index];
        packet.progress += packet.speed * delta;
        if (packet.progress >= 1) {
          packet.end.pulse = 1;
          if (Math.random() < 0.35 && packets.length < 30) sendPacket(packet.end);
          packets.splice(index, 1);
          continue;
        }

        const x = packet.start.x + (packet.end.x - packet.start.x) * packet.progress;
        const y = packet.start.y + (packet.end.y - packet.start.y) * packet.progress;
        const trailProgress = Math.max(0, packet.progress - 0.22);
        const trailX = packet.start.x + (packet.end.x - packet.start.x) * trailProgress;
        const trailY = packet.start.y + (packet.end.y - packet.start.y) * trailProgress;
        const trail = context.createLinearGradient(trailX, trailY, x, y);
        trail.addColorStop(0, `rgba(${blue},0)`);
        trail.addColorStop(1, `rgba(${blue},.95)`);
        context.strokeStyle = trail;
        context.lineWidth = 2.6;
        context.beginPath();
        context.moveTo(trailX, trailY);
        context.lineTo(x, y);
        context.stroke();
        context.fillStyle = `rgba(${blue},.25)`;
        context.beginPath();
        context.arc(x, y, 8, 0, tau);
        context.fill();
        context.fillStyle = "#BAE6FD";
        context.beginPath();
        context.arc(x, y, 3, 0, tau);
        context.fill();
      }

      context.setLineDash([]);
      nodes.forEach((node) => {
        const isThreat = node.threat > 0;
        const color = isThreat ? red : blue;
        if (node.glow > 0 || node.hub || isThreat) {
          const glowRadius = node.radius * (isThreat ? 7 : 4.5);
          const glow = context.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowRadius);
          glow.addColorStop(0, `rgba(${color},${(node.hub ? 0.34 : 0.16) + node.glow * 0.35 + (isThreat ? 0.3 : 0)})`);
          glow.addColorStop(1, `rgba(${color},0)`);
          context.fillStyle = glow;
          context.beginPath();
          context.arc(node.x, node.y, glowRadius, 0, tau);
          context.fill();
        }
        if (node.pulse > 0) {
          context.strokeStyle = `rgba(${blue},${0.65 * node.pulse})`;
          context.lineWidth = 1.8;
          context.beginPath();
          context.arc(node.x, node.y, node.radius + 20 * (1 - node.pulse), 0, tau);
          context.stroke();
        }
        if (node.hub) {
          context.save();
          context.setLineDash([3, 5]);
          context.lineDashOffset = -timestamp / 40;
          context.strokeStyle = `rgba(${navy},.5)`;
          context.lineWidth = 1.2;
          context.beginPath();
          context.arc(node.x, node.y, node.radius * 3, 0, tau);
          context.stroke();
          context.restore();
          context.fillStyle = isThreat ? `rgb(${red})` : `rgba(${navy},.85)`;
          context.beginPath();
          for (let side = 0; side < 6; side += 1) {
            const angle = (Math.PI / 3) * side + Math.PI / 6;
            context.lineTo(
              node.x + Math.cos(angle) * node.radius * 1.5,
              node.y + Math.sin(angle) * node.radius * 1.5,
            );
          }
          context.closePath();
          context.fill();
          context.fillStyle = "#0A1430";
          context.beginPath();
          context.arc(node.x, node.y, 1.6, 0, tau);
          context.fill();
        } else {
          context.fillStyle = `rgba(${color},.9)`;
          context.beginPath();
          context.arc(node.x, node.y, node.radius, 0, tau);
          context.fill();
        }
        if (isThreat) {
          context.strokeStyle = `rgba(${red},${Math.min(1, node.threat * 1.6)})`;
          context.lineWidth = 1.8;
          drawShield(node.x, node.y - 26, 9);
          context.stroke();
          context.beginPath();
          context.arc(node.x, node.y, 12 + (1 - node.threat) * 26, 0, tau);
          context.strokeStyle = `rgba(${red},${node.threat * 0.7})`;
          context.stroke();
        }
      });

      for (let index = ripples.length - 1; index >= 0; index -= 1) {
        const ripple = ripples[index];
        ripple.radius += 3.2 * delta;
        ripple.alpha -= 0.014 * delta;
        if (ripple.alpha <= 0) {
          ripples.splice(index, 1);
          continue;
        }
        context.strokeStyle = `rgba(${blue},${ripple.alpha})`;
        context.lineWidth = 2;
        context.beginPath();
        context.arc(ripple.x, ripple.y, ripple.radius, 0, tau);
        context.stroke();
      }

      if (!motionPreference.matches && !pausedRef.current) {
        if (Math.random() < 0.09 && packets.length < 24) sendPacket();
        if (timestamp > nextThreat) {
          nextThreat = timestamp + 3500 + Math.random() * 3500;
          const target = nodes[Math.random() * nodes.length | 0];
          if (target) target.threat = 1;
        }
        animationFrameRef.current = window.requestAnimationFrame(draw);
      }
    }

    function resumeAnimation() {
      if (isVisible && !pausedRef.current && !motionPreference.matches) {
        animationFrameRef.current = window.requestAnimationFrame(draw);
      }
    }

    function updatePointer(event) {
      const bounds = canvas.getBoundingClientRect();
      mouse = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    }

    function clearPointer() {
      mouse = { x: -999, y: -999 };
    }

    function addRipple(event) {
      const bounds = canvas.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      ripples.push({ x, y, radius: 6, alpha: 0.8 });
      nodes
        .slice()
        .sort((first, second) => (
          ((first.x - x) ** 2 + (first.y - y) ** 2)
          - ((second.x - x) ** 2 + (second.y - y) ** 2)
        ))
        .slice(0, 5)
        .forEach((node) => sendPacket(node));
    }

    function handleVisibilityChange() {
      isVisible = !document.hidden;
      if (!isVisible) {
        window.cancelAnimationFrame(animationFrameRef.current);
        return;
      }
      lastFrame = performance.now();
      if (pausedRef.current) return;
      if (motionPreference.matches) draw(lastFrame);
      else resumeAnimation();
    }

    function handleMotionPreferenceChange() {
      window.cancelAnimationFrame(animationFrameRef.current);
      lastFrame = performance.now();
      if (isVisible && !pausedRef.current) {
        if (motionPreference.matches) draw(lastFrame);
        else resumeAnimation();
      }
    }

    resumeAnimationRef.current = resumeAnimation;
    resize();
    const resizeObserver = new ResizeObserver(resize);
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", updatePointer);
    window.addEventListener("pointerleave", clearPointer);
    window.addEventListener("pointerdown", addRipple);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    motionPreference.addEventListener("change", handleMotionPreferenceChange);
    if (motionPreference.matches) draw(performance.now());
    else resumeAnimation();

    return () => {
      window.cancelAnimationFrame(animationFrameRef.current);
      resumeAnimationRef.current = () => {};
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerleave", clearPointer);
      window.removeEventListener("pointerdown", addRipple);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      motionPreference.removeEventListener("change", handleMotionPreferenceChange);
    };
  }, []);

  useEffect(() => {
    pausedRef.current = paused;
    if (paused) {
      window.cancelAnimationFrame(animationFrameRef.current);
      return;
    }
    resumeAnimationRef.current();
  }, [paused]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        style={{
          background: "radial-gradient(ellipse at 50% 38%, #10224A 0%, #0A1430 45%, #050914 100%)",
        }}
      />
    </div>
  );
}

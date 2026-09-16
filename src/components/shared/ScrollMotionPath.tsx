"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollMotionPath() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const guidePathRef = useRef<SVGPathElement>(null);
  const orbRef = useRef<SVGCircleElement>(null);
  const glowOrbRef = useRef<SVGCircleElement>(null);
  const wideGlowRef = useRef<SVGCircleElement>(null);
  const innerOrbRef = useRef<SVGCircleElement>(null);

  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 1440,
    height: 5200,
  });
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const [pathData, setPathData] = useState<string>("");

  // Recalculate dimensions & smooth curve through cards and elements on mount and resize
  useEffect(() => {
    const calculateLayout = () => {
      const docHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        4500
      );
      const winWidth = window.innerWidth;
      const centerX = winWidth / 2;

      // Amplitude for weaving: wide around text headers, through card centers
      const sideWeave = Math.min(Math.max(winWidth * 0.22, 180), 320);
      const cardWeave = Math.min(Math.max(winWidth * 0.06, 40), 90);

      // Section vertical estimations scaled proportionally to docHeight
      const totalH = docHeight;
      const scale = totalH / 5000;

      const pts = [
        { x: centerX, y: 120 * scale },                              // Hero top start
        { x: centerX - cardWeave * 0.6, y: 490 * scale },             // Hero Quote Card (behind card)
        { x: centerX + cardWeave * 1.2, y: 720 * scale },             // StatsBar Card cluster (behind cards)
        { x: centerX + sideWeave, y: 1020 * scale },                 // Curves to the side around 360 Heading
        { x: centerX - cardWeave * 0.8, y: 1480 * scale },            // 360 Showcase & Flank Cards (behind cards)
        { x: centerX - sideWeave, y: 2020 * scale },                 // Curves to the side around Leadership Heading
        { x: centerX + cardWeave * 0.9, y: 2480 * scale },            // Leadership Frosted Cards (behind cards)
        { x: centerX + sideWeave, y: 2880 * scale },                 // Curves to the side around News Heading
        { x: centerX - cardWeave * 0.7, y: 3260 * scale },            // News Carousel Cards (behind cards)
        { x: centerX - sideWeave * 0.9, y: 3680 * scale },            // Curves to the side around Events Heading
        { x: centerX + cardWeave * 0.8, y: 4050 * scale },            // Events Cards (behind cards)
        { x: centerX - cardWeave * 0.4, y: 4500 * scale },            // Call To Action Banner (behind banner)
        { x: centerX, y: docHeight - 120 },                          // Footer bottom
      ];

      // Build smooth cubic Bezier SVG path data through the points
      let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = i > 0 ? pts[i - 1] : pts[i];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = i < pts.length - 2 ? pts[i + 2] : p2;

        const cp1x = p1.x + (p2.x - p0.x) / 4;
        const cp1y = p1.y + (p2.y - p0.y) / 4;
        const cp2x = p2.x - (p3.x - p1.x) / 4;
        const cp2y = p2.y - (p3.y - p1.y) / 4;

        d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
      }

      setDimensions({ width: winWidth, height: docHeight });
      setPoints(pts);
      setPathData(d);
    };

    calculateLayout();

    // Debounced resize listener
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(calculateLayout, 200);
    };

    window.addEventListener("resize", handleResize);
    // Refresh when images or dynamic content load
    const timer = setTimeout(calculateLayout, 800);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
      clearTimeout(timer);
    };
  }, []);

  // GSAP ScrollTrigger animation
  useEffect(() => {
    const path = pathRef.current;
    const orb = orbRef.current;
    const glowOrb = glowOrbRef.current;
    const innerOrb = innerOrbRef.current;

    if (!path || !orb || !glowOrb || !innerOrb || !pathData) return;

    let pathLength = 0;
    try {
      pathLength = path.getTotalLength();
    } catch {
      return;
    }

    if (pathLength === 0) return;

    // Initial position at the first point
    const startPoint = path.getPointAtLength(0);
    const updateOrbPosition = (x: number, y: number) => {
      orb.setAttribute("cx", x.toFixed(1));
      orb.setAttribute("cy", y.toFixed(1));
      glowOrb.setAttribute("cx", x.toFixed(1));
      glowOrb.setAttribute("cy", y.toFixed(1));
      if (wideGlowRef.current) {
        wideGlowRef.current.setAttribute("cx", x.toFixed(1));
        wideGlowRef.current.setAttribute("cy", y.toFixed(1));
      }
      innerOrb.setAttribute("cx", x.toFixed(1));
      innerOrb.setAttribute("cy", y.toFixed(1));
    };

    updateOrbPosition(startPoint.x, startPoint.y);

    // Prepare stroke dash for path reveal
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    const tracker = { progress: 0 };

    const ctx = gsap.context(() => {
      gsap.to(tracker, {
        progress: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.4, // Delivers the delightful chasing inertia
          onUpdate: (self) => {
            const currentLen = self.progress * pathLength;
            const pt = path.getPointAtLength(currentLen);
            updateOrbPosition(pt.x, pt.y);

            // Dynamically reveal the path as the orb travels
            gsap.set(path, {
              strokeDashoffset: Math.max(0, pathLength - currentLen),
            });
          },
        },
      });
    });

    return () => ctx.revert();
  }, [pathData, dimensions]);

  if (!pathData) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
      style={{ height: dimensions.height, width: "100%" }}
    >
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        className="w-full h-full absolute inset-0 overflow-visible opacity-95"
      >
        <defs>
          {/* Luminous Neon Gradient (Lime Yellow -> Electric Cyan -> Indigo) */}
          <linearGradient id="motionPathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#CCFF00" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#06B6D4" stopOpacity="1" />
            <stop offset="50%" stopColor="#818CF8" stopOpacity="0.95" />
            <stop offset="75%" stopColor="#06B6D4" stopOpacity="1" />
            <stop offset="100%" stopColor="#CCFF00" stopOpacity="0.95" />
          </linearGradient>

          {/* Intense SVG Glow filter */}
          <filter id="neonPathGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur1" />
            <feGaussianBlur stdDeviation="14" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="orbPulseGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="20" result="wideBlur" />
            <feGaussianBlur stdDeviation="8" result="sharpBlur" />
            <feMerge>
              <feMergeNode in="wideBlur" />
              <feMergeNode in="sharpBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Subtle Dashed Background Path for visual anticipation */}
        <path
          ref={guidePathRef}
          d={pathData}
          fill="none"
          stroke="rgba(6, 182, 212, 0.2)"
          strokeWidth="1.5"
          strokeDasharray="6 10"
        />

        {/* Active Illuminated Glowing Path drawn by user scroll */}
        <path
          ref={pathRef}
          d={pathData}
          fill="none"
          stroke="url(#motionPathGradient)"
          strokeWidth="4"
          filter="url(#neonPathGlow)"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* Checkpoint nodes plotted along the center trajectory */}
        {points.map((pt, idx) => (
          <g key={idx} className="transition-opacity duration-300">
            {/* Outer halo ring */}
            <circle
              cx={pt.x}
              cy={pt.y}
              r="10"
              fill="rgba(6, 182, 212, 0.12)"
              stroke="#06B6D4"
              strokeWidth="1.5"
              strokeDasharray="2 2"
              opacity="0.7"
            />
            {/* Node disc */}
            <circle
              cx={pt.x}
              cy={pt.y}
              r="4.5"
              fill="#0A0F1E"
              stroke="#CCFF00"
              strokeWidth="2"
            />
            {/* Core light */}
            <circle
              cx={pt.x}
              cy={pt.y}
              r="2"
              fill="#FFFFFF"
            />
          </g>
        ))}

        {/* Chasing Glowing MotionPath Orb System (layers strictly below all content) */}
        {/* 1. Wide Ambient Cyan Aura for backlight diffusion through frosted glass cards */}
        <circle
          ref={wideGlowRef}
          r="48"
          cx={points[0]?.x || 720}
          cy={points[0]?.y || 180}
          fill="#06B6D4"
          opacity="0.35"
          filter="url(#orbPulseGlow)"
        />

        {/* 2. Concentrated Lime Aura that shines clearly through frosted glass */}
        <circle
          ref={glowOrbRef}
          r="34"
          cx={points[0]?.x || 720}
          cy={points[0]?.y || 180}
          fill="#CCFF00"
          opacity="0.55"
          filter="url(#orbPulseGlow)"
        />

        {/* 3. Main High-contrast Core Orb */}
        <circle
          ref={orbRef}
          r="10"
          cx={points[0]?.x || 720}
          cy={points[0]?.y || 180}
          fill="#CCFF00"
          stroke="#06B6D4"
          strokeWidth="2.5"
          filter="url(#neonPathGlow)"
        />

        {/* 4. Center White Sparkle */}
        <circle
          ref={innerOrbRef}
          r="4"
          cx={points[0]?.x || 720}
          cy={points[0]?.y || 180}
          fill="#FFFFFF"
        />
      </svg>
    </div>
  );
}

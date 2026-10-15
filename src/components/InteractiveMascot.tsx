import React, { useEffect, useRef, useState, useCallback } from 'react';

export interface InteractiveMascotProps {
  /** Width of the mascot container in pixels (default: 360) */
  width?: number;
  /**
   * 'svg-rig' renders a fully articulated 3D-shaded SVG replica of the mascot.
   * 'image-overlay' uses your static mascot image with calibrated interactive overlays.
   */
  mode?: 'svg-rig' | 'image-overlay';
  /** Path to your mascot image when using mode="image-overlay" (e.g. "/images.jpg") */
  imageSrc?: string;
  /** Maximum eye pupil travel in pixels (default: 8) */
  maxEyeOffset?: number;
  /** Maximum body tilt in degrees (default: 10) */
  maxBodyTilt?: number;
  /** Optional callback fired when the mascot is clicked */
  onMascotClick?: () => void;
  /** Optional custom className */
  className?: string;
}

interface Vector2D {
  x: number;
  y: number;
}

interface AnimationState {
  // Normalized cursor position (-1 to 1) relative to mascot center
  normX: number;
  normY: number;
  // Distance from cursor to mascot center (0 = center, 1+ = far)
  distance: number;
  // Left & Right eye pupil offsets
  leftEye: Vector2D;
  rightEye: Vector2D;
  // Hand rotation angle in degrees
  handAngle: number;
  // Mouth openness (0 = closed smile, 1 = wide open)
  mouthOpen: number;
}

export const InteractiveMascot: React.FC<InteractiveMascotProps> = ({
  width = 360,
  mode = 'svg-rig',
  imageSrc = '/images.jpg',
  maxEyeOffset = 8,
  maxBodyTilt = 10,
  onMascotClick,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Target values updated on mousemove
  const targetRef = useRef<AnimationState>({
    normX: 0,
    normY: 0,
    distance: 1,
    leftEye: { x: 0, y: 0 },
    rightEye: { x: 0, y: 0 },
    handAngle: 0,
    mouthOpen: 0.35,
  });

  // Smoothed values updated via requestAnimationFrame lerp
  const currentRef = useRef<AnimationState>({
    normX: 0,
    normY: 0,
    distance: 1,
    leftEye: { x: 0, y: 0 },
    rightEye: { x: 0, y: 0 },
    handAngle: 0,
    mouthOpen: 0.35,
  });

  const [renderState, setRenderState] = useState<AnimationState>(currentRef.current);
  const [isBlinking, setIsBlinking] = useState<boolean>(false);
  const [isWinking, setIsWinking] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [wavePhase, setWavePhase] = useState<number>(0);

  // Calculate eye offset clamped within an elliptical socket
  const computeEyeOffset = useCallback(
    (
      cursorX: number,
      cursorY: number,
      eyeScreenX: number,
      eyeScreenY: number,
      maxOffset: number
    ): Vector2D => {
      const dx = cursorX - eyeScreenX;
      const dy = cursorY - eyeScreenY;
      const angle = Math.atan2(dy, dx);
      const dist = Math.min(Math.hypot(dx, dy) / 120, 1);
      return {
        x: Math.cos(angle) * maxOffset * dist,
        y: Math.sin(angle) * maxOffset * dist,
      };
    },
    []
  );

  // Global mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const centerX = rect.left + rect.width * 0.5;
      const centerY = rect.top + rect.height * 0.5;

      const rawX = (e.clientX - centerX) / (window.innerWidth * 0.5);
      const rawY = (e.clientY - centerY) / (window.innerHeight * 0.5);

      const normX = Math.max(-1, Math.min(1, rawX));
      const normY = Math.max(-1, Math.min(1, rawY));

      const pixelDist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
      const normalizedDist = Math.min(pixelDist / 450, 1.5);

      // Eye screen positions calibrated to mascot proportions (320x565)
      const leftEyeX = rect.left + rect.width * 0.403;
      const leftEyeY = rect.top + rect.height * 0.396;
      const rightEyeX = rect.left + rect.width * 0.626;
      const rightEyeY = rect.top + rect.height * 0.367;

      const leftEye = computeEyeOffset(
        e.clientX,
        e.clientY,
        leftEyeX,
        leftEyeY,
        maxEyeOffset
      );
      const rightEye = computeEyeOffset(
        e.clientX,
        e.clientY,
        rightEyeX,
        rightEyeY,
        maxEyeOffset
      );

      // Shoulder pivot for the raised right-side (mascot's left) hand
      const shoulderX = rect.left + rect.width * 0.72;
      const shoulderY = rect.top + rect.height * 0.52;
      const handAngleRad = Math.atan2(e.clientY - shoulderY, e.clientX - shoulderX);
      const rawHandDeg = (handAngleRad * 180) / Math.PI;
      const clampedHandAngle = Math.max(-28, Math.min(28, rawHandDeg * 0.35));

      // Mouth opens wider as the cursor gets closer to the mascot
      const proximityMouth = Math.max(0.2, Math.min(1, 1.15 - normalizedDist * 0.75));

      targetRef.current = {
        normX,
        normY,
        distance: normalizedDist,
        leftEye,
        rightEye,
        handAngle: clampedHandAngle,
        mouthOpen: proximityMouth,
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [computeEyeOffset, maxEyeOffset]);

  // Smooth physics & idle breathing loop
  useEffect(() => {
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const lerpFactor = 0.12;

      const cur = currentRef.current;
      const tgt = targetRef.current;

      cur.normX += (tgt.normX - cur.normX) * lerpFactor;
      cur.normY += (tgt.normY - cur.normY) * lerpFactor;
      cur.distance += (tgt.distance - cur.distance) * lerpFactor;

      cur.leftEye.x += (tgt.leftEye.x - cur.leftEye.x) * 0.2;
      cur.leftEye.y += (tgt.leftEye.y - cur.leftEye.y) * 0.2;
      cur.rightEye.x += (tgt.rightEye.x - cur.rightEye.x) * 0.2;
      cur.rightEye.y += (tgt.rightEye.y - cur.rightEye.y) * 0.2;

      cur.handAngle += (tgt.handAngle - cur.handAngle) * 0.14;
      cur.mouthOpen += (tgt.mouthOpen - cur.mouthOpen) * 0.15;

      setRenderState({
        normX: cur.normX,
        normY: cur.normY,
        distance: cur.distance,
        leftEye: { ...cur.leftEye },
        rightEye: { ...cur.rightEye },
        handAngle: cur.handAngle,
        mouthOpen: cur.mouthOpen,
      });
      setWavePhase(elapsed);

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Natural periodic blinking
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const scheduleBlink = () => {
      const nextBlinkMs = 2400 + Math.random() * 2800;
      timeoutId = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
        scheduleBlink();
      }, nextBlinkMs);
    };
    scheduleBlink();
    return () => clearTimeout(timeoutId);
  }, []);

  // Click interaction: wink + wave + cheerful mouth bounce
  const handleClick = () => {
    setIsWinking(true);
    setIsClicked(true);
    onMascotClick?.();
    setTimeout(() => setIsWinking(false), 450);
    setTimeout(() => setIsClicked(false), 700);
  };

  const height = Math.round(width * (565 / 320));

  // Derived transforms for body, head, hand, tail, and mouth
  const bodyRotateY = renderState.normX * maxBodyTilt;
  const bodyRotateX = -renderState.normY * (maxBodyTilt * 0.7);
  const bodyTranslateX = renderState.normX * 8;
  const bodyTranslateY =
    renderState.normY * 5 + Math.sin(wavePhase * 2.5) * 3; // includes idle breathing

  const headTranslateX = renderState.normX * 10;
  const headTranslateY = renderState.normY * 7;
  const headRotate = renderState.normX * 5;

  // Hand wave oscillation when hovered or clicked, plus cursor tracking angle
  const activeWave =
    isHovered || isClicked
      ? Math.sin(wavePhase * 12) * 14
      : Math.sin(wavePhase * 2.5) * 2.5;
  const totalHandRotation = renderState.handAngle + activeWave;

  // Tail wag speed increases when hovered or clicked
  const tailWag =
    Math.sin(wavePhase * (isHovered || isClicked ? 10 : 3.2)) *
    (isHovered || isClicked ? 14 : 6);

  // Mouth opening height (reacts to cursor distance + click talking effect)
  const clickTalkBoost = isClicked ? Math.abs(Math.sin(wavePhase * 18)) * 0.45 : 0;
  const effectiveMouthOpen = Math.min(1.2, renderState.mouthOpen + clickTalkBoost);

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative select-none cursor-pointer inline-flex items-center justify-center ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        perspective: '900px',
      }}
      title="Move your cursor around or click me!"
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transform: `translate3d(${bodyTranslateX}px, ${bodyTranslateY}px, 0) rotateX(${bodyRotateX}deg) rotateY(${bodyRotateY}deg)`,
          transition: isClicked ? 'transform 0.15s ease-out' : undefined,
        }}
      >
        {mode === 'svg-rig' ? (
          <svg
            viewBox="0 0 320 565"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            style={{ overflow: 'visible' }}
          >
            <defs>
              {/* 3D Blue Fur Gradients */}
              <radialGradient id="furHeadGrad" cx="45%" cy="35%" r="60%">
                <stop offset="0%" stopColor="#3B9EFF" />
                <stop offset="55%" stopColor="#1268D4" />
                <stop offset="100%" stopColor="#0A4496" />
              </radialGradient>

              <radialGradient id="furBodyGrad" cx="48%" cy="40%" r="65%">
                <stop offset="0%" stopColor="#3492FA" />
                <stop offset="65%" stopColor="#1060C8" />
                <stop offset="100%" stopColor="#093D89" />
              </radialGradient>

              {/* Soft 3D Cream-White Muzzle/Belly/Paws Gradient */}
              <radialGradient id="whiteSoftGrad" cx="45%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="70%" stopColor="#F4F3EE" />
                <stop offset="100%" stopColor="#DAD6CE" />
              </radialGradient>

              {/* Dark Cobalt Bandana Gradient */}
              <linearGradient id="bandanaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1952B8" />
                <stop offset="100%" stopColor="#08286B" />
              </linearGradient>

              {/* Glossy Nose Gradient */}
              <radialGradient id="noseGrad" cx="35%" cy="30%" r="65%">
                <stop offset="0%" stopColor="#3F628E" />
                <stop offset="40%" stopColor="#132946" />
                <stop offset="100%" stopColor="#071222" />
              </radialGradient>

              {/* Soft Ground Shadow */}
              <radialGradient id="groundShadow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(10, 35, 75, 0.28)" />
                <stop offset="100%" stopColor="rgba(10, 35, 75, 0)" />
              </radialGradient>
            </defs>

            {/* Ground Shadow */}
            <ellipse
              cx={160 + renderState.normX * 6}
              cy="482"
              rx="105"
              ry="18"
              fill="url(#groundShadow)"
            />

            {/* ==================== WAGGING TAIL ==================== */}
            <g
              style={{
                transformOrigin: '115px 410px',
                transform: `rotate(${tailWag}deg)`,
              }}
            >
              <path
                d="M 115 415 C 55 445, 22 405, 30 355 C 35 328, 56 328, 66 355 C 76 382, 95 385, 115 390 Z"
                fill="url(#furBodyGrad)"
              />
              {/* White tail tip */}
              <path
                d="M 30 355 C 34 328, 56 328, 64 353 C 54 360, 48 352, 41 372 C 33 367, 29 362, 30 355 Z"
                fill="url(#whiteSoftGrad)"
              />
            </g>

            {/* ==================== TORSO & LEGS ==================== */}
            <g
              style={{
                transformOrigin: '165px 420px',
                transform: `rotate(${renderState.normX * 2.5}deg)`,
              }}
            >
              {/* Left & Right Legs + Body Base */}
              <path
                d="M 112 290
                   C 95 335, 92 415, 86 452
                   L 138 458
                   C 145 425, 152 408, 165 408
                   C 176 408, 173 425, 174 452
                   L 228 450
                   C 230 410, 240 345, 218 288 Z"
                fill="url(#furBodyGrad)"
              />

              {/* White Belly Patch */}
              <ellipse
                cx={176 + renderState.normX * 3}
                cy="352"
                rx="46"
                ry="58"
                transform="rotate(-5 176 352)"
                fill="url(#whiteSoftGrad)"
              />

              {/* Viewer's Left Foot (Paw) */}
              <path
                d="M 76 462 C 74 438, 102 432, 126 444 C 142 452, 142 468, 134 474 C 116 480, 78 478, 76 462 Z"
                fill="url(#whiteSoftGrad)"
              />

              {/* Viewer's Right Foot (Paw) */}
              <path
                d="M 172 456 C 172 444, 198 442, 216 428 C 236 426, 250 444, 246 462 C 232 470, 174 468, 172 456 Z"
                fill="url(#whiteSoftGrad)"
              />

              {/* Viewer's Left Arm (Resting on Hip) */}
              <g
                style={{
                  transformOrigin: '112px 305px',
                  transform: `rotate(${-renderState.normX * 4}deg)`,
                }}
              >
                <path
                  d="M 115 294 C 72 312, 54 342, 82 374 L 112 352 C 98 338, 102 325, 122 316 Z"
                  fill="url(#furBodyGrad)"
                />
                {/* Hip Hand (White Glove) */}
                <ellipse
                  cx="98"
                  cy="368"
                  rx="20"
                  ry="18"
                  transform="rotate(-24 98 368)"
                  fill="url(#whiteSoftGrad)"
                />
              </g>

              {/* ==================== INTERACTIVE HAND (THUMBS-UP / WAVE) ==================== */}
              <g
                style={{
                  transformOrigin: '215px 302px',
                  transform: `rotate(${totalHandRotation}deg)`,
                }}
              >
                {/* Blue Arm */}
                <path
                  d="M 212 288 C 236 292, 256 290, 274 274 L 286 306 C 262 328, 232 332, 212 322 Z"
                  fill="url(#furBodyGrad)"
                />
                {/* Articulated White Hand + Thumbs-Up */}
                <g
                  style={{
                    transformOrigin: '275px 282px',
                    transform: `rotate(${renderState.normY * -8}deg)`,
                  }}
                >
                  {/* Thumb */}
                  <rect
                    x="258"
                    y="225"
                    width="22"
                    height="38"
                    rx="11"
                    transform="rotate(-6 269 244)"
                    fill="url(#whiteSoftGrad)"
                    stroke="#D5D0C8"
                    strokeWidth="1"
                  />
                  {/* Palm / Curled Fingers */}
                  <rect
                    x="252"
                    y="250"
                    width="48"
                    height="56"
                    rx="22"
                    fill="url(#whiteSoftGrad)"
                    stroke="#D5D0C8"
                    strokeWidth="1"
                  />
                  {/* Finger Definition Lines */}
                  <path
                    d="M 264 268 Q 282 264 295 270 M 264 282 Q 282 278 296 284 M 266 295 Q 282 292 293 296"
                    stroke="#CEC9C0"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </g>
              </g>

              {/* Blue Neck Bandana */}
              <path
                d="M 108 288 Q 168 304 232 276 L 214 292 L 186 340 L 108 288 Z"
                fill="url(#bandanaGrad)"
              />
            </g>

            {/* ==================== INTERACTIVE HEAD, EYES & MOUTH ==================== */}
            <g
              style={{
                transformOrigin: '165px 235px',
                transform: `translate(${headTranslateX}px, ${headTranslateY}px) rotate(${headRotate}deg)`,
              }}
            >
              {/* Viewer's Left Ear */}
              <g
                style={{
                  transformOrigin: '92px 165px',
                  transform: `rotate(${-renderState.normX * 4}deg)`,
                }}
              >
                <path
                  d="M 65 202 C 42 150, 44 95, 76 110 C 102 122, 118 148, 118 168 Z"
                  fill="url(#furHeadGrad)"
                />
                <path
                  d="M 72 186 C 58 150, 60 116, 80 124 C 96 132, 106 150, 106 165 Z"
                  fill="url(#whiteSoftGrad)"
                />
              </g>

              {/* Viewer's Right Ear */}
              <g
                style={{
                  transformOrigin: '205px 145px',
                  transform: `rotate(${renderState.normX * 4}deg)`,
                }}
              >
                <path
                  d="M 170 135 C 186 85, 212 72, 232 108 C 244 132, 242 162, 234 176 Z"
                  fill="url(#furHeadGrad)"
                />
                <path
                  d="M 184 136 C 194 102, 210 94, 224 118 C 232 135, 230 155, 224 166 Z"
                  fill="url(#whiteSoftGrad)"
                />
              </g>

              {/* Main Blue Head */}
              <path
                d="M 54 248
                   C 62 212, 68 165, 112 140
                   C 155 118, 205 128, 242 168
                   C 262 190, 272 202, 264 228
                   C 254 268, 208 296, 156 296
                   C 104 296, 60 278, 54 248 Z"
                fill="url(#furHeadGrad)"
              />

              {/* White Cheeks & Muzzle Mask */}
              <path
                d="M 75 252
                   C 74 232, 98 228, 104 214
                   C 106 184, 144 184, 150 220
                   C 164 214, 178 214, 186 210
                   C 184 172, 222 166, 228 202
                   C 248 198, 262 212, 258 232
                   C 250 268, 205 296, 156 296
                   C 108 296, 76 276, 75 252 Z"
                fill="url(#whiteSoftGrad)"
              />

              {/* Expressive Floating Eyebrows */}
              <path
                d="M 104 176 Q 116 166 126 172"
                stroke="#F5F3EE"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
                style={{
                  transform: `translateY(${-(1 - Math.min(1, renderState.distance)) * 5}px)`,
                }}
              />
              <path
                d="M 190 156 Q 202 150 210 158"
                stroke="#F5F3EE"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
                style={{
                  transform: `translateY(${-(1 - Math.min(1, renderState.distance)) * 5}px)`,
                }}
              />

              {/* ==================== LEFT EYE (Viewer's Left) ==================== */}
              <g>
                {/* Eye White */}
                <ellipse
                  cx="128"
                  cy="222"
                  rx="19"
                  ry="24"
                  fill="#FFFFFF"
                  stroke="#D8D4CC"
                  strokeWidth="1.5"
                />
                {isBlinking || isWinking ? (
                  /* Happy Wink / Blink Curve */
                  <path
                    d="M 111 224 Q 128 208 145 224"
                    stroke="#0B2246"
                    strokeWidth="5"
                    strokeLinecap="round"
                    fill="none"
                  />
                ) : (
                  /* Tracking Iris + Pupil + Specular Highlight */
                  <g
                    style={{
                      transform: `translate(${renderState.leftEye.x}px, ${renderState.leftEye.y}px)`,
                    }}
                  >
                    <ellipse cx="129" cy="224" rx="12" ry="16" fill="#0B3B78" />
                    <ellipse cx="129" cy="224" rx="8.5" ry="12" fill="#06172E" />
                    <circle cx="124" cy="217" r="4.2" fill="#FFFFFF" />
                    <circle cx="133" cy="229" r="1.8" fill="#FFFFFF" opacity="0.85" />
                  </g>
                )}
              </g>

              {/* ==================== RIGHT EYE (Viewer's Right) ==================== */}
              <g>
                {/* Eye White */}
                <ellipse
                  cx="202"
                  cy="208"
                  rx="19"
                  ry="25"
                  fill="#FFFFFF"
                  stroke="#D8D4CC"
                  strokeWidth="1.5"
                />
                {isBlinking ? (
                  <path
                    d="M 185 210 Q 202 194 218 210"
                    stroke="#0B2246"
                    strokeWidth="5"
                    strokeLinecap="round"
                    fill="none"
                  />
                ) : (
                  <g
                    style={{
                      transform: `translate(${renderState.rightEye.x}px, ${renderState.rightEye.y}px)`,
                    }}
                  >
                    <ellipse cx="200" cy="210" rx="12.5" ry="17.5" fill="#0B3B78" />
                    <ellipse cx="200" cy="210" rx="9" ry="13" fill="#06172E" />
                    <circle cx="195" cy="202" r="4.5" fill="#FFFFFF" />
                    <circle cx="205" cy="216" r="2" fill="#FFFFFF" opacity="0.85" />
                  </g>
                )}
              </g>

              {/* ==================== INTERACTIVE MOUTH & TONGUE ==================== */}
              <g>
                {/* Mouth Cavity scales smoothly with cursor proximity & click state */}
                <path
                  d={`M 142 256
                      Q 176 ${262 + effectiveMouthOpen * 6} 202 250
                      Q 194 ${268 + effectiveMouthOpen * 26} 175 ${270 + effectiveMouthOpen * 24}
                      Q 154 ${270 + effectiveMouthOpen * 24} 142 256 Z`}
                  fill="#4E151D"
                />
                {/* Animated Pink Tongue */}
                <ellipse
                  cx={174 + renderState.normX * 2.5}
                  cy={266 + effectiveMouthOpen * 12}
                  rx={14 * Math.min(1, effectiveMouthOpen + 0.3)}
                  ry={9 * effectiveMouthOpen}
                  fill="#E45C65"
                />
                {/* Smile Lip Corner Creases */}
                <path
                  d="M 138 253 Q 142 258 146 257 M 199 247 Q 203 251 206 248"
                  stroke="#3B1117"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>

              {/* ==================== 3D GLOSSY NOSE ==================== */}
              <g
                style={{
                  transform: `translate(${renderState.normX * 3}px, ${renderState.normY * 2}px)`,
                }}
              >
                <ellipse
                  cx="175"
                  cy="235"
                  rx="17"
                  ry="12"
                  transform="rotate(-8 175 235)"
                  fill="url(#noseGrad)"
                />
                {/* Nose Specular Highlight */}
                <ellipse
                  cx="171"
                  cy="230"
                  rx="6"
                  ry="2.5"
                  transform="rotate(-12 171 230)"
                  fill="#8AB8E6"
                  opacity="0.55"
                />
              </g>
            </g>
          </svg>
        ) : (
          /* ==================== IMAGE OVERLAY MODE ==================== */
          <div className="relative w-full h-full">
            <img
              src={imageSrc}
              alt="Interactive Mascot"
              className="w-full h-full object-contain pointer-events-none select-none"
            />
            <svg
              viewBox="0 0 320 565"
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              {/* Calibrated Left Eye Socket Overlay (40.3%, 39.6%) */}
              <ellipse cx="129" cy="224" rx="16" ry="20" fill="#FFFFFF" />
              {isBlinking || isWinking ? (
                <path
                  d="M 113 224 Q 129 210 144 224"
                  stroke="#0B2246"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  fill="none"
                />
              ) : (
                <g
                  style={{
                    transform: `translate(${renderState.leftEye.x}px, ${renderState.leftEye.y}px)`,
                  }}
                >
                  <ellipse cx="129" cy="224" rx="11.5" ry="15.5" fill="#0B3B78" />
                  <ellipse cx="129" cy="224" rx="8" ry="11.5" fill="#06172E" />
                  <circle cx="124" cy="217" r="4" fill="#FFFFFF" />
                </g>
              )}

              {/* Calibrated Right Eye Socket Overlay (62.6%, 36.7%) */}
              <ellipse cx="200" cy="208" rx="16" ry="22" fill="#FFFFFF" />
              {isBlinking ? (
                <path
                  d="M 185 208 Q 200 194 215 208"
                  stroke="#0B2246"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  fill="none"
                />
              ) : (
                <g
                  style={{
                    transform: `translate(${renderState.rightEye.x}px, ${renderState.rightEye.y}px)`,
                  }}
                >
                  <ellipse cx="200" cy="210" rx="12" ry="17" fill="#0B3B78" />
                  <ellipse cx="200" cy="210" rx="8.5" ry="12.5" fill="#06172E" />
                  <circle cx="195" cy="202" r="4.2" fill="#FFFFFF" />
                </g>
              )}
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveMascot;
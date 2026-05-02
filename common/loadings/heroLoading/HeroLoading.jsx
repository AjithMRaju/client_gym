// import { useEffect, useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const PHASES = [
//   { label: "Calibrating systems", end: 18, dur: 600 },
//   { label: "Loading assets", end: 37, dur: 900 },
//   { label: "Syncing performance data", end: 55, dur: 700 },
//   { label: "Optimizing render pipeline", end: 72, dur: 800 },
//   { label: "Warming up engines", end: 88, dur: 600 },
//   { label: "Ready to perform", end: 100, dur: 500 },
// ];

// function easeInOutQuart(t) {
//   return t < 0.5 ? 8 * t ** 4 : 1 - Math.pow(-2 * t + 2, 4) / 2;
// }

// function lerp(a, b, t) {
//   return a + (b - a) * t;
// }

// export const HeroLoading = ({ onComplete }) => {
//   const [progress, setProgress] = useState(0);
//   const [phaseLabel, setPhaseLabel] = useState("Initializing");
//   const [logoIn, setLogoIn] = useState(false);
//   const [pulseIn, setPulseIn] = useState(false);
//   const [tagIn, setTagIn] = useState(false);
//   const [done, setDone] = useState(false);
//   const [exit, setExit] = useState(false);
//   const noiseRef = useRef(null);
//   const noiseInterval = useRef(null);
//   const rafRef = useRef(null);

//   /* ── Noise canvas ── */
//   useEffect(() => {
//     const canvas = noiseRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");

//     function resize() {
//       canvas.width = canvas.offsetWidth;
//       canvas.height = canvas.offsetHeight;
//     }
//     resize();

//     function drawNoise() {
//       const w = canvas.width,
//         h = canvas.height;
//       const img = ctx.createImageData(w, h);
//       for (let i = 0; i < img.data.length; i += 4) {
//         const v = (Math.random() * 255) | 0;
//         img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
//         img.data[i + 3] = 255;
//       }
//       ctx.putImageData(img, 0, 0);
//     }

//     noiseInterval.current = setInterval(drawNoise, 80);
//     return () => clearInterval(noiseInterval.current);
//   }, []);

//   /* ── Radar sweep canvas ── */
//   const radarRef = useRef(null);
//   const radarAngleRef = useRef(-Math.PI / 2);
//   const radarRafRef = useRef(null);

//   useEffect(() => {
//     const canvas = radarRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");

//     function resize() {
//       canvas.width = canvas.offsetWidth;
//       canvas.height = canvas.offsetHeight;
//     }
//     resize();

//     function draw() {
//       const w = canvas.width,
//         h = canvas.height;
//       const cx = w / 2,
//         cy = h / 2;
//       const R = Math.max(w, h) * 0.72;
//       const sweepSpan = Math.PI * 0.55;
//       const angle = radarAngleRef.current;

//       ctx.clearRect(0, 0, w, h);
//       ctx.save();
//       ctx.translate(cx, cy);

//       const steps = 48;
//       for (let i = 0; i < steps; i++) {
//         const frac = i / steps;
//         const a = angle - frac * sweepSpan;
//         const nextA = angle - ((i + 1) / steps) * sweepSpan;
//         ctx.beginPath();
//         ctx.moveTo(0, 0);
//         ctx.arc(0, 0, R, a, nextA, false);
//         ctx.closePath();
//         ctx.fillStyle = `rgba(220,38,38,${(1 - frac) * 0.13})`;
//         ctx.fill();
//       }

//       ctx.beginPath();
//       ctx.moveTo(0, 0);
//       ctx.lineTo(Math.cos(angle) * R, Math.sin(angle) * R);
//       ctx.strokeStyle = "rgba(220,38,38,0.85)";
//       ctx.lineWidth = 1.5;
//       ctx.stroke();

//       ctx.restore();
//       radarAngleRef.current += 0.022;
//       radarRafRef.current = requestAnimationFrame(draw);
//     }

//     draw();
//     return () => cancelAnimationFrame(radarRafRef.current);
//   }, []);

//   /* ── Logo entrance ── */
//   useEffect(() => {
//     const t1 = setTimeout(() => setLogoIn(true), 200);
//     const t2 = setTimeout(() => setPulseIn(true), 350);
//     const t3 = setTimeout(() => setTagIn(true), 700);
//     return () => [t1, t2, t3].forEach(clearTimeout);
//   }, []);

//   /* ── Progress phases ── */
//   useEffect(() => {
//     let phaseIdx = 0;
//     let currentProgress = 0;

//     function runPhase(idx) {
//       if (idx >= PHASES.length) return;
//       const ph = PHASES[idx];
//       const start = currentProgress;
//       const startTime = performance.now();

//       setPhaseLabel(ph.label);

//       function tick(now) {
//         const elapsed = now - startTime;
//         const t = Math.min(elapsed / ph.dur, 1);
//         const et = easeInOutQuart(t);
//         currentProgress = lerp(start, ph.end, et);
//         setProgress(currentProgress);

//         if (t < 1) {
//           rafRef.current = requestAnimationFrame(tick);
//         } else {
//           phaseIdx++;
//           if (phaseIdx < PHASES.length) {
//             setTimeout(() => runPhase(phaseIdx), 120);
//           } else {
//             setTimeout(() => setDone(true), 300);
//           }
//         }
//       }

//       rafRef.current = requestAnimationFrame(tick);
//     }

//     const startTimer = setTimeout(() => runPhase(0), 900);
//     return () => {
//       clearTimeout(startTimer);
//       cancelAnimationFrame(rafRef.current);
//     };
//   }, []);

//   /* ── Trigger exit after done flash ── */
//   useEffect(() => {
//     if (!done) return;
//     const t = setTimeout(() => {
//       setExit(true);
//       setTimeout(() => onComplete?.(), 900);
//     }, 1200);
//     return () => clearTimeout(t);
//   }, [done]);

//   return (
//     <AnimatePresence>
//       {!exit && (
//         <motion.div
//           key="loader"
//           initial={{ opacity: 1 }}
//           exit={{
//             y: "-100%",
//             transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
//           }}
//           style={{
//             position: "fixed",
//             inset: 0,
//             zIndex: 100,
//             background: "#000",
//             overflow: "hidden",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontFamily: "sans-serif",
//           }}
//         >
//           {/* Noise texture */}
//           <canvas
//             ref={noiseRef}
//             style={{
//               position: "absolute",
//               inset: 0,
//               width: "100%",
//               height: "100%",
//               opacity: 0.04,
//               pointerEvents: "none",
//             }}
//           />

//           {/* Grid */}
//           <div
//             style={{
//               position: "absolute",
//               inset: 0,
//               backgroundImage:
//                 "linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)",
//               backgroundSize: "40px 40px",
//               pointerEvents: "none",
//             }}
//           />

//           {/* Radar sweep */}
//           <canvas
//             ref={radarRef}
//             style={{
//               position: "absolute",
//               inset: 0,
//               width: "100%",
//               height: "100%",
//               pointerEvents: "none",
//             }}
//           />

//           {/* Pulse rings */}
//           {[0, 1, 2].map((i) => (
//             <motion.div
//               key={i}
//               animate={{ scale: [0.6, 1.6], opacity: [0.6, 0] }}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//                 delay: i,
//                 ease: "easeOut",
//               }}
//               style={{
//                 position: "absolute",
//                 width: 380,
//                 height: 380,
//                 borderRadius: "50%",
//                 border: "1px solid rgba(220,38,38,.07)",
//                 pointerEvents: "none",
//               }}
//             />
//           ))}

//           {/* Corner brackets */}
//           {[
//             { top: 24, left: 24, points: "0,16 0,0 16,0" },
//             { top: 24, right: 24, points: "0,0 16,0 16,16" },
//             { bottom: 24, left: 24, points: "0,0 0,16 16,16" },
//             { bottom: 24, right: 24, points: "0,16 16,16 16,0" },
//           ].map((c, i) => (
//             <svg
//               key={i}
//               width={16}
//               height={16}
//               style={{ position: "absolute", opacity: 0.5, ...c }}
//             >
//               <polyline
//                 points={c.points}
//                 fill="none"
//                 stroke="rgba(220,38,38,.7)"
//                 strokeWidth={1}
//               />
//             </svg>
//           ))}

//           {/* Ghost stats */}
//           {[
//             { side: "left", val: "248", label: "reps logged" },
//             { side: "right", val: "1.4M", label: "kg lifted" },
//           ].map(({ side, val, label }) => (
//             <div
//               key={side}
//               style={{
//                 position: "absolute",
//                 [side]: 28,
//                 top: "50%",
//                 transform: "translateY(-50%)",
//                 textAlign: side,
//               }}
//             >
//               <div
//                 style={{
//                   fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
//                   fontSize: 40,
//                   color: "rgba(255,255,255,.05)",
//                   letterSpacing: 2,
//                   lineHeight: 1,
//                 }}
//               >
//                 {val}
//               </div>
//               <div
//                 style={{
//                   fontSize: 9,
//                   letterSpacing: 3,
//                   color: "rgba(255,255,255,.03)",
//                   textTransform: "uppercase",
//                 }}
//               >
//                 {label}
//               </div>
//             </div>
//           ))}

//           {/* Center content */}
//           <div
//             style={{
//               position: "relative",
//               zIndex: 10,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             {/* Logo */}
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "baseline",
//                 gap: 12,
//                 marginBottom: 32,
//               }}
//             >
//               <motion.span
//                 animate={logoIn ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
//                 transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//                 style={{
//                   fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
//                   fontSize: "clamp(56px, 10vw, 88px)",
//                   color: "#fff",
//                   letterSpacing: 6,
//                   lineHeight: 1,
//                 }}
//               >
//                 IRON
//               </motion.span>
//               <motion.span
//                 animate={pulseIn ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
//                 transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//                 style={{
//                   fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
//                   fontSize: "clamp(56px, 10vw, 88px)",
//                   color: "#dc2626",
//                   letterSpacing: 6,
//                   lineHeight: 1,
//                 }}
//               >
//                 PULSE
//               </motion.span>
//             </div>

//             {/* Tagline */}
//             <motion.p
//               animate={tagIn ? { opacity: 1 } : { opacity: 0 }}
//               transition={{ duration: 0.6 }}
//               style={{
//                 fontSize: 11,
//                 letterSpacing: 8,
//                 color: "rgba(255,255,255,.22)",
//                 textTransform: "uppercase",
//                 marginBottom: 40,
//               }}
//             >
//               Forged in discipline &nbsp;·&nbsp; Built for performance
//             </motion.p>

//             {/* Progress meter */}
//             <div style={{ width: 280, position: "relative" }}>
//               <div
//                 style={{
//                   height: 1,
//                   background: "rgba(255,255,255,.08)",
//                   position: "relative",
//                   overflow: "visible",
//                 }}
//               >
//                 <div
//                   style={{
//                     position: "absolute",
//                     left: 0,
//                     top: 0,
//                     height: "100%",
//                     width: `${progress}%`,
//                     background: "#dc2626",
//                     boxShadow: "0 0 8px #dc2626",
//                     transition: "width 50ms linear",
//                   }}
//                 >
//                   {/* Glowing head */}
//                   <div
//                     style={{
//                       position: "absolute",
//                       right: -1,
//                       top: -3,
//                       width: 1,
//                       height: 7,
//                       background: "#fff",
//                       boxShadow: "0 0 6px 2px rgba(220,38,38,.9)",
//                     }}
//                   />
//                 </div>
//               </div>
//               <p
//                 style={{
//                   fontSize: 10,
//                   letterSpacing: 4,
//                   color: "rgba(255,255,255,.3)",
//                   textAlign: "center",
//                   marginTop: 10,
//                   textTransform: "uppercase",
//                 }}
//               >
//                 {phaseLabel} — {Math.floor(progress)}%
//               </p>
//             </div>
//           </div>

//           {/* Done wipe overlay */}
//           <motion.div
//             animate={done ? { scaleX: 1 } : { scaleX: 0 }}
//             initial={{ scaleX: 0 }}
//             transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
//             style={{
//               position: "absolute",
//               inset: 0,
//               //   background: "#dc2626",
//               background: "#FFF",
//               transformOrigin: "left",
//               zIndex: 20,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <motion.span
//               animate={done ? { opacity: 1 } : { opacity: 0 }}
//               transition={{ delay: 0.3, duration: 0.35 }}
//               style={{
//                 fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
//                 fontSize: "clamp(48px, 8vw, 72px)",
//                 color: "#dc2626",
//                 letterSpacing: 10,
//               }}
//             >
//               ENTER
//             </motion.span>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// ANIMATION 2
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PHASES = [
  { label: "Calibrating systems", end: 18, dur: 1400 },
  { label: "Loading assets", end: 37, dur: 1800 },
  { label: "Syncing performance data", end: 55, dur: 1500 },
  { label: "Optimizing render pipeline", end: 72, dur: 1600 },
  { label: "Warming up engines", end: 88, dur: 1300 },
  { label: "Ready to perform", end: 100, dur: 1100 },
];

function easeInOutQuart(t) {
  return t < 0.5 ? 8 * t ** 4 : 1 - Math.pow(-2 * t + 2, 4) / 2;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

export const HeroLoading = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phaseLabel, setPhaseLabel] = useState("Initializing");
  const [logoIn, setLogoIn] = useState(false);
  const [pulseIn, setPulseIn] = useState(false);
  const [tagIn, setTagIn] = useState(false);
  const [done, setDone] = useState(false);
  const [exit, setExit] = useState(false);
  const noiseRef = useRef(null);
  const noiseInterval = useRef(null);
  const rafRef = useRef(null);

  /* ── Noise canvas ── */
  useEffect(() => {
    const canvas = noiseRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();

    function drawNoise() {
      const w = canvas.width,
        h = canvas.height;
      const img = ctx.createImageData(w, h);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
        img.data[i + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
    }

    noiseInterval.current = setInterval(drawNoise, 80);
    return () => clearInterval(noiseInterval.current);
  }, []);

  /* ── Radar sweep canvas ── */
  const radarRef = useRef(null);
  const radarAngleRef = useRef(-Math.PI / 2);
  const radarRafRef = useRef(null);

  useEffect(() => {
    const canvas = radarRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();

    function draw() {
      const w = canvas.width,
        h = canvas.height;
      const cx = w / 2,
        cy = h / 2;
      const R = Math.max(w, h) * 0.72;
      const sweepSpan = Math.PI * 0.55;
      const angle = radarAngleRef.current;

      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(cx, cy);

      const steps = 48;
      for (let i = 0; i < steps; i++) {
        const frac = i / steps;
        const a = angle - frac * sweepSpan;
        const nextA = angle - ((i + 1) / steps) * sweepSpan;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, R, a, nextA, false);
        ctx.closePath();
        ctx.fillStyle = `rgba(220,38,38,${(1 - frac) * 0.13})`;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(angle) * R, Math.sin(angle) * R);
      ctx.strokeStyle = "rgba(220,38,38,0.85)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.restore();
      radarAngleRef.current += 0.022;
      radarRafRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(radarRafRef.current);
  }, []);

  /* ── Logo entrance ── */
  useEffect(() => {
    const t1 = setTimeout(() => setLogoIn(true), 200);
    const t2 = setTimeout(() => setPulseIn(true), 350);
    const t3 = setTimeout(() => setTagIn(true), 700);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  /* ── Progress phases ── */
  useEffect(() => {
    let phaseIdx = 0;
    let currentProgress = 0;

    function runPhase(idx) {
      if (idx >= PHASES.length) return;
      const ph = PHASES[idx];
      const start = currentProgress;
      const startTime = performance.now();

      setPhaseLabel(ph.label);

      function tick(now) {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / ph.dur, 1);
        const et = easeInOutQuart(t);
        currentProgress = lerp(start, ph.end, et);
        setProgress(currentProgress);

        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          phaseIdx++;
          if (phaseIdx < PHASES.length) {
            setTimeout(() => runPhase(phaseIdx), 120);
          } else {
            setTimeout(() => setDone(true), 300);
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    const startTimer = setTimeout(() => runPhase(0), 900);
    return () => {
      clearTimeout(startTimer);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* ── Trigger exit after done flash ── */
  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => {
      setExit(true);
      setTimeout(() => onComplete?.(), 900);
    }, 2500);
    return () => clearTimeout(t);
  }, [done]);

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "#000",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "sans-serif",
          }}
        >
          {/* Noise texture */}
          <canvas
            ref={noiseRef}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              opacity: 0.04,
              pointerEvents: "none",
            }}
          />

          {/* Grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)",
              backgroundSize: "40px 40px",
              pointerEvents: "none",
            }}
          />

          {/* Radar sweep */}
          <canvas
            ref={radarRef}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          />

          {/* Pulse rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ scale: [0.6, 1.6], opacity: [0.6, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i,
                ease: "easeOut",
              }}
              style={{
                position: "absolute",
                width: 380,
                height: 380,
                borderRadius: "50%",
                border: "1px solid rgba(220,38,38,.07)",
                pointerEvents: "none",
              }}
            />
          ))}

          {/* Corner brackets */}
          {[
            { top: 24, left: 24, points: "0,16 0,0 16,0" },
            { top: 24, right: 24, points: "0,0 16,0 16,16" },
            { bottom: 24, left: 24, points: "0,0 0,16 16,16" },
            { bottom: 24, right: 24, points: "0,16 16,16 16,0" },
          ].map((c, i) => (
            <svg
              key={i}
              width={16}
              height={16}
              style={{ position: "absolute", opacity: 0.5, ...c }}
            >
              <polyline
                points={c.points}
                fill="none"
                stroke="rgba(220,38,38,.7)"
                strokeWidth={1}
              />
            </svg>
          ))}

          {/* Ghost stats */}
          {[
            { side: "left", val: "248", label: "reps logged" },
            { side: "right", val: "1.4M", label: "kg lifted" },
          ].map(({ side, val, label }) => (
            <div
              key={side}
              style={{
                position: "absolute",
                [side]: 28,
                top: "50%",
                transform: "translateY(-50%)",
                textAlign: side,
              }}
            >
              <div
                style={{
                  fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
                  fontSize: 40,
                  color: "rgba(255,255,255,.05)",
                  letterSpacing: 2,
                  lineHeight: 1,
                }}
              >
                {val}
              </div>
              <div
                style={{
                  fontSize: 9,
                  letterSpacing: 3,
                  color: "rgba(255,255,255,.03)",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </div>
            </div>
          ))}

          {/* Center content */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Logo */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 12,
                marginBottom: 32,
              }}
            >
              <motion.span
                animate={logoIn ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
                  fontSize: "clamp(56px, 10vw, 88px)",
                  color: "#fff",
                  letterSpacing: 6,
                  lineHeight: 1,
                }}
              >
                IRON
              </motion.span>
              <motion.span
                animate={pulseIn ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
                  fontSize: "clamp(56px, 10vw, 88px)",
                  color: "#dc2626",
                  letterSpacing: 6,
                  lineHeight: 1,
                }}
              >
                PULSE
              </motion.span>
            </div>

            {/* Tagline */}
            <motion.p
              animate={tagIn ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                fontSize: 11,
                letterSpacing: 8,
                color: "rgba(255,255,255,.22)",
                textTransform: "uppercase",
                marginBottom: 40,
              }}
            >
              Forged in discipline &nbsp;·&nbsp; Built for performance
            </motion.p>

            {/* Progress meter */}
            <div style={{ width: 280, position: "relative" }}>
              <div
                style={{
                  height: 1,
                  background: "rgba(255,255,255,.08)",
                  position: "relative",
                  overflow: "visible",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "100%",
                    width: `${progress}%`,
                    background: "#dc2626",
                    boxShadow: "0 0 8px #dc2626",
                    transition: "width 50ms linear",
                  }}
                >
                  {/* Glowing head */}
                  <div
                    style={{
                      position: "absolute",
                      right: -1,
                      top: -3,
                      width: 1,
                      height: 7,
                      background: "#fff",
                      boxShadow: "0 0 6px 2px rgba(220,38,38,.9)",
                    }}
                  />
                </div>
              </div>
              <p
                style={{
                  fontSize: 10,
                  letterSpacing: 4,
                  color: "rgba(255,255,255,.3)",
                  textAlign: "center",
                  marginTop: 10,
                  textTransform: "uppercase",
                }}
              >
                {phaseLabel} — {Math.floor(progress)}%
              </p>
            </div>
          </div>

          {/* Done wipe overlay — stays visible for 2.5s before exit */}
          <motion.div
            animate={done ? { scaleX: 1 } : { scaleX: 0 }}
            initial={{ scaleX: 0 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: "absolute",
              inset: 0,
              background: "#dc2626",
              transformOrigin: "left",
              zIndex: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              overflow: "hidden",
            }}
          >
            {[0, 1].map((i) => (
              <motion.div
                key={i}
                animate={done ? { scale: [0.5, 2.2], opacity: [0.7, 0] } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.7,
                  ease: "easeOut",
                }}
                style={{
                  position: "absolute",
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,.2)",
                  pointerEvents: "none",
                }}
              />
            ))}
            <motion.span
              animate={
                done ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }
              }
              transition={{ delay: 0.35, duration: 0.45 }}
              style={{
                fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
                fontSize: "clamp(64px, 11vw, 96px)",
                color: "#fff",
                letterSpacing: 14,
                lineHeight: 1,
              }}
            >
              ENTER
            </motion.span>
            <motion.span
              animate={done ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.55, duration: 0.4 }}
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 11,
                letterSpacing: 7,
                color: "rgba(255,255,255,.5)",
                textTransform: "uppercase",
              }}
            >
              Performance awaits
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ANIMATION 3 SIMPLE
// "use client";
// import { useEffect, useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// export const HeroLoading = ({ progress }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 1 }}
//       exit={{
//         y: "-100%",
//         transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
//       }}
//       className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white text-white"
//     >
//       <div className="flex flex-col items-center gap-4">
//         {/* Animated Branding */}
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-4xl font-black italic tracking-tighter text-black"
//         >
//           IRON <span className="text-red-600">PULSE</span>
//         </motion.h2>

//         {/* Progress Container */}
//         <div className="w-64 h-[2px] bg-white/10 relative overflow-hidden">
//           <motion.div
//             className="absolute left-0 top-0 h-full bg-white"
//             initial={{ width: 0 }}
//             animate={{ width: `${progress}%` }}
//           />
//         </div>

//         <span className="text-xs font-mono tracking-widest text-gray-500 uppercase">
//           Optimizing Performance {progress}%
//         </span>
//       </div>
//     </motion.div>
//   );
// };

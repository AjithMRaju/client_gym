// // "use client";
// // import React, { useState, useEffect, useRef } from "react";
// // import {
// //   motion,
// //   useInView,
// //   useScroll,
// //   useTransform,
// //   AnimatePresence,
// // } from "framer-motion";
// // import { AboutApi } from "@/api/about/aboutApi";
// // import { Badge } from "@/components/ui/badge";
// // import { Separator } from "@/components/ui/separator";
// // import { Skeleton } from "@/components/ui/skeleton";
// // import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Target,
// //   Eye,
// //   AlertCircle,
// //   RefreshCw,
// //   Dumbbell,
// //   Zap,
// //   TrendingUp,
// //   Users,
// //   Star,
// // } from "lucide-react";

// // /* ─── Stat icon map ───────────────────────────────────────────────── */
// // const statIconMap = {
// //   "Total Members": Users,
// //   Demographics: TrendingUp,
// //   "Weekly Group Classes": Zap,
// //   "Average Member Visit": Star,
// //   "Success Rate": Target,
// // };

// // /* ─── Reusable stagger variants ──────────────────────────────────── */
// // const containerVariants = {
// //   hidden: {},
// //   visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
// // };

// // const fadeUp = {
// //   hidden: { opacity: 0, y: 40 },
// //   visible: {
// //     opacity: 1,
// //     y: 0,
// //     transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
// //   },
// // };

// // const fadeIn = {
// //   hidden: { opacity: 0 },
// //   visible: { opacity: 1, transition: { duration: 0.6 } },
// // };

// // const slideLeft = {
// //   hidden: { opacity: 0, x: -60 },
// //   visible: {
// //     opacity: 1,
// //     x: 0,
// //     transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
// //   },
// // };

// // const slideRight = {
// //   hidden: { opacity: 0, x: 60 },
// //   visible: {
// //     opacity: 1,
// //     x: 0,
// //     transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
// //   },
// // };

// // const scaleIn = {
// //   hidden: { opacity: 0, scale: 0.88 },
// //   visible: {
// //     opacity: 1,
// //     scale: 1,
// //     transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
// //   },
// // };

// // /* ─── Skeleton loader ─────────────────────────────────────────────── */
// // const AboutSkeleton = () => (
// //   <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
// //     {/* Hero skeleton */}
// //     <div className="relative h-[90vh] flex items-end pb-16 px-6 md:px-16 lg:px-24">
// //       <Skeleton className="absolute inset-0 bg-zinc-900 rounded-none" />
// //       <div className="relative z-10 space-y-4 w-full max-w-4xl">
// //         <Skeleton className="h-6 w-28 bg-zinc-700 rounded-full" />
// //         <Skeleton className="h-16 w-3/4 bg-zinc-800 rounded-lg" />
// //         <Skeleton className="h-16 w-1/2 bg-zinc-800 rounded-lg" />
// //         <Skeleton className="h-5 w-2/3 bg-zinc-700 rounded" />
// //       </div>
// //     </div>
// //     {/* Stats skeleton */}
// //     <div className="px-6 md:px-16 lg:px-24 py-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
// //       {Array.from({ length: 5 }).map((_, i) => (
// //         <div
// //           key={i}
// //           className="space-y-3 p-6 border border-zinc-800 rounded-2xl"
// //         >
// //           <Skeleton className="h-8 w-8 bg-zinc-700 rounded-full" />
// //           <Skeleton className="h-4 w-3/4 bg-zinc-800 rounded" />
// //           <Skeleton className="h-3 w-full bg-zinc-700 rounded" />
// //         </div>
// //       ))}
// //     </div>
// //     {/* Content skeleton */}
// //     <div className="px-6 md:px-16 lg:px-24 py-20 grid lg:grid-cols-2 gap-12">
// //       <div className="space-y-4">
// //         <Skeleton className="h-6 w-24 bg-zinc-700 rounded-full" />
// //         <Skeleton className="h-10 w-3/4 bg-zinc-800 rounded-lg" />
// //         <Skeleton className="h-4 w-full bg-zinc-700 rounded" />
// //         <Skeleton className="h-4 w-5/6 bg-zinc-700 rounded" />
// //         <Skeleton className="h-4 w-4/6 bg-zinc-700 rounded" />
// //       </div>
// //       <div className="space-y-4">
// //         <Skeleton className="h-6 w-24 bg-zinc-700 rounded-full" />
// //         <Skeleton className="h-10 w-3/4 bg-zinc-800 rounded-lg" />
// //         <Skeleton className="h-4 w-full bg-zinc-700 rounded" />
// //         <Skeleton className="h-4 w-5/6 bg-zinc-700 rounded" />
// //       </div>
// //     </div>
// //   </div>
// // );

// // /* ─── Error state ─────────────────────────────────────────────────── */
// // const AboutError = ({ onRetry }) => (
// //   <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
// //     <motion.div
// //       initial={{ opacity: 0, scale: 0.9 }}
// //       animate={{ opacity: 1, scale: 1 }}
// //       transition={{ duration: 0.5 }}
// //       className="max-w-md w-full"
// //     >
// //       <Alert className="bg-zinc-900 border border-red-500/30 text-white rounded-2xl p-8 shadow-[0_0_40px_rgba(239,68,68,0.1)]">
// //         <AlertCircle className="h-5 w-5 text-red-400" />
// //         <AlertTitle className="text-xl font-semibold ml-2 text-red-300">
// //           Failed to load content
// //         </AlertTitle>
// //         <AlertDescription className="mt-3 text-zinc-400 leading-relaxed">
// //           We couldn't retrieve the About section. Please check your connection
// //           and try again.
// //         </AlertDescription>
// //         <Button
// //           onClick={onRetry}
// //           className="mt-6 bg-red-500 hover:bg-red-600 text-white rounded-full px-6 gap-2 transition-all duration-300 hover:scale-105"
// //         >
// //           <RefreshCw className="h-4 w-4" />
// //           Retry
// //         </Button>
// //       </Alert>
// //     </motion.div>
// //   </div>
// // );

// // /* ─── Floating particle background ───────────────────────────────── */
// // const ParticleField = () => {
// //   const particles = Array.from({ length: 18 }, (_, i) => ({
// //     id: i,
// //     x: Math.random() * 100,
// //     y: Math.random() * 100,
// //     size: Math.random() * 3 + 1,
// //     duration: Math.random() * 10 + 8,
// //     delay: Math.random() * 5,
// //   }));
// //   return (
// //     <div className="absolute inset-0 overflow-hidden pointer-events-none">
// //       {particles.map((p) => (
// //         <motion.div
// //           key={p.id}
// //           className="absolute rounded-full bg-[#e8ff47]/20"
// //           style={{
// //             left: `${p.x}%`,
// //             top: `${p.y}%`,
// //             width: p.size,
// //             height: p.size,
// //           }}
// //           animate={{ y: [-20, 20, -20], opacity: [0.2, 0.6, 0.2] }}
// //           transition={{
// //             duration: p.duration,
// //             delay: p.delay,
// //             repeat: Infinity,
// //             ease: "easeInOut",
// //           }}
// //         />
// //       ))}
// //     </div>
// //   );
// // };

// // /* ─── Animated counter ───────────────────────────────────────────── */
// // const AnimatedCounter = ({ value }) => {
// //   const [display, setDisplay] = useState("0");
// //   const ref = useRef(null);
// //   const inView = useInView(ref, { once: true, margin: "-80px" });

// //   useEffect(() => {
// //     if (!inView) return;
// //     const num = parseFloat(value.replace(/[^0-9.]/g, ""));
// //     if (isNaN(num)) {
// //       setDisplay(value);
// //       return;
// //     }
// //     let start = 0;
// //     const duration = 1800;
// //     const step = 16;
// //     const increments = Math.ceil(duration / step);
// //     let count = 0;
// //     const suffix = value.replace(/[0-9.,]/g, "").trim();
// //     const timer = setInterval(() => {
// //       count++;
// //       const progress = count / increments;
// //       const eased = 1 - Math.pow(1 - progress, 3);
// //       const current = Math.round(eased * num);
// //       setDisplay(`${current.toLocaleString()}${suffix}`);
// //       if (count >= increments) clearInterval(timer);
// //     }, step);
// //     return () => clearInterval(timer);
// //   }, [inView, value]);

// //   return <span ref={ref}>{display}</span>;
// // };

// // /* ─── Stat card ──────────────────────────────────────────────────── */
// // const StatCard = ({ stat, index }) => {
// //   const Icon = statIconMap[stat.label] || Dumbbell;
// //   const ref = useRef(null);
// //   const inView = useInView(ref, { once: true, margin: "-60px" });

// //   return (
// //     <motion.div
// //       ref={ref}
// //       variants={fadeUp}
// //       initial="hidden"
// //       animate={inView ? "visible" : "hidden"}
// //       transition={{ delay: index * 0.1 }}
// //       whileHover={{ y: -8, scale: 1.02 }}
// //       className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm p-6 cursor-default transition-all duration-300 hover:border-[#e8ff47]/40 hover:shadow-[0_0_30px_rgba(232,255,71,0.08)]"
// //     >
// //       {/* Glow on hover */}
// //       <div className="absolute inset-0 bg-gradient-to-br from-[#e8ff47]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

// //       <div className="relative z-10">
// //         <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#e8ff47]/10 border border-[#e8ff47]/20 group-hover:bg-[#e8ff47]/20 transition-colors duration-300">
// //           <Icon className="w-5 h-5 text-[#e8ff47]" />
// //         </div>
// //         <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">
// //           {stat.label}
// //         </p>
// //         <p className="text-base font-bold text-white leading-snug">
// //           <AnimatedCounter value={stat.value} />
// //         </p>
// //       </div>

// //       {/* Bottom accent line */}
// //       <motion.div
// //         className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#e8ff47] to-transparent"
// //         initial={{ scaleX: 0, originX: 0 }}
// //         animate={inView ? { scaleX: 1 } : {}}
// //         transition={{ duration: 0.8, delay: index * 0.1 + 0.4 }}
// //       />
// //     </motion.div>
// //   );
// // };

// // /* ─── Section heading ─────────────────────────────────────────────── */
// // const SectionLabel = ({ children }) => (
// //   <Badge className="bg-[#e8ff47]/10 text-[#e8ff47] border border-[#e8ff47]/30 hover:bg-[#e8ff47]/20 rounded-full text-xs tracking-widest uppercase font-semibold px-4 py-1">
// //     {children}
// //   </Badge>
// // );

// // /* ─── Hero section (isolated so useScroll ref is always hydrated) ─── */
// // const HeroSection = ({ data }) => {
// //   const heroRef = useRef(null);
// //   const { scrollYProgress } = useScroll({
// //     target: heroRef,
// //     offset: ["start start", "end start"],
// //     layoutEffect: false, // ← prevents the SSR/hydration mismatch error
// //   });
// //   const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
// //   const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
// //   const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

// //   return (
// //     <section
// //       ref={heroRef}
// //       className="relative h-[92vh] min-h-[600px] overflow-hidden"
// //     >
// //       {/* Parallax image */}
// //       <motion.div
// //         className="absolute inset-0 will-change-transform"
// //         style={{ y: heroY, scale: heroScale }}
// //       >
// //         <img
// //           src={data.image}
// //           alt={data.title}
// //           className="w-full h-full object-cover object-center"
// //         />
// //         {/* Layered overlays */}
// //         <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
// //         <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/70 via-transparent to-transparent" />
// //       </motion.div>

// //       <ParticleField />

// //       {/* Hero content */}
// //       <motion.div
// //         className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-16 lg:px-24"
// //         style={{ opacity: heroOpacity }}
// //       >
// //         <motion.div
// //           variants={containerVariants}
// //           initial="hidden"
// //           animate="visible"
// //           className="max-w-5xl"
// //         >
// //           <motion.div variants={fadeIn} className="mb-6">
// //             <SectionLabel>Est. 2026</SectionLabel>
// //           </motion.div>

// //           <motion.h1
// //             variants={fadeUp}
// //             className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tight text-white mb-6"
// //             style={{ fontFamily: "'Syne', 'DM Sans', sans-serif" }}
// //           >
// //             {data.title}
// //             <br />
// //             <span className="text-[#e8ff47]">.</span>
// //           </motion.h1>

// //           <motion.p
// //             variants={fadeUp}
// //             className="text-zinc-400 text-lg md:text-xl max-w-xl leading-relaxed"
// //           >
// //             Where fitness meets community — your journey starts here.
// //           </motion.p>

// //           {/* Scroll cue */}
// //           <motion.div
// //             variants={fadeIn}
// //             className="mt-10 flex items-center gap-3 text-zinc-500 text-sm tracking-widest uppercase"
// //           >
// //             <motion.div
// //               className="w-px h-12 bg-gradient-to-b from-[#e8ff47] to-transparent"
// //               animate={{ scaleY: [1, 0.4, 1] }}
// //               transition={{
// //                 duration: 1.8,
// //                 repeat: Infinity,
// //                 ease: "easeInOut",
// //               }}
// //             />
// //             Scroll to explore
// //           </motion.div>
// //         </motion.div>
// //       </motion.div>
// //     </section>
// //   );
// // };

// // /* ─── Main component ──────────────────────────────────────────────── */
// // const About = () => {
// //   const [data, setData] = useState(null);
// //   const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"

// //   const fetchData = () => {
// //     setStatus("loading");
// //     AboutApi.getAbout()
// //       .then((res) => {
// //         setData(res.data);
// //         setStatus("success");
// //       })
// //       .catch((err) => {
// //         console.error("Fetch error:", err);
// //         setStatus("error");
// //       });
// //   };

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   /* Loading */
// //   if (status === "loading") return <AboutSkeleton />;

// //   /* Error */
// //   if (status === "error") return <AboutError onRetry={fetchData} />;

// //   /* Success */
// //   return (
// //     <AnimatePresence mode="wait">
// //       <motion.div
// //         key="about-content"
// //         initial={{ opacity: 0 }}
// //         animate={{ opacity: 1 }}
// //         exit={{ opacity: 0 }}
// //         transition={{ duration: 0.5 }}
// //         className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-x-hidden"
// //         style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
// //       >
// //         {/* ── HERO ─────────────────────────────────────────────────── */}
// //         <HeroSection data={data} />

// //         {/* ── STATS STRIP ──────────────────────────────────────────── */}
// //         <section className="px-6 md:px-16 lg:px-24 py-20">
// //           <motion.div
// //             initial="hidden"
// //             whileInView="visible"
// //             viewport={{ once: true, margin: "-80px" }}
// //             variants={containerVariants}
// //           >
// //             <motion.div
// //               variants={fadeUp}
// //               className="flex items-center gap-4 mb-12"
// //             >
// //               <SectionLabel>By the Numbers</SectionLabel>
// //               <Separator className="flex-1 bg-zinc-800 max-w-xs" />
// //             </motion.div>

// //             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
// //               {data.stats.map((stat, i) => (
// //                 <StatCard key={stat._id} stat={stat} index={i} />
// //               ))}
// //             </div>
// //           </motion.div>
// //         </section>

// //         {/* ── DESCRIPTION ──────────────────────────────────────────── */}
// //         <section className="px-6 md:px-16 lg:px-24 py-16">
// //           <motion.div
// //             initial="hidden"
// //             whileInView="visible"
// //             viewport={{ once: true, margin: "-100px" }}
// //             variants={containerVariants}
// //             className="grid lg:grid-cols-[1fr_2px_1fr] gap-12 lg:gap-16 items-start"
// //           >
// //             <motion.div variants={slideLeft} className="space-y-6">
// //               <div className="inline-flex items-center gap-2 text-[#e8ff47]">
// //                 <Dumbbell className="w-5 h-5" />
// //                 <SectionLabel>Who We Are</SectionLabel>
// //               </div>
// //               <h2
// //                 className="text-4xl md:text-5xl font-black leading-tight text-white"
// //                 style={{ fontFamily: "'Syne', 'DM Sans', sans-serif" }}
// //               >
// //                 More than a<br />
// //                 <span className="text-[#e8ff47]">gym</span>.
// //               </h2>
// //               <p className="text-zinc-400 text-lg leading-relaxed">
// //                 {data.description}
// //               </p>
// //             </motion.div>

// //             {/* Vertical divider — hidden on mobile */}
// //             <motion.div
// //               variants={fadeIn}
// //               className="hidden lg:block w-px self-stretch bg-gradient-to-b from-transparent via-zinc-700 to-transparent"
// //             />

// //             {/* Mission & Vision stacked */}
// //             <div className="space-y-10">
// //               {/* Mission */}
// //               <motion.div variants={slideRight} className="space-y-4">
// //                 <div className="inline-flex items-center gap-2">
// //                   <div className="w-8 h-8 rounded-lg bg-[#e8ff47]/10 border border-[#e8ff47]/20 flex items-center justify-center">
// //                     <Target className="w-4 h-4 text-[#e8ff47]" />
// //                   </div>
// //                   <span className="text-xs font-bold uppercase tracking-widest text-[#e8ff47]">
// //                     Mission
// //                   </span>
// //                 </div>
// //                 <h3
// //                   className="text-2xl md:text-3xl font-black text-white"
// //                   style={{ fontFamily: "'Syne', 'DM Sans', sans-serif" }}
// //                 >
// //                   Our Purpose
// //                 </h3>
// //                 <p className="text-zinc-400 leading-relaxed">{data.mission}</p>
// //               </motion.div>

// //               <Separator className="bg-zinc-800" />

// //               {/* Vision */}
// //               <motion.div variants={slideRight} className="space-y-4">
// //                 <div className="inline-flex items-center gap-2">
// //                   <div className="w-8 h-8 rounded-lg bg-[#e8ff47]/10 border border-[#e8ff47]/20 flex items-center justify-center">
// //                     <Eye className="w-4 h-4 text-[#e8ff47]" />
// //                   </div>
// //                   <span className="text-xs font-bold uppercase tracking-widest text-[#e8ff47]">
// //                     Vision
// //                   </span>
// //                 </div>
// //                 <h3
// //                   className="text-2xl md:text-3xl font-black text-white"
// //                   style={{ fontFamily: "'Syne', 'DM Sans', sans-serif" }}
// //                 >
// //                   Where We're Going
// //                 </h3>
// //                 <p className="text-zinc-400 leading-relaxed">{data.vision}</p>
// //               </motion.div>
// //             </div>
// //           </motion.div>
// //         </section>

// //         {/* ── MISSION / VISION BANNER ───────────────────────────────── */}
// //         <section className="px-6 md:px-16 lg:px-24 py-16">
// //           <motion.div
// //             initial="hidden"
// //             whileInView="visible"
// //             viewport={{ once: true, margin: "-100px" }}
// //             variants={scaleIn}
// //             className="relative overflow-hidden rounded-3xl bg-[#e8ff47] p-10 md:p-16"
// //           >
// //             {/* Decorative blob */}
// //             <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-black/10 blur-3xl" />
// //             <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-black/10 blur-2xl" />

// //             <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
// //               <div>
// //                 <p className="text-xs font-bold uppercase tracking-widest text-black/50 mb-3">
// //                   Our Vision
// //                 </p>
// //                 <h2
// //                   className="text-4xl md:text-5xl font-black text-black leading-tight"
// //                   style={{ fontFamily: "'Syne', 'DM Sans', sans-serif" }}
// //                 >
// //                   Building a healthier
// //                   <br />
// //                   stronger future.
// //                 </h2>
// //               </div>
// //               <div>
// //                 <p className="text-black/70 text-lg leading-relaxed">
// //                   {data.vision}
// //                 </p>
// //                 <motion.div
// //                   className="mt-8 inline-flex items-center gap-2 bg-black text-[#e8ff47] px-8 py-4 rounded-full font-bold text-sm tracking-wide cursor-pointer select-none"
// //                   whileHover={{ scale: 1.05, x: 4 }}
// //                   whileTap={{ scale: 0.97 }}
// //                   transition={{ type: "spring", stiffness: 400, damping: 15 }}
// //                 >
// //                   <Zap className="w-4 h-4" />
// //                   Start Your Journey
// //                 </motion.div>
// //               </div>
// //             </div>
// //           </motion.div>
// //         </section>

// //         {/* ── IMAGE MARQUEE STRIP ───────────────────────────────────── */}
// //         <section className="py-10 overflow-hidden">
// //           <motion.div
// //             animate={{ x: ["0%", "-50%"] }}
// //             transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
// //             className="flex gap-6 w-max"
// //           >
// //             {[...Array(8)].map((_, i) => (
// //               <div
// //                 key={i}
// //                 className="flex items-center gap-6 shrink-0 text-zinc-700 text-sm font-bold uppercase tracking-widest"
// //               >
// //                 <span>FITNESS</span>
// //                 <span className="text-[#e8ff47]">★</span>
// //                 <span>COMMUNITY</span>
// //                 <span className="text-[#e8ff47]">★</span>
// //                 <span>STRENGTH</span>
// //                 <span className="text-[#e8ff47]">★</span>
// //                 <span>WELLNESS</span>
// //                 <span className="text-[#e8ff47]">★</span>
// //               </div>
// //             ))}
// //           </motion.div>
// //         </section>

// //         {/* ── FOOTER META ───────────────────────────────────────────── */}
// //         <section className="px-6 md:px-16 lg:px-24 py-10 border-t border-zinc-900">
// //           <motion.div
// //             initial="hidden"
// //             whileInView="visible"
// //             viewport={{ once: true }}
// //             variants={fadeIn}
// //             className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-zinc-600 text-xs tracking-widest uppercase"
// //           >
// //             <span>
// //               Last updated:{" "}
// //               {new Date(data.updatedAt).toLocaleDateString("en-US", {
// //                 year: "numeric",
// //                 month: "long",
// //                 day: "numeric",
// //               })}
// //             </span>
// //             <div className="flex items-center gap-2">
// //               <span
// //                 className={`w-2 h-2 rounded-full ${data.isActive ? "bg-[#e8ff47] animate-pulse" : "bg-zinc-600"}`}
// //               />
// //               <span>{data.isActive ? "Active" : "Inactive"}</span>
// //             </div>
// //           </motion.div>
// //         </section>
// //       </motion.div>
// //     </AnimatePresence>
// //   );
// // };

// // export default About;

// // ui 02
// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import {
//   motion,
//   useInView,
//   useScroll,
//   useTransform,
//   useSpring,
//   AnimatePresence,
// } from "framer-motion";
// import { AboutApi } from "@/api/about/aboutApi";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import {
//   Target,
//   Eye,
//   AlertCircle,
//   RefreshCw,
//   Dumbbell,
//   Zap,
//   TrendingUp,
//   Users,
//   Star,
//   ArrowRight,
//   FlameKindling,
// } from "lucide-react";

// /* ════════════════════════════════════════════════════
//    CONSTANTS
// ════════════════════════════════════════════════════ */
// const ACCENT = "#FF4D00";

// const STAT_ICONS = {
//   "Total Members": Users,
//   Demographics: TrendingUp,
//   "Weekly Group Classes": FlameKindling,
//   "Average Member Visit": Zap,
//   "Success Rate": Target,
// };

// /* ════════════════════════════════════════════════════
//    SKELETON
// ════════════════════════════════════════════════════ */
// const AboutSkeleton = () => (
//   <div className="min-h-screen bg-black overflow-hidden">
//     <div className="relative h-screen">
//       <Skeleton className="absolute inset-0 rounded-none bg-zinc-950" />
//       <div className="absolute bottom-16 left-8 md:left-20 space-y-5">
//         <Skeleton className="h-4 w-24 bg-zinc-800 rounded" />
//         <Skeleton className="h-20 w-[420px] max-w-[80vw] bg-zinc-800 rounded" />
//         <Skeleton className="h-20 w-[320px] max-w-[60vw] bg-zinc-900 rounded" />
//       </div>
//     </div>
//     <div className="px-8 md:px-20 py-24 grid md:grid-cols-3 gap-6">
//       {[...Array(3)].map((_, i) => (
//         <div
//           key={i}
//           className="space-y-4 p-8 border border-zinc-900 rounded-xl"
//         >
//           <Skeleton className="h-10 w-10 bg-zinc-800 rounded-lg" />
//           <Skeleton className="h-3 w-20 bg-zinc-800 rounded" />
//           <Skeleton className="h-6 w-3/4 bg-zinc-900 rounded" />
//           <Skeleton className="h-3 w-full bg-zinc-900 rounded" />
//           <Skeleton className="h-3 w-5/6 bg-zinc-900 rounded" />
//         </div>
//       ))}
//     </div>
//   </div>
// );

// /* ════════════════════════════════════════════════════
//    ERROR
// ════════════════════════════════════════════════════ */
// const AboutError = ({ onRetry }) => (
//   <div className="min-h-screen bg-black flex items-center justify-center px-6">
//     <motion.div
//       initial={{ opacity: 0, y: 24 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//       className="max-w-sm w-full"
//     >
//       <Alert className="bg-zinc-950 border border-zinc-800 text-white rounded-2xl p-8">
//         <AlertCircle className="h-5 w-5 text-red-500" />
//         <AlertTitle className="text-lg font-semibold mt-2 text-white">
//           Something went wrong
//         </AlertTitle>
//         <AlertDescription className="mt-2 text-zinc-500 text-sm leading-relaxed">
//           Couldn't load the about section. Check your connection and try again.
//         </AlertDescription>
//         <Button
//           onClick={onRetry}
//           variant="outline"
//           className="mt-6 w-full border-zinc-700 text-white hover:bg-zinc-800 rounded-xl gap-2"
//         >
//           <RefreshCw className="h-4 w-4" /> Retry
//         </Button>
//       </Alert>
//     </motion.div>
//   </div>
// );

// /* ════════════════════════════════════════════════════
//    PARALLAX MARQUEE ROW
// ════════════════════════════════════════════════════ */
// const MarqueeRow = ({ text, direction = 1, speed = 35, className = "" }) => {
//   const repeated = `${text}  ·  `.repeat(6);
//   return (
//     <div
//       className={`overflow-hidden whitespace-nowrap select-none ${className}`}
//     >
//       <motion.div
//         className="inline-block"
//         animate={{ x: direction > 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
//         transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
//         style={{ willChange: "transform" }}
//       >
//         {repeated + repeated}
//       </motion.div>
//     </div>
//   );
// };

// /* ════════════════════════════════════════════════════
//    PER-CHARACTER REVEAL
// ════════════════════════════════════════════════════ */
// const SplitReveal = ({ text, className = "", delay = 0, stagger = 0.05 }) => {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-60px" });
//   return (
//     <span ref={ref} className={`inline-block ${className}`} aria-label={text}>
//       {text.split("").map((ch, i) => (
//         <motion.span
//           key={i}
//           className="inline-block"
//           initial={{ y: "115%", opacity: 0 }}
//           animate={inView ? { y: "0%", opacity: 1 } : {}}
//           transition={{
//             duration: 0.65,
//             delay: delay + i * stagger,
//             ease: [0.22, 1, 0.36, 1],
//           }}
//         >
//           {ch === " " ? "\u00A0" : ch}
//         </motion.span>
//       ))}
//     </span>
//   );
// };

// /* ════════════════════════════════════════════════════
//    PER-WORD REVEAL
// ════════════════════════════════════════════════════ */
// const WordReveal = ({ text, className = "", delay = 0 }) => {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-60px" });
//   return (
//     <p ref={ref} className={className}>
//       {text.split(" ").map((word, i) => (
//         <span key={i} className="inline-block overflow-hidden mr-[0.28em]">
//           <motion.span
//             className="inline-block"
//             initial={{ y: "105%", opacity: 0 }}
//             animate={inView ? { y: "0%", opacity: 1 } : {}}
//             transition={{
//               duration: 0.55,
//               delay: delay + i * 0.04,
//               ease: [0.22, 1, 0.36, 1],
//             }}
//           >
//             {word}
//           </motion.span>
//         </span>
//       ))}
//     </p>
//   );
// };

// /* ════════════════════════════════════════════════════
//    ANIMATED COUNTER
// ════════════════════════════════════════════════════ */
// const Counter = ({ value }) => {
//   const [display, setDisplay] = useState("—");
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-60px" });

//   useEffect(() => {
//     if (!inView) return;
//     const num = parseFloat(value.replace(/[^0-9.]/g, ""));
//     if (isNaN(num)) {
//       setDisplay(value);
//       return;
//     }
//     const suffix = value.replace(/[\d,.]/g, "").trim();
//     let frame = 0;
//     const total = 90;
//     const id = setInterval(() => {
//       frame++;
//       const eased = 1 - Math.pow(1 - frame / total, 3);
//       setDisplay(`${Math.round(eased * num).toLocaleString()}${suffix}`);
//       if (frame >= total) clearInterval(id);
//     }, 16);
//     return () => clearInterval(id);
//   }, [inView, value]);

//   return <span ref={ref}>{display}</span>;
// };

// /* ════════════════════════════════════════════════════
//    STAT CARD
// ════════════════════════════════════════════════════ */
// const StatCard = ({ stat, index }) => {
//   const Icon = STAT_ICONS[stat.label] || Dumbbell;
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-50px" });

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 48 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{
//         duration: 0.7,
//         delay: index * 0.1,
//         ease: [0.22, 1, 0.36, 1],
//       }}
//       whileHover={{ y: -6 }}
//       className="group relative border border-zinc-800 rounded-2xl p-7 bg-zinc-950 overflow-hidden cursor-default hover:border-zinc-600 transition-colors duration-300"
//     >
//       {/* hover radial glow */}
//       <div
//         className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
//         style={{
//           background: `radial-gradient(circle at 30% 30%, ${ACCENT}12, transparent 65%)`,
//         }}
//       />
//       {/* top accent bar */}
//       <motion.div
//         className="absolute top-0 left-0 h-[2px] rounded-t-2xl"
//         style={{ background: `linear-gradient(90deg, ${ACCENT}, transparent)` }}
//         initial={{ scaleX: 0, originX: 0 }}
//         animate={inView ? { scaleX: 1 } : {}}
//         transition={{
//           duration: 0.8,
//           delay: index * 0.1 + 0.3,
//           ease: [0.22, 1, 0.36, 1],
//         }}
//       />
//       <div className="relative z-10">
//         <div
//           className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
//           style={{ background: `${ACCENT}18`, border: `1px solid ${ACCENT}30` }}
//         >
//           <Icon className="w-5 h-5" style={{ color: ACCENT }} />
//         </div>
//         <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-1">
//           {stat.label}
//         </p>
//         <p className="text-xl font-black text-white leading-snug">
//           <Counter value={stat.value} />
//         </p>
//       </div>
//     </motion.div>
//   );
// };

// /* ════════════════════════════════════════════════════
//    HERO  — isolated so useScroll ref is always hydrated
// ════════════════════════════════════════════════════ */
// const HeroSection = ({ data }) => {
//   const heroRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: heroRef,
//     offset: ["start start", "end start"],
//     layoutEffect: false,
//   });

//   const rawImgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
//   const rawImgSc = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
//   const imgY = useSpring(rawImgY, { stiffness: 70, damping: 20 });
//   const imgScale = useSpring(rawImgSc, { stiffness: 70, damping: 20 });

//   // text drifts upward slightly slower than image → parallax depth
//   const textY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
//   const textOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

//   return (
//     <section
//       ref={heroRef}
//       className="relative h-screen min-h-[640px] overflow-hidden bg-black"
//     >
//       {/* ══ BLACK TOP SEAM — hides any cut from previous page ══ */}
//       <div
//         className="absolute top-0 left-0 right-0 z-30 pointer-events-none"
//         style={{
//           height: 200,
//           background:
//             "linear-gradient(to bottom, #000000 0%, #000000 35%, transparent 100%)",
//         }}
//       />

//       {/* ══ PARALLAX IMAGE ══ */}
//       <motion.div
//         className="absolute inset-0"
//         style={{ y: imgY, scale: imgScale, willChange: "transform" }}
//       >
//         <img
//           src={data.image}
//           alt={data.title}
//           className="w-full h-full object-cover object-center"
//         />
//         {/* cinematic vignette */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/5" />
//         <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-transparent to-transparent" />
//       </motion.div>

//       {/* ══ PARALLAX TEXT ══ */}
//       <motion.div
//         className="absolute bottom-0 left-0 right-0 z-20 pb-16 md:pb-24 px-8 md:px-20"
//         style={{ y: textY, opacity: textOpacity, willChange: "transform" }}
//       >
//         {/* eyebrow line */}
//         <motion.div
//           className="flex items-center gap-3 mb-7"
//           initial={{ opacity: 0, x: -18 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
//         >
//           <span className="w-8 h-px" style={{ background: ACCENT }} />
//           <span
//             className="text-xs font-bold uppercase tracking-[0.24em]"
//             style={{ color: ACCENT }}
//           >
//             Our Story
//           </span>
//         </motion.div>

//         {/* GIANT TITLE — per-char stagger reveal */}
//         <div
//           className="overflow-hidden mb-5"
//           style={{ fontFamily: "'Bebas Neue', 'Anton', Impact, sans-serif" }}
//         >
//           <div className="text-[clamp(4.5rem,13vw,12rem)] leading-[0.86] font-black tracking-tight text-white">
//             <SplitReveal text={data.title} delay={0.35} stagger={0.07} />
//           </div>
//         </div>

//         {/* Subtitle — per-word reveal */}
//         <WordReveal
//           text="Where fitness meets community — your journey starts here."
//           className="text-zinc-400 text-base md:text-lg max-w-md leading-relaxed"
//           delay={0.7}
//         />

//         {/* Scroll cue */}
//         <motion.div
//           className="mt-10 flex items-center gap-3"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1.5, duration: 0.8 }}
//         >
//           <motion.div
//             className="w-px h-14 origin-top"
//             style={{
//               background: `linear-gradient(to bottom, ${ACCENT}, transparent)`,
//             }}
//             animate={{ scaleY: [0, 1, 0] }}
//             transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
//           />
//           <span className="text-zinc-600 text-xs uppercase tracking-[0.22em]">
//             Scroll to explore
//           </span>
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// };

// /* ════════════════════════════════════════════════════
//    BODY SECTION
// ════════════════════════════════════════════════════ */
// const BodySection = ({ data }) => {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start end", "end start"],
//     layoutEffect: false,
//   });
//   const imgY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

//   return (
//     <section
//       ref={ref}
//       className="bg-black px-8 md:px-20 py-24 md:py-40 overflow-hidden"
//     >
//       <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-center">
//         {/* LEFT TEXT */}
//         <div className="space-y-10 order-2 lg:order-1">
//           <motion.div
//             className="flex items-center gap-3"
//             initial={{ opacity: 0, x: -16 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true, margin: "-60px" }}
//             transition={{ duration: 0.6 }}
//           >
//             <span className="w-6 h-px" style={{ background: ACCENT }} />
//             <span
//               className="text-xs font-bold uppercase tracking-[0.22em]"
//               style={{ color: ACCENT }}
//             >
//               Who We Are
//             </span>
//           </motion.div>

//           <div
//             className="overflow-hidden"
//             style={{ fontFamily: "'Bebas Neue', 'Anton', Impact, sans-serif" }}
//           >
//             <div className="text-[clamp(3.2rem,7vw,6.5rem)] leading-[0.88] text-white font-black">
//               <div className="overflow-hidden">
//                 <SplitReveal text="More Than" delay={0.05} stagger={0.05} />
//               </div>
//               <div className="overflow-hidden">
//                 <span style={{ color: ACCENT }}>
//                   <SplitReveal text="A Gym." delay={0.22} stagger={0.06} />
//                 </span>
//               </div>
//             </div>
//           </div>

//           <WordReveal
//             text={data.description}
//             className="text-zinc-400 text-base md:text-lg leading-[1.85] max-w-prose"
//             delay={0.08}
//           />

//           <motion.button
//             className="inline-flex items-center gap-4 group"
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.5, duration: 0.6 }}
//             whileHover={{ x: 5 }}
//           >
//             <span
//               className="px-7 py-3.5 rounded-full text-white text-sm font-bold uppercase tracking-widest"
//               style={{ background: ACCENT }}
//             >
//               Start Your Journey
//             </span>
//             <motion.div
//               animate={{ x: [0, 6, 0] }}
//               transition={{
//                 duration: 1.5,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             >
//               <ArrowRight className="w-5 h-5" style={{ color: ACCENT }} />
//             </motion.div>
//           </motion.button>
//         </div>

//         {/* RIGHT IMAGE with parallax */}
//         <div className="relative h-[480px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-2xl order-1 lg:order-2">
//           <motion.img
//             src={data.image}
//             alt="About"
//             className="w-full h-[130%] object-cover object-center"
//             style={{ y: imgY, willChange: "transform" }}
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />

//           {/* floating stats chip */}
//           <motion.div
//             className="absolute bottom-7 left-7 right-7 flex items-center justify-between bg-black/75 backdrop-blur-md border border-zinc-800 rounded-xl px-6 py-4"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.7, delay: 0.4 }}
//           >
//             {[
//               { label: "Members", value: "1,200+" },
//               { label: "Success Rate", value: "85%" },
//               { label: "Classes/Wk", value: "45+" },
//             ].map((item, i) => (
//               <React.Fragment key={item.label}>
//                 {i > 0 && (
//                   <Separator
//                     orientation="vertical"
//                     className="h-8 bg-zinc-700"
//                   />
//                 )}
//                 <div className="text-center">
//                   <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-0.5">
//                     {item.label}
//                   </p>
//                   <p className="text-white font-black text-lg leading-none">
//                     {item.value}
//                   </p>
//                 </div>
//               </React.Fragment>
//             ))}
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// /* ════════════════════════════════════════════════════
//    STATS SECTION
// ════════════════════════════════════════════════════ */
// const StatsSection = ({ stats }) => (
//   <section className="bg-zinc-950 px-8 md:px-20 py-24">
//     <div className="mb-14">
//       <motion.div
//         className="flex items-center gap-3 mb-5"
//         initial={{ opacity: 0, x: -14 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.5 }}
//       >
//         <span className="w-6 h-px" style={{ background: ACCENT }} />
//         <span
//           className="text-xs font-bold uppercase tracking-[0.22em]"
//           style={{ color: ACCENT }}
//         >
//           By the Numbers
//         </span>
//       </motion.div>
//       <div style={{ fontFamily: "'Bebas Neue', 'Anton', Impact, sans-serif" }}>
//         <div className="text-[clamp(3rem,6vw,5rem)] leading-[0.9] text-white font-black">
//           <SplitReveal text="Real " delay={0.05} stagger={0.07} />
//           <span style={{ color: ACCENT }}>
//             <SplitReveal text="Results." delay={0.22} stagger={0.07} />
//           </span>
//         </div>
//       </div>
//     </div>
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
//       {stats.map((stat, i) => (
//         <StatCard key={stat._id} stat={stat} index={i} />
//       ))}
//     </div>
//   </section>
// );

// /* ════════════════════════════════════════════════════
//    MISSION + VISION
// ════════════════════════════════════════════════════ */
// const MissionVisionSection = ({ mission, vision }) => (
//   <section className="bg-black px-8 md:px-20 py-24 md:py-40">
//     <div className="grid md:grid-cols-2 gap-4">
//       {/* MISSION — dark card */}
//       <motion.div
//         className="relative overflow-hidden rounded-2xl p-10 md:p-16 border border-zinc-800 group"
//         initial={{ opacity: 0, x: -40 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         viewport={{ once: true, margin: "-60px" }}
//         transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//       >
//         <div
//           className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
//           style={{
//             background: `radial-gradient(ellipse at 20% 50%, ${ACCENT}0E, transparent 70%)`,
//           }}
//         />
//         <div className="relative z-10 space-y-7">
//           <div className="flex items-center gap-3">
//             <div
//               className="w-9 h-9 rounded-xl flex items-center justify-center"
//               style={{
//                 background: `${ACCENT}1A`,
//                 border: `1px solid ${ACCENT}38`,
//               }}
//             >
//               <Target className="w-4 h-4" style={{ color: ACCENT }} />
//             </div>
//             <span
//               className="text-xs font-bold uppercase tracking-[0.22em]"
//               style={{ color: ACCENT }}
//             >
//               Mission
//             </span>
//           </div>
//           <div
//             style={{ fontFamily: "'Bebas Neue', 'Anton', Impact, sans-serif" }}
//           >
//             <div className="text-[clamp(2.8rem,4.5vw,4rem)] leading-[0.9] text-white font-black">
//               <div className="overflow-hidden">
//                 <SplitReveal text="Our" delay={0.05} stagger={0.06} />
//               </div>
//               <div className="overflow-hidden">
//                 <SplitReveal text="Purpose." delay={0.18} stagger={0.06} />
//               </div>
//             </div>
//           </div>
//           <WordReveal
//             text={mission}
//             className="text-zinc-400 text-base leading-[1.8] max-w-sm"
//             delay={0.1}
//           />
//         </div>
//       </motion.div>

//       {/* VISION — accent card */}
//       <motion.div
//         className="relative overflow-hidden rounded-2xl p-10 md:p-16 group"
//         style={{ background: ACCENT }}
//         initial={{ opacity: 0, x: 40 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         viewport={{ once: true, margin: "-60px" }}
//         transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//       >
//         <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-black/10 blur-3xl pointer-events-none" />
//         <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-black/10 blur-2xl pointer-events-none" />
//         <div className="relative z-10 space-y-7">
//           <div className="flex items-center gap-3">
//             <div className="w-9 h-9 rounded-xl bg-black/20 border border-black/20 flex items-center justify-center">
//               <Eye className="w-4 h-4 text-white" />
//             </div>
//             <span className="text-xs font-bold uppercase tracking-[0.22em] text-black/60">
//               Vision
//             </span>
//           </div>
//           <div
//             style={{ fontFamily: "'Bebas Neue', 'Anton', Impact, sans-serif" }}
//           >
//             <div className="text-[clamp(2.8rem,4.5vw,4rem)] leading-[0.9] text-black font-black">
//               <div className="overflow-hidden">
//                 <SplitReveal text="Where" delay={0.05} stagger={0.06} />
//               </div>
//               <div className="overflow-hidden">
//                 <SplitReveal text="We're" delay={0.17} stagger={0.06} />
//               </div>
//               <div className="overflow-hidden">
//                 <SplitReveal text="Headed." delay={0.29} stagger={0.06} />
//               </div>
//             </div>
//           </div>
//           <WordReveal
//             text={vision}
//             className="text-black/70 text-base leading-[1.8] max-w-sm"
//             delay={0.1}
//           />
//         </div>
//       </motion.div>
//     </div>
//   </section>
// );

// /* ════════════════════════════════════════════════════
//    FOOTER META
// ════════════════════════════════════════════════════ */
// const FooterMeta = ({ updatedAt, isActive }) => (
//   <motion.div
//     className="bg-zinc-950 border-t border-zinc-900 px-8 md:px-20 py-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
//     initial={{ opacity: 0 }}
//     whileInView={{ opacity: 1 }}
//     viewport={{ once: true }}
//     transition={{ duration: 0.6 }}
//   >
//     <span className="text-zinc-600 text-xs uppercase tracking-widest">
//       Last updated:{" "}
//       {new Date(updatedAt).toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       })}
//     </span>
//     <div className="flex items-center gap-2">
//       <span
//         className={`w-2 h-2 rounded-full ${isActive ? "animate-pulse" : ""}`}
//         style={{ background: isActive ? ACCENT : "#3f3f46" }}
//       />
//       <span className="text-zinc-600 text-xs uppercase tracking-widest">
//         {isActive ? "Active" : "Inactive"}
//       </span>
//     </div>
//   </motion.div>
// );

// /* ════════════════════════════════════════════════════
//    ROOT
// ════════════════════════════════════════════════════ */
// const About = () => {
//   const [data, setData] = useState(null);
//   const [status, setStatus] = useState("loading");

//   const fetchData = () => {
//     setStatus("loading");
//     AboutApi.getAbout()
//       .then((res) => {
//         setData(res.data);
//         setStatus("success");
//       })
//       .catch((err) => {
//         console.error("Fetch error:", err);
//         setStatus("error");
//       });
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   if (status === "loading") return <AboutSkeleton />;
//   if (status === "error") return <AboutError onRetry={fetchData} />;

//   return (
//     <AnimatePresence mode="wait">
//       <motion.div
//         key="about"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 0.4 }}
//         className="bg-black"
//         style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
//       >
//         {/* 1 · HERO — black seam overlay + parallax image + parallax text */}
//         <HeroSection data={data} />

//         {/* 2 · TICKER 1 */}
//         <div className="border-y border-zinc-900 py-5 overflow-hidden bg-black">
//           <MarqueeRow
//             text="FITNESS · COMMUNITY · STRENGTH · WELLNESS · PERFORMANCE · RESULTS"
//             speed={38}
//             direction={1}
//             className="text-zinc-700 text-xs font-bold uppercase tracking-[0.25em]"
//           />
//         </div>

//         {/* 3 · ABOUT BODY */}
//         <BodySection data={data} />

//         {/* 4 · STATS */}
//         <StatsSection stats={data.stats} />

//         {/* 5 · TICKER 2 — reversed */}
//         <div className="border-y border-zinc-900 py-5 overflow-hidden bg-zinc-950">
//           <MarqueeRow
//             text="TRANSFORM · ELEVATE · PUSH HARDER · BREAK LIMITS · ACHIEVE MORE"
//             speed={42}
//             direction={-1}
//             className="text-zinc-800 text-xs font-bold uppercase tracking-[0.25em]"
//           />
//         </div>

//         {/* 6 · MISSION + VISION */}
//         <MissionVisionSection mission={data.mission} vision={data.vision} />

//         {/* 7 · FOOTER META */}
//         <FooterMeta updatedAt={data.updatedAt} isActive={data.isActive} />
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default About;

// UI 03
"use client";
import React, { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════
   DESIGN TOKENS — Raw Industrial Luxury
═══════════════════════════════════════════ */
const C = {
  bg: "#0A0A0A",
  surface: "#111111",
  card: "#161616",
  ink: "#F0EDE8",
  muted: "#6A6A6A",
  rule: "#222222",
  accent: "#C8FF00", // electric lime — gym energy
  red: "#FF3333",
};

/* ═══════════════════════════════════════════
   IMAGES — replace with your actual assets
═══════════════════════════════════════════ */
const IMGS = {
  hero: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=80",
  bodybuilding:
    "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=700&q=80",
  olympic:
    "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=700&q=80",
  strength:
    "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=700&q=80",
};

/* ═══════════════════════════════════════════
   STATIC DATA (replace with API call)
═══════════════════════════════════════════ */
const ABOUT = {
  title: "Unit 45 Fitness",
  tagline: "Welcome to the most premium gym in Kochi",
  description: `Unit 45 Fitness contains best-in-class cardio, strength, and stretch equipment. The only gym in Kochi to provide Steam, Sauna and Ice Bath facilities. Our Active IQ UK qualified personal trainers are ready to help you start your journey to health and wellness right now!`,
  mission:
    "To evolve a brand that educates people about the importance of health and fitness and how it is beneficial for their life.",
  vision:
    "We won't compromise on anything less. Our trainers are internationally qualified with world-class fitness equipment. Services at the premium level — we guarantee your results.",
  values:
    "Introducing a whole new international level of fitness concepts to Kerala. Move Better. Feel Better. Live Better.",
  stats: [
    { value: "2000+", label: "Active Members" },
    { value: "15+", label: "Elite Trainers" },
    { value: "90", label: "Day Transformation" },
    { value: "3", label: "Exclusive Facilities" },
  ],
  programs: [
    "Powerlifting",
    "Weightlifting",
    "Bodybuilding",
    "Boxing",
    "Sports Nutrition",
    "Injury Rehab",
  ],
};

/* ═══════════════════════════════════════════
   HOOK: useIntersection
═══════════════════════════════════════════ */
function useIntersection(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "-40px", ...options },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ═══════════════════════════════════════════
   HOOK: useCounter
═══════════════════════════════════════════ */
function useCounter(value, active) {
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!active) return;
    const match = value.match(/^([0-9,]+)(.*)/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const num = parseInt(match[1].replace(/,/g, ""), 10);
    const suffix = match[2];
    let frame = 0,
      total = 70;
    const id = setInterval(() => {
      frame++;
      const t = frame / total;
      const eased = 1 - Math.pow(1 - t, 3);
      const cur = Math.round(eased * num);
      setDisplay(`${cur.toLocaleString()}${suffix}`);
      if (frame >= total) {
        setDisplay(value);
        clearInterval(id);
      }
    }, 14);
    return () => clearInterval(id);
  }, [active, value]);
  return display;
}

/* ═══════════════════════════════════════════
   SPLIT TEXT REVEAL
═══════════════════════════════════════════ */
const SplitReveal = ({ text, delay = 0, style = {}, className = "" }) => {
  const [ref, visible] = useIntersection();
  return (
    <span
      ref={ref}
      className={className}
      style={{ display: "inline-block", ...style }}
      aria-label={text}
    >
      {text.split("").map((ch, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            transform: visible ? "translateY(0)" : "translateY(110%)",
            opacity: visible ? 1 : 0,
            transition: `transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay + i * 0.04}s, opacity 0.5s ease ${delay + i * 0.04}s`,
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
};

/* ═══════════════════════════════════════════
   MAGNETIC BUTTON
═══════════════════════════════════════════ */
const MagneticBtn = ({ children, onClick }) => {
  const el = useRef(null);
  const handleMove = (e) => {
    const r = el.current.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.current.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
  };
  const handleLeave = () => {
    el.current.style.transform = "translate(0,0)";
  };
  return (
    <div
      ref={el}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={{
        display: "inline-block",
        transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
        cursor: "pointer",
      }}
    >
      {children}
    </div>
  );
};

/* ═══════════════════════════════════════════
   CUSTOM CURSOR DOT
═══════════════════════════════════════════ */
const CursorDot = () => {
  const dot = useRef(null);
  const ring = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", move);
    let raf;
    const loop = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      if (dot.current) {
        dot.current.style.left = `${pos.current.x}px`;
        dot.current.style.top = `${pos.current.y}px`;
      }
      if (ring.current) {
        ring.current.style.left = `${ringPos.current.x}px`;
        ring.current.style.top = `${ringPos.current.y}px`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 9999,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: C.accent,
          transform: "translate(-50%,-50%)",
          top: 0,
          left: 0,
        }}
      />
      <div
        ref={ring}
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 9998,
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: `1px solid ${C.accent}55`,
          transform: "translate(-50%,-50%)",
          top: 0,
          left: 0,
          transition: "width 0.3s, height 0.3s, border-color 0.3s",
        }}
      />
    </>
  );
};

/* ═══════════════════════════════════════════
   MARQUEE TICKER
═══════════════════════════════════════════ */
const Ticker = ({ items }) => (
  <div
    style={{
      overflow: "hidden",
      background: C.accent,
      padding: "12px 0",
      position: "relative",
    }}
  >
    <div
      style={{
        display: "flex",
        gap: 48,
        animation: "tickerScroll 22s linear infinite",
        whiteSpace: "nowrap",
      }}
    >
      {[...items, ...items, ...items].map((item, i) => (
        <span
          key={i}
          style={{
            fontSize: 11,
            fontFamily: "'Courier New', monospace",
            fontWeight: 700,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: C.bg,
            flexShrink: 0,
          }}
        >
          {item} <span style={{ color: "#00000066", margin: "0 8px" }}>◆</span>
        </span>
      ))}
    </div>
    <style>{`
      @keyframes tickerScroll {
        from { transform: translateX(0); }
        to   { transform: translateX(-33.333%); }
      }
    `}</style>
  </div>
);

/* ═══════════════════════════════════════════
   HERO SECTION
═══════════════════════════════════════════ */
const Hero = ({ data }) => {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        background: C.bg,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Parallax image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translateY(${scrollY * 0.3}px)`,
          willChange: "transform",
        }}
      >
        <img
          src={data.hero}
          alt="gym"
          style={{
            width: "100%",
            height: "115%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        {/* Dramatic overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.7) 50%, rgba(10,10,10,0.85) 100%)",
          }}
        />
        {/* Noise grain texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.04,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Top bar */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "28px 48px",
          borderBottom: `1px solid ${C.rule}`,
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(-12px)",
          transition: "all 0.7s ease",
        }}
      >
        <span
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 11,
            letterSpacing: "0.35em",
            color: C.muted,
            textTransform: "uppercase",
          }}
        >
          — {data.title}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: C.accent,
              animation: "pulse 2s infinite",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 11,
              letterSpacing: "0.3em",
              color: C.muted,
              textTransform: "uppercase",
            }}
          >
            Kochi · Est. 2018
          </span>
        </div>
      </div>

      {/* Main hero content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr auto",
          alignItems: "end",
          padding: "0 48px 64px",
          gap: 48,
        }}
      >
        {/* Left — giant headline */}
        <div>
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 32,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateX(0)" : "translateX(-20px)",
              transition: "all 0.6s ease 0.3s",
            }}
          >
            <div style={{ width: 40, height: 1, background: C.accent }} />
            <span
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 10,
                letterSpacing: "0.4em",
                color: C.accent,
                textTransform: "uppercase",
              }}
            >
              Premium Fitness · Kochi
            </span>
          </div>

          {/* Giant headline */}
          <h1
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontSize: "clamp(4rem, 11vw, 10rem)",
              fontWeight: 900,
              lineHeight: 0.88,
              letterSpacing: "-0.02em",
              color: C.ink,
              marginBottom: 40,
            }}
          >
            <div style={{ overflow: "hidden" }}>
              <SplitReveal text="Welcome" delay={0.4} />
            </div>
            <div style={{ overflow: "hidden" }}>
              <SplitReveal
                text="To The"
                delay={0.55}
                style={{ color: C.muted, fontStyle: "italic" }}
              />
            </div>
            <div
              style={{
                overflow: "hidden",
                display: "flex",
                alignItems: "baseline",
                gap: 12,
              }}
            >
              <SplitReveal text="Grind" delay={0.7} />
              <span style={{ color: C.accent }}>.</span>
            </div>
          </h1>

          {/* Subline */}
          <p
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
              color: C.muted,
              maxWidth: 480,
              lineHeight: 1.75,
              marginBottom: 48,
              opacity: mounted ? 1 : 0,
              transition: "opacity 0.8s ease 1.2s",
            }}
          >
            {data.tagline} — where internationally certified trainers,
            world-class equipment, and elite community converge.
          </p>

          {/* CTA row */}
          <div
            style={{
              display: "flex",
              gap: 20,
              flexWrap: "wrap",
              alignItems: "center",
              opacity: mounted ? 1 : 0,
              transition: "opacity 0.8s ease 1.4s",
            }}
          >
            <MagneticBtn>
              <button
                style={{
                  padding: "16px 36px",
                  borderRadius: 2,
                  background: C.accent,
                  color: C.bg,
                  fontFamily: "'Courier New', monospace",
                  fontSize: 11,
                  letterSpacing: "0.3em",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Begin Journey →
              </button>
            </MagneticBtn>
            <MagneticBtn>
              <button
                style={{
                  padding: "15px 36px",
                  borderRadius: 2,
                  background: "transparent",
                  color: C.ink,
                  fontFamily: "'Courier New', monospace",
                  fontSize: 11,
                  letterSpacing: "0.3em",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  border: `1px solid ${C.rule}`,
                  cursor: "pointer",
                }}
              >
                Our Programs
              </button>
            </MagneticBtn>
          </div>
        </div>

        {/* Right — vertical label */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.8s ease 1.6s",
          }}
        >
          <div
            style={{
              height: 80,
              width: 1,
              background: `linear-gradient(to bottom, ${C.accent}, transparent)`,
            }}
          />
          <span
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 9,
              letterSpacing: "0.4em",
              color: C.muted,
              textTransform: "uppercase",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            Scroll to explore
          </span>
        </div>
      </div>

      {/* Bottom left corner decoration */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          zIndex: 5,
          width: 160,
          height: 160,
          border: `1px solid ${C.rule}`,
          borderTop: "none",
          borderLeft: "none",
          opacity: 0.3,
        }}
      />

      <style>{`
        @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.3 } }
      `}</style>
    </section>
  );
};

/* ═══════════════════════════════════════════
   STATS SECTION
═══════════════════════════════════════════ */
const StatCard = ({ stat, index }) => {
  const [ref, visible] = useIntersection();
  const count = useCounter(stat.value, visible);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "48px 40px",
        position: "relative",
        overflow: "hidden",
        borderRight: index < 3 ? `1px solid ${C.rule}` : "none",
        background: hovered ? C.accent : "transparent",
        transition: "background 0.5s cubic-bezier(0.22,1,0.36,1)",
        cursor: "default",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transitionProperty: "opacity, transform, background",
        transitionDuration: "0.7s, 0.7s, 0.5s",
        transitionDelay: `${index * 0.1}s, ${index * 0.1}s, 0s`,
        transitionTimingFunction:
          "cubic-bezier(0.22,1,0.36,1), cubic-bezier(0.22,1,0.36,1), ease",
      }}
    >
      {/* Index */}
      <div
        style={{
          fontFamily: "'Courier New', monospace",
          fontSize: 10,
          color: hovered ? C.bg + "66" : C.rule,
          letterSpacing: "0.3em",
          marginBottom: 24,
          transition: "color 0.4s ease",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Big number */}
      <div
        style={{
          fontFamily: "'Georgia', serif",
          fontSize: "clamp(2.5rem, 4vw, 4rem)",
          fontWeight: 900,
          color: hovered ? C.bg : C.ink,
          lineHeight: 1,
          marginBottom: 12,
          transition: "color 0.4s ease",
        }}
      >
        {count}
      </div>

      {/* Label */}
      <div
        style={{
          fontFamily: "'Courier New', monospace",
          fontSize: 10,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: hovered ? C.bg + "88" : C.muted,
          transition: "color 0.4s ease",
        }}
      >
        {stat.label}
      </div>

      {/* Arrow on hover */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          right: 24,
          fontFamily: "'Courier New', monospace",
          fontSize: 18,
          color: C.bg,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translate(0,0)" : "translate(8px, 8px)",
          transition: "all 0.3s ease",
        }}
      >
        ↗
      </div>
    </div>
  );
};

const StatsSection = ({ stats }) => (
  <section
    style={{
      background: C.bg,
      borderTop: `1px solid ${C.rule}`,
      borderBottom: `1px solid ${C.rule}`,
    }}
  >
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)`,
      }}
    >
      {stats.map((s, i) => (
        <StatCard key={i} stat={s} index={i} />
      ))}
    </div>
  </section>
);

/* ═══════════════════════════════════════════
   DESCRIPTION SECTION
═══════════════════════════════════════════ */
const DescriptionSection = ({ data }) => {
  const [ref, visible] = useIntersection();
  return (
    <section
      style={{ background: C.surface, borderBottom: `1px solid ${C.rule}` }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        {/* LEFT — image with overlay text */}
        <div
          style={{ position: "relative", minHeight: 560, overflow: "hidden" }}
        >
          <img
            src={data.bodybuilding}
            alt="training"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: visible ? "scale(1)" : "scale(1.08)",
              transition: "transform 1.2s cubic-bezier(0.22,1,0.36,1)",
              position: "absolute",
              inset: 0,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.15) 100%)",
            }}
          />
          {/* Corner tag */}
          <div
            style={{
              position: "absolute",
              bottom: 32,
              left: 32,
              border: `1px solid ${C.accent}44`,
              padding: "10px 20px",
              fontFamily: "'Courier New', monospace",
              fontSize: 10,
              letterSpacing: "0.3em",
              color: C.accent,
              textTransform: "uppercase",
            }}
          >
            Est. 2018 · Kochi
          </div>
        </div>

        {/* RIGHT — content */}
        <div
          ref={ref}
          style={{
            padding: "80px 64px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 32,
            }}
          >
            <div style={{ width: 28, height: 1, background: C.accent }} />
            <span
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 10,
                letterSpacing: "0.4em",
                color: C.accent,
                textTransform: "uppercase",
              }}
            >
              Who We Are
            </span>
          </div>

          <h2
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
              fontWeight: 900,
              color: C.ink,
              lineHeight: 1.0,
              marginBottom: 32,
            }}
          >
            <div style={{ overflow: "hidden" }}>
              <SplitReveal text="More Than" delay={0.05} />
            </div>
            <div style={{ overflow: "hidden" }}>
              <SplitReveal
                text="A Gym."
                delay={0.2}
                style={{ color: C.muted, fontStyle: "italic" }}
              />
            </div>
          </h2>

          <p
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "1.05rem",
              color: C.muted,
              lineHeight: 1.9,
              marginBottom: 40,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s ease 0.4s",
            }}
          >
            {data.description}
          </p>

          {/* Programs tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {data.programs.map((p, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: 9,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  border: `1px solid ${C.rule}`,
                  color: C.muted,
                  padding: "6px 14px",
                  borderRadius: 1,
                  opacity: visible ? 1 : 0,
                  transition: `opacity 0.5s ease ${0.5 + i * 0.07}s`,
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════
   MVV CARD — Mission / Vision / Values
═══════════════════════════════════════════ */
const MVVCard = ({ title, text, image, accent, delay = 0 }) => {
  const [ref, visible] = useIntersection();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: 420,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(50px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        cursor: "default",
      }}
    >
      {/* Background image */}
      <img
        src={image}
        alt={title}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: hovered ? "scale(1.06)" : "scale(1)",
          transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1)",
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to top, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.6) 50%, rgba(10,10,10,0.2) 100%)`,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, padding: "40px 36px" }}>
        {/* Tag */}
        <div
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 9,
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: accent,
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div style={{ width: 16, height: 1, background: accent }} />
          {title}
        </div>

        {/* Text */}
        <p
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "0.95rem",
            color: "rgba(240,237,232,0.75)",
            lineHeight: 1.8,
            maxWidth: 320,
            maxHeight: hovered ? "200px" : "80px",
            overflow: "hidden",
            transition: "max-height 0.6s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {text}
        </p>

        {/* Reveal hint */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 20,
            opacity: hovered ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
        >
          <span
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 9,
              letterSpacing: "0.3em",
              color: C.muted,
              textTransform: "uppercase",
            }}
          >
            Hover to read more
          </span>
        </div>
      </div>

      {/* Accent bottom line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 2,
          background: accent,
          width: hovered ? "100%" : "0%",
          transition: "width 0.6s cubic-bezier(0.22,1,0.36,1)",
        }}
      />
    </div>
  );
};

/* ═══════════════════════════════════════════
   MVV SECTION
═══════════════════════════════════════════ */
const MVVSection = ({ data }) => (
  <section style={{ background: C.bg, borderBottom: `1px solid ${C.rule}` }}>
    {/* Header */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "28px 48px",
        borderBottom: `1px solid ${C.rule}`,
      }}
    >
      <span
        style={{
          fontFamily: "'Courier New', monospace",
          fontSize: 11,
          letterSpacing: "0.35em",
          color: C.muted,
          textTransform: "uppercase",
        }}
      >
        — Purpose & Direction
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 28, height: 1, background: C.rule }} />
        <span
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 9,
            letterSpacing: "0.3em",
            color: C.muted,
            textTransform: "uppercase",
          }}
        >
          03 Pillars
        </span>
      </div>
    </div>

    {/* 3-column grid */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 1,
        background: C.rule,
      }}
    >
      <MVVCard
        title="Mission"
        text={data.mission}
        image={data.bodybuilding}
        accent={C.accent}
        delay={0.1}
      />
      <MVVCard
        title="Vision"
        text={data.vision}
        image={data.olympic}
        accent="#FF6B35"
        delay={0.25}
      />
      <MVVCard
        title="Values"
        text={data.values}
        image={data.strength}
        accent="#C084FC"
        delay={0.4}
      />
    </div>
  </section>
);

/* ═══════════════════════════════════════════
   U-45/90 PROGRAM CTA
═══════════════════════════════════════════ */
const ProgramCTA = () => {
  const [ref, visible] = useIntersection();
  return (
    <section
      ref={ref}
      style={{
        background: C.surface,
        padding: "100px 48px",
        borderBottom: `1px solid ${C.rule}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Large decorative text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "'Georgia', serif",
          fontSize: "clamp(8rem, 18vw, 20rem)",
          fontWeight: 900,
          color: C.rule,
          whiteSpace: "nowrap",
          pointerEvents: "none",
          lineHeight: 1,
          opacity: 0.4,
          letterSpacing: "-0.03em",
        }}
      >
        U-45
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 680,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            marginBottom: 28,
          }}
        >
          <div style={{ flex: 1, height: 1, background: C.rule }} />
          <span
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 10,
              letterSpacing: "0.4em",
              color: C.accent,
              textTransform: "uppercase",
            }}
          >
            Signature Program
          </span>
          <div style={{ flex: 1, height: 1, background: C.rule }} />
        </div>

        <h2
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
            fontWeight: 900,
            color: C.ink,
            lineHeight: 1.0,
            marginBottom: 28,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          Transform in <span style={{ color: C.accent }}>90</span>
          <br />
          Days.
        </h2>

        <p
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "1.1rem",
            color: C.muted,
            lineHeight: 1.8,
            marginBottom: 48,
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.2s",
          }}
        >
          The U-45/90 program — specialized workouts and precision nutrition
          plans that transform your entire body. Whether fat loss, muscle gain,
          or general fitness, we deliver results in exactly 90 days.
        </p>

        <MagneticBtn>
          <button
            style={{
              padding: "18px 52px",
              background: C.accent,
              color: C.bg,
              fontFamily: "'Courier New', monospace",
              fontSize: 11,
              letterSpacing: "0.35em",
              fontWeight: 700,
              textTransform: "uppercase",
              border: "none",
              cursor: "pointer",
              borderRadius: 2,
              opacity: visible ? 1 : 0,
              transition: "opacity 0.8s ease 0.4s",
            }}
          >
            Start Your 90-Day Journey →
          </button>
        </MagneticBtn>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════
   FOOTER STRIP
═══════════════════════════════════════════ */
const FooterStrip = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 48px",
      background: C.bg,
      borderTop: `1px solid ${C.rule}`,
    }}
  >
    <span
      style={{
        fontFamily: "'Courier New', monospace",
        fontSize: 10,
        letterSpacing: "0.3em",
        color: C.muted,
        textTransform: "uppercase",
      }}
    >
      © 2024 Unit 45 Fitness · Kochi, Kerala
    </span>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: C.accent,
          display: "inline-block",
        }}
      />
      <span
        style={{
          fontFamily: "'Courier New', monospace",
          fontSize: 10,
          letterSpacing: "0.3em",
          color: C.muted,
          textTransform: "uppercase",
        }}
      >
        Active
      </span>
    </div>
  </div>
);

/* ═══════════════════════════════════════════
   ROOT
═══════════════════════════════════════════ */
const About = () => {
  const tickerItems = [
    "Powerlifting",
    "Weightlifting",
    "Bodybuilding",
    "Boxing",
    "Ice Bath",
    "Steam & Sauna",
    "Sports Nutrition",
    "Injury Rehab",
    "U-45/90 Program",
  ];

  const images = {
    hero: IMGS.hero,
    bodybuilding: IMGS.bodybuilding,
    olympic: IMGS.olympic,
    strength: IMGS.strength,
  };

  return (
    <div id="about" style={{ background: C.bg, fontFamily: "sans-serif" }}>
      <CursorDot />

      {/* 1 · HERO */}
      <Hero data={{ ...ABOUT, ...images }} />

      {/* 2 · TICKER */}
      <Ticker items={tickerItems} />

      {/* 3 · STATS */}
      <StatsSection stats={ABOUT.stats} />

      {/* 4 · DESCRIPTION */}
      <DescriptionSection data={{ ...ABOUT, ...images }} />

      {/* 5 · REVERSE TICKER */}
      <Ticker items={[...tickerItems].reverse()} />

      {/* 6 · MISSION / VISION / VALUES */}
      <MVVSection data={{ ...ABOUT, ...images }} />

      {/* 7 · 90-DAY CTA */}
      <ProgramCTA />

      {/* 8 · FOOTER */}
      <FooterStrip />
    </div>
  );
};

export default About;

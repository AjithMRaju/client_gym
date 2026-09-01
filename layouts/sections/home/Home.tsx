"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LandingApi } from "@/api/hero/heroApi";
import { RevealText } from "@/animations/RevealText/animation";
import { HeroLoading } from "@/common/loadings/heroLoading/HeroLoading";

interface HeroData {
  _id: string;
  heading: string;
  subheading: string;
  mediaType: "video" | "image";
  backgroundVideo?: string;
  backgroundImage?: string;
  ctaText: string;
  ctaLink: string;
}

const Home = () => {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // 1. Fake progress bar logic for UX
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    // 2. Fetch Data
    LandingApi.getHeroData()
      .then((res) => {
        if (res.success) {
          setHeroData(res.data);
        }
      })
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => {
        // Ensure progress hits 100 before we hide the loader
        setTimeout(() => setLoading(false), 1000);
      });

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AnimatePresence>
        {/* {loading && <HeroLoading onComplete={() => setLoaded(true)} />} */}
        {loading && <HeroLoading progress={progress} />}
      </AnimatePresence>

      {heroData && (
        <section className="relative h-screen w-full overflow-hidden bg-black text-white">
          {/* Conditional Rendering: Video vs Image */}
          {heroData.mediaType === "video" ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover opacity-60"
            >
              <source src={heroData.backgroundVideo} type="video/mp4" />
            </video>
          ) : (
            <img
              src={heroData.backgroundImage}
              alt="Hero background"
              className="absolute inset-0 h-full w-full object-cover opacity-60"
            />
          )}

          {/* Content Overlay */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <RevealText delay={1.5}>
              {" "}
              {/* Slightly higher delay to wait for loader exit */}
              <h1 className="max-w-6xl text-2xl font-extrabold uppercase tracking-tighter md:text-7xl">
                {heroData.heading}
              </h1>
            </RevealText>

            <RevealText delay={1.7}>
              <p className="mt-4 max-w-2xl text-lg text-slate-300 md:text-xl">
                {heroData.subheading}
              </p>
            </RevealText>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <button className="group/button mt-5 cursor-pointer relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gray-800/30 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xs hover:shadow-gray-600/50 border border-white/20">
                <span className="text-lg"> {heroData.ctaText}</span>
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                  <div className="relative h-full w-10 bg-white/20"></div>
                </div>
              </button>
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
};

export default Home;

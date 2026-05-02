"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// import { useNavbar } from "@/Context/NavbarContext";
import { usePathname, useRouter } from "next/navigation";
import { HouseIcon, XIcon } from "@phosphor-icons/react";

const Navbar = () => {
  const [isNavOpen, setIsnavopen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileNavVisibel, setIsMobilenav] = useState(true);

  //   const { isNavbarEnabled, setIsNavbarEnabled, footerRef } = useNavbar();
  const pathname = usePathname();
  const router = useRouter();

  const navLink = [
    { title: "Home", path: "/", id: "home" },
    { title: "About", path: "/about", id: "about" },
    { title: "Services", path: "/services", id: "services" },
    { title: "Gallery", path: "/gallery", id: "gallery" },
    { title: "Blogs", path: "/blogs", id: "blogs" },
    { title: "Contact", path: "/contact", id: "contact" },
  ];

  const navLinkMobile = [
    { title: "About", path: "/about", id: "about" },
    { title: "Services", path: "/services", id: "services" },
    { title: "Gallery", path: "/gallery", id: "gallery" },
    { title: "Blogs", path: "/blogs", id: "blogs" },
    { title: "Contact", path: "/contact", id: "contact" },
  ];

  const handleNavigation = (section) => {
    setIsnavopen(false);
    if (pathname === "/") {
      setTimeout(() => {
        const element = document.getElementById(section.id);
        if (element) {
          const yOffset = -100;
          const y =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    } else {
      router.push(section.path);
    }
  };

  const handleHomeNavigation = () => {
    setIsnavopen(false);
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  // Move lastScrollY inside the component or use useRef
  const lastScrollY = useRef(0);

  // FOR NAVBAR IN LARGE DEVICES - fixed with useCallback
  useEffect(() => {
    const handleScrollWithRef = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY.current) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScrollWithRef);
    return () => window.removeEventListener("scroll", handleScrollWithRef);
  }, []);

  // FOR NAVBAR IN MOBILE DEVICES - fixed dependency array
  useEffect(() => {
    const handleScrollMobile = () => {
      if (footerRef.current) {
        const footerTop = footerRef.current.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;
        if (footerTop <= viewportHeight) {
          setIsMobilenav(false);
        } else {
          setIsMobilenav(true);
        }
      }
    };
    window.addEventListener("scroll", handleScrollMobile);
    return () => window.removeEventListener("scroll", handleScrollMobile);
  }, []); // Added footerRef to dependency array

  return (
    <main>
      {/* ── FLOATING MENU PILL ── */}
      <AnimatePresence>
        {isMobileNavVisibel && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={() => setIsnavopen(!isNavOpen)}
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[999] w-[170px] h-14 rounded-full p-0 overflow-hidden cursor-pointer
                       bg-[#080808]/78 backdrop-blur-[20px] saturate-[180%]
                       border border-white/10 shadow-[0_8px_36px_rgba(0,0,0,0.55),0_2px_8px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.07)]
                       hover:border-white/20 hover:shadow-[0_14px_48px_rgba(0,0,0,0.65),0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]
                       transition-all duration-350 ease-in-out
                       before:content-[''] before:absolute before:top-0 before:left-[18%] before:right-[18%] before:h-[1px] 
                       before:bg-gradient-to-r before:from-transparent before:via-[#0791b2]/75 before:to-transparent before:z-10"
          >
            <div className="w-full h-full flex items-center justify-center px-5 relative z-20">
              {isNavOpen ? (
                /* HOME — when menu is open */
                <div
                  className="w-full text-center cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleHomeNavigation();
                  }}
                >
                  <motion.h1
                    className="mb-0 text-white  text-[1.55rem] leading-none text-center w-full"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    Home
                  </motion.h1>
                </div>
              ) : (
                /* MENU — resting */
                <div className="flex items-center justify-center gap-3">
                  <span className="w-[30px] h-[30px] rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-[#0791b2]/10 group-hover:border-[#0791b2]/35">
                    <HouseIcon size={18} className="text-white" />
                  </span>
                  <h1 className="mb-0 text-white  text-[1.55rem] leading-none">
                    Menu
                  </h1>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SUBMENU PANEL ── */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onMouseLeave={() => setIsnavopen(false)}
            className="fixed bottom-[88px] left-1/2 -translate-x-1/2 z-[998] w-[230px] h-auto rounded-[26px] py-[18px] px-[14px] pb-4
                       bg-[#080808]/85 backdrop-blur-[28px] saturate-[200%]
                       border border-white/11 shadow-[0_28px_72px_rgba(0,0,0,0.7),0_6px_20px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.07)]
                       overflow-hidden
                       before:content-[''] before:absolute before:top-0 before:left-[14%] before:right-[14%] before:h-[1px]
                       before:bg-gradient-to-r before:from-transparent before:via-[#0791b2]/55 before:to-transparent before:z-10"
          >
            <div className="w-full flex flex-col items-center gap-[2px] relative z-20">
              {navLinkMobile.map((links, i) => (
                <React.Fragment key={i}>
                  <motion.div
                    className="group relative w-full flex items-center justify-center rounded-[14px] cursor-pointer overflow-hidden transition-colors duration-250 hover:bg-white/5"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.26,
                      ease: [0.22, 1, 0.36, 1],
                      delay: i * 0.048,
                    }}
                    onClick={() => handleNavigation(links)}
                  >
                    {/* Slide-in fill */}
                    <div className="absolute inset-0 bg-white/5 scale-x-0 origin-left transition-transform duration-[320ms] ease-[cubic-bezier(0.77,0,0.18,1)] group-hover:scale-x-100" />

                    {/* Left indicator dot */}
                    <span className="absolute left-[10px] w-1 h-1 rounded-full bg-transparent transition-all duration-250 group-hover:bg-[#0791b2]/85 group-hover:scale-[1.3]" />

                    <h1 className="relative z-10 text-white  text-[1.5rem] pt-1.5 mb-0 px-3 transition-colors duration-250">
                      {links.title}
                    </h1>

                    {/* Right index number */}
                    <span className="absolute right-3  text-[0.5rem] tracking-[0.15em] text-white/15 transition-colors duration-250 group-hover:text-[#0791b2]/55">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </motion.div>

                  {i < navLinkMobile.length - 1 && (
                    <div className="w-3/4 h-[1px] bg-white/5 my-[1px] shrink-0" />
                  )}
                </React.Fragment>
              ))}

              {/* Close button */}
              <motion.div
                className="w-[34px] h-[34px] rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer mt-[10px] text-white transition-all duration-300 hover:bg-white/15 hover:border-white/25 hover:rotate-90"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.28,
                  ease: "easeInOut",
                  delay: navLinkMobile.length * 0.048,
                }}
                onClick={() => setIsnavopen(false)}
              >
                <XIcon size={20} />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Navbar;

import { motion } from "framer-motion";

// Reusable reveal wrapper
export const RevealText = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <div style={{ overflow: "hidden" }}>
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: "0%", opacity: 1 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1], // expo out — snappy but smooth
      }}
    >
      {children}
    </motion.div>
  </div>
);

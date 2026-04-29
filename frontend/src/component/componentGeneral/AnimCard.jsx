import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function AnimCard({ children, once = true }) {
  const delay = 700;
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.12 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay: delay / 1000, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

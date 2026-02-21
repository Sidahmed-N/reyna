import { motion } from "framer-motion";

interface Props {
  onNext: () => void;
}

const LandingScreen = ({ onNext }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 flex flex-col items-center justify-center z-10 px-4"
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="font-mono text-sm text-muted-foreground mb-6 tracking-widest uppercase"
      >
        // system scan initiated
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="glitch-text text-5xl md:text-7xl font-display font-bold neon-text text-primary mb-4 text-center"
        data-text="Reyna Main Detected."
      >
        Reyna Main Detected.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="font-mono text-muted-foreground text-sm md:text-base mb-12"
      >
        Running compatibility diagnostics...
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="px-8 py-3 rounded-lg font-display font-semibold text-lg text-primary-foreground bg-primary/80 neon-border backdrop-blur-sm hover:bg-primary transition-colors"
      >
        Begin Scan
      </motion.button>
    </motion.div>
  );
};

export default LandingScreen;

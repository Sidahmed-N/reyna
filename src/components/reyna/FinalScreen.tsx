import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

interface Props {
  ending: "happy" | "other";
}

const FinalScreen = ({ ending }: Props) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (ending === "happy" && showContent) {
      const duration = 4000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#8B5CF6", "#EC4899", "#A78BFA"],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#8B5CF6", "#EC4899", "#A78BFA"],
        });

        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
  }, [ending, showContent]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 flex flex-col items-center justify-center z-10 px-4"
    >
      {!showContent && (
        <div className="glitch-text text-4xl font-display font-bold text-primary" data-text="///">
          ///
        </div>
      )}

      {showContent && ending === "happy" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="font-mono text-sm text-primary mb-4 text-flicker tracking-widest">
            CORRECT ANSWER DETECTED
          </p>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6 neon-text">
            Good.
          </h1>
          <p className="text-xl md:text-2xl font-display text-muted-foreground">
            Because I was going to keep liking you anyway.
          </p>
        </motion.div>
      )}

      {showContent && ending === "other" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-xl md:text-2xl font-display text-muted-foreground mb-4">
            Thank you for going through this.
          </p>
          <p className="text-lg font-display text-muted-foreground/70">
            I'm glad I built this for you, Assia.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FinalScreen;

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Props {
  answers: Record<string, string>;
  onComplete: () => void;
}

const AnalysisScreen = ({ onComplete }: Props) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (phase === 0) {
      const timer = setTimeout(() => setPhase(1), 3500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const results = [
    { label: "Reyna Energy", value: "98%" },
    { label: "Confidence Level", value: "Extremely High" },
    { label: "Intimidation Rating", value: "Dangerous" },
  ];

  const personalResults = [
    { label: "Birthday Patch", value: "Elite Release" },
    { label: "Height Classification", value: "Dominant Presence" },
    { label: "Eye Color", value: "Critical Damage Bonus" },
    { label: "Favorite Color", value: "Synced" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex flex-col items-center justify-center z-10 px-4"
    >
      {phase === 0 && (
        <motion.div className="flex flex-col items-center w-full max-w-md">
          <div
            className="glitch-text text-2xl font-display font-bold text-primary mb-8"
            data-text="Analyzing..."
          >
            Analyzing...
          </div>
          <div className="w-full h-2 bg-secondary/50 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full loading-bar-fill" />
          </div>
          <p className="font-mono text-xs text-muted-foreground mt-4 tracking-widest">
            PROCESSING AGENT DATA...
          </p>
        </motion.div>
      )}

      {phase === 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center w-full max-w-lg"
        >
          <div
            className="glitch-text text-3xl md:text-4xl font-display font-bold text-primary mb-8 text-flicker"
            data-text="Analysis Complete."
          >
            Analysis Complete.
          </div>

          <div className="space-y-3 w-full mb-6">
            {results.map((r, i) => (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.3 }}
                className="flex justify-between items-center px-6 py-3 bg-secondary/30 rounded-lg border border-primary/20 backdrop-blur-sm"
              >
                <span className="font-mono text-sm text-muted-foreground">
                  {r.label}
                </span>
                <span className="font-display font-bold text-primary">
                  {r.value}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="w-full h-px bg-primary/20 my-4" />

          <div className="space-y-3 w-full">
            {personalResults.map((r, i) => (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.3 }}
                className="flex justify-between items-center px-6 py-3 bg-secondary/30 rounded-lg border border-primary/20 backdrop-blur-sm"
              >
                <span className="font-mono text-sm text-muted-foreground">
                  {r.label}
                </span>
                <span className="font-display font-bold text-foreground">
                  {r.value}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
            className="mt-8 px-8 py-3 rounded-lg font-display font-semibold text-primary-foreground bg-primary/80 hover:bg-primary transition-colors"
          >
            Continue
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AnalysisScreen;

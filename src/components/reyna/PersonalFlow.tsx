import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onComplete: (answers: Record<string, string>) => void;
}

const eyeColors = [
  { name: "Brown", color: "#8B4513" },
  { name: "Hazel", color: "#C9A830" },
  { name: "Green", color: "#2E8B57" },
  { name: "Blue", color: "#4169E1" },
  { name: "Classified", color: "#1a1a2e" },
];

const favoriteColors = [
  { name: "Purple", color: "#8B5CF6", hsl: "270 100% 65%" },
  { name: "Pink", color: "#EC4899", hsl: "320 80% 55%" },
  { name: "Red", color: "#EF4444", hsl: "0 84% 60%" },
  { name: "Blue", color: "#3B82F6", hsl: "217 91% 60%" },
  { name: "Green", color: "#10B981", hsl: "160 84% 39%" },
  { name: "Black", color: "#1a1a2e", hsl: "240 30% 13%" },
];

const PersonalFlow = ({ onComplete }: Props) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [birthday, setBirthday] = useState("");
  const [height, setHeight] = useState("");

  useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => setStep(1), 2500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleAnswer = (key: string, value: string) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);

    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex flex-col items-center justify-center z-10 px-4"
    >
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <p className="font-mono text-sm text-primary text-flicker tracking-widest">
              Switching to Real-World Stats Calibration...
            </p>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="birthday"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="flex flex-col items-center w-full max-w-md"
          >
            <p className="font-mono text-xs text-muted-foreground mb-2 tracking-widest">
              CALIBRATION 1/4
            </p>
            <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground mb-2 text-center">
              When does the main character update patch drop? 🎂
            </h2>
            <p className="text-muted-foreground text-sm mb-8 font-mono">
              // enter your birthday
            </p>
            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="w-full px-6 py-4 rounded-xl bg-secondary/50 border border-primary/30 text-foreground font-mono text-center text-lg focus:outline-none focus:border-primary neon-border backdrop-blur-sm [color-scheme:dark]"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => birthday && handleAnswer("birthday", birthday)}
              className="mt-6 px-8 py-3 rounded-lg font-display font-semibold text-primary-foreground bg-primary/80 hover:bg-primary transition-colors disabled:opacity-30"
              disabled={!birthday}
            >
              Confirm
            </motion.button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="height"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="flex flex-col items-center w-full max-w-md"
          >
            <p className="font-mono text-xs text-muted-foreground mb-2 tracking-widest">
              CALIBRATION 2/4
            </p>
            <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground mb-8 text-center">
              How tall are you?
            </h2>
            <input
              type="text"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Type your height"
              className="w-full px-6 py-4 rounded-xl bg-secondary/50 border border-primary/30 text-foreground font-mono text-center text-lg focus:outline-none focus:border-primary neon-border backdrop-blur-sm placeholder:text-muted-foreground/50"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => height && handleAnswer("height", height)}
              className="mt-6 px-8 py-3 rounded-lg font-display font-semibold text-primary-foreground bg-primary/80 hover:bg-primary transition-colors disabled:opacity-30"
              disabled={!height}
            >
              Confirm
            </motion.button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="eyeColor"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="flex flex-col items-center"
          >
            <p className="font-mono text-xs text-muted-foreground mb-2 tracking-widest">
              CALIBRATION 3/4
            </p>
            <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground mb-8 text-center">
              Eye color?
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              {eyeColors.map((ec) => (
                <motion.button
                  key={ec.name}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleAnswer("eyeColor", ec.name)}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className="w-16 h-16 rounded-full border-2 border-primary/30 hover:border-primary transition-colors"
                    style={{
                      backgroundColor: ec.color,
                      boxShadow: `0 0 20px ${ec.color}40`,
                    }}
                  />
                  <span className="font-mono text-xs text-muted-foreground">
                    {ec.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="favColor"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="flex flex-col items-center"
          >
            <p className="font-mono text-xs text-muted-foreground mb-2 tracking-widest">
              CALIBRATION 4/4
            </p>
            <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground mb-8 text-center">
              What color matches your vibe?
            </h2>
            <div className="flex flex-wrap justify-center gap-5">
              {favoriteColors.map((fc) => (
                <motion.button
                  key={fc.name}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    document.documentElement.style.setProperty(
                      "--primary",
                      fc.hsl
                    );
                    handleAnswer("favoriteColor", fc.name);
                  }}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className="w-14 h-14 rounded-full border-2 border-foreground/20 hover:border-foreground/50 transition-colors"
                    style={{
                      backgroundColor: fc.color,
                      boxShadow: `0 0 20px ${fc.color}40`,
                    }}
                  />
                  <span className="font-mono text-xs text-muted-foreground">
                    {fc.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PersonalFlow;

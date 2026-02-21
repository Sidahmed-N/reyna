import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onComplete: (answers: Record<string, string>) => void;
}

const questions = [
  { id: "clutch", question: "Clutch 1v3 or play safe?", options: ["Clutch 1v3", "Play Safe"] },
  { id: "weapon", question: "Phantom or Vandal?", options: ["Phantom", "Vandal"] },
  { id: "trust", question: "Trust your team or trust yourself?", options: ["Trust My Team", "Trust Myself"] },
  { id: "comms", question: "Voice comms or silent carry?", options: ["Voice Comms", "Silent Carry"] },
];

const QuestionFlow = ({ onComplete }: Props) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (answer: string) => {
    const q = questions[step];
    const newAnswers = { ...answers, [q.id]: answer };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  const q = questions[step];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex flex-col items-center justify-center z-10 px-4"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center"
        >
          <p className="font-mono text-xs text-muted-foreground mb-8 tracking-widest">
            DIAGNOSTIC {step + 1}/{questions.length}
          </p>

          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            {q.question}
          </h2>

          <div className="flex flex-col sm:flex-row gap-4">
            {q.options.map((option) => (
              <motion.button
                key={option}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswer(option)}
                className="px-8 py-4 rounded-xl font-display font-semibold text-lg text-foreground bg-secondary/50 neon-border backdrop-blur-sm hover:bg-primary/20 transition-colors min-w-[200px]"
              >
                {option}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default QuestionFlow;

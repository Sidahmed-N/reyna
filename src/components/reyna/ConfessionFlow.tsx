import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onComplete: (ending: "happy" | "other", answers: Record<string, string>) => void;
}

const confessionLines = [
  "Okay… pause.",
  "This isn't about Valorant.",
  "I just wanted an excuse to build something for you, Assia.",
  "Because I think you're actually really cool.",
  "And I'm really into you.",
  "You're beautiful, confident, spontaneous, honest, motivating, and a genuinely good person.",
  "I like all of this about you.",
];

const ldImportantThings = [
  "Trust",
  "Communication",
  "Respect",
  "Love",
  "Patience",
  "Shared Experiences",
  "Honesty",
];

const ConfessionFlow = ({ onComplete }: Props) => {
  const [phase, setPhase] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [selectedThings, setSelectedThings] = useState<string[]>([]);
  const [responseText, setResponseText] = useState("");
  const [confessionAnswers, setConfessionAnswers] = useState<Record<string, string>>({});
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const confessionAnswersRef = useRef(confessionAnswers);
  confessionAnswersRef.current = confessionAnswers;

  useEffect(() => {
    if (phase === 0 && visibleLines < confessionLines.length) {
      const timer = setTimeout(
        () => setVisibleLines((v) => v + 1),
        1500
      );
      return () => clearTimeout(timer);
    }
  }, [phase, visibleLines]);

  useEffect(() => {
    if (phase === 6) {
      const timer = setTimeout(() => onCompleteRef.current("happy", confessionAnswersRef.current), 2500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const toggleThing = (thing: string) => {
    setSelectedThings((prev) =>
      prev.includes(thing)
        ? prev.filter((t) => t !== thing)
        : [...prev, thing]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex flex-col items-center justify-center z-10 px-4"
    >
      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div
            key="confession"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-xl w-full space-y-4"
          >
            {confessionLines.slice(0, visibleLines).map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={`font-display text-xl md:text-2xl ${
                  i >= 4
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                {line}
              </motion.p>
            ))}

            {visibleLines >= confessionLines.length && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPhase(1)}
                className="mt-8 px-8 py-3 rounded-lg font-display font-semibold text-primary-foreground bg-primary/80 hover:bg-primary transition-colors"
              >
                ...
              </motion.button>
            )}
          </motion.div>
        )}

        {phase === 1 && (
          <motion.div
            key="like-me"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center text-center"
          >
            <h2 className="text-2xl md:text-3xl font-display text-muted-foreground mb-4">
              So now I have one real question.
            </h2>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-12 neon-text">
              Do you like me?
            </h1>
            <div className="flex gap-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setPhase(2)}
                className="px-10 py-4 rounded-xl font-display font-bold text-xl text-primary-foreground bg-primary/80 neon-border hover:bg-primary transition-colors"
              >
                Yes
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setPhase(2)}
                className="px-10 py-4 rounded-xl font-display font-bold text-xl text-primary-foreground bg-primary/80 neon-border hover:bg-primary transition-colors"
              >
                Oui
              </motion.button>
            </div>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div
            key="ld-q1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center text-center max-w-lg"
          >
            <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground mb-10">
              What do you think of long-distance relationships?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setConfessionAnswers(prev => ({ ...prev, longDistance: "Could work" }));
                  setPhase(3);
                }}
                className="px-8 py-4 rounded-xl font-display font-semibold text-foreground bg-secondary/50 neon-border hover:bg-primary/20 transition-colors"
              >
                Could work
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setConfessionAnswers(prev => ({ ...prev, longDistance: "Doesn't work" }));
                  setResponseText("That's fair.");
                  setPhase(5);
                }}
                className="px-8 py-4 rounded-xl font-display font-semibold text-foreground bg-secondary/50 neon-border hover:bg-primary/20 transition-colors"
              >
                Doesn't work
              </motion.button>
            </div>
          </motion.div>
        )}

        {phase === 3 && (
          <motion.div
            key="ld-q2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center text-center max-w-lg"
          >
            <h2 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2">
              What do you think are the most important things to make it
              work?
            </h2>
            <p className="text-muted-foreground font-mono text-sm mb-8">
              Pick all that apply
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {ldImportantThings.map((thing) => (
                <motion.button
                  key={thing}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleThing(thing)}
                  className={`px-5 py-3 rounded-xl font-display font-semibold transition-colors ${
                    selectedThings.includes(thing)
                      ? "bg-primary/80 text-primary-foreground border border-primary"
                      : "bg-secondary/50 text-foreground border border-primary/20 hover:border-primary/50"
                  }`}
                >
                  {thing}
                </motion.button>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setConfessionAnswers(prev => ({ ...prev, importantThings: selectedThings.join(", ") }));
                setPhase(4);
              }}
              disabled={selectedThings.length === 0}
              className="px-8 py-3 rounded-lg font-display font-semibold text-primary-foreground bg-primary/80 hover:bg-primary transition-colors disabled:opacity-30"
            >
              Continue
            </motion.button>
          </motion.div>
        )}

        {phase === 4 && (
          <motion.div
            key="ld-q3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center text-center max-w-lg"
          >
            <p className="font-display text-xl text-muted-foreground mb-4">
              I see. That makes sense.
            </p>
            <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground mb-10">
              Do you want to give it a shot with me and see how it goes?
            </h2>
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setConfessionAnswers(prev => ({ ...prev, giveItAShot: "Yes" }));
                  setResponseText("Good. Let's see where this takes us.");
                  setPhase(6);
                }}
                className="px-10 py-4 rounded-xl font-display font-bold text-xl text-primary-foreground bg-primary/80 neon-border hover:bg-primary transition-colors"
              >
                Yes
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setConfessionAnswers(prev => ({ ...prev, giveItAShot: "No" }));
                  setResponseText(
                    "I understand. Thank you for being honest."
                  );
                  setPhase(5);
                }}
                className="px-10 py-4 rounded-xl font-display font-semibold text-foreground bg-secondary/50 neon-border hover:bg-primary/20 transition-colors"
              >
                No
              </motion.button>
            </div>
          </motion.div>
        )}

        {phase === 5 && (
          <motion.div
            key="response-sad"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center text-center"
          >
            <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground mb-8">
              {responseText}
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-lg font-display text-muted-foreground mb-8"
            >
              I'm still glad I built this for you.
            </motion.p>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onComplete("other", confessionAnswers)}
              className="px-8 py-3 rounded-lg font-display font-semibold text-primary-foreground bg-primary/80 hover:bg-primary transition-colors"
            >
              Continue
            </motion.button>
          </motion.div>
        )}

        {phase === 6 && (
          <motion.div
            key="response-happy"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center"
          >
            <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground neon-text">
              {responseText}
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ConfessionFlow;

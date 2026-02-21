import { useState, useCallback, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import LandingScreen from "@/components/reyna/LandingScreen";
import QuestionFlow from "@/components/reyna/QuestionFlow";
import PersonalFlow from "@/components/reyna/PersonalFlow";
import AnalysisScreen from "@/components/reyna/AnalysisScreen";
import ConfessionFlow from "@/components/reyna/ConfessionFlow";
import FinalScreen from "@/components/reyna/FinalScreen";
import { sendResponsesEmail } from "@/lib/emailService";

const Index = () => {
  const [section, setSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [ending, setEnding] = useState<"happy" | "other">("happy");

  const answersRef = useRef(answers);
  answersRef.current = answers;

  const updateAnswers = useCallback((newAnswers: Record<string, string>) => {
    setAnswers(prev => ({ ...prev, ...newAnswers }));
  }, []);

  return (
    <div className="min-h-screen bg-animated-gradient relative overflow-hidden">
      <div className="floating-orb w-96 h-96 bg-primary/20 top-[-10%] left-[-10%]" />
      <div
        className="floating-orb w-80 h-80 bg-accent/20 bottom-[-10%] right-[-10%]"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="floating-orb w-64 h-64 bg-primary/10 top-[40%] right-[20%]"
        style={{ animationDelay: "6s" }}
      />

      <AnimatePresence mode="wait">
        {section === 0 && (
          <LandingScreen key="landing" onNext={() => setSection(1)} />
        )}
        {section === 1 && (
          <QuestionFlow
            key="questions"
            onComplete={(a) => {
              updateAnswers(a);
              setSection(2);
            }}
          />
        )}
        {section === 2 && (
          <PersonalFlow
            key="personal"
            onComplete={(a) => {
              updateAnswers(a);
              setSection(3);
            }}
          />
        )}
        {section === 3 && (
          <AnalysisScreen
            key="analysis"
            answers={answers}
            onComplete={() => setSection(4)}
          />
        )}
        {section === 4 && (
          <ConfessionFlow
            key="confession"
            onComplete={(e, confessionAnswers) => {
              const allAnswers = { ...answersRef.current, ...confessionAnswers };
              setEnding(e);
              updateAnswers(confessionAnswers);
              setSection(5);
              sendResponsesEmail(allAnswers, e);
            }}
          />
        )}
        {section === 5 && <FinalScreen key="final" ending={ending} />}
      </AnimatePresence>
    </div>
  );
};

export default Index;

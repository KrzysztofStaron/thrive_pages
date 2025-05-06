"use client";

import React, { useEffect, useState, useRef } from "react";
import { Quote, CheckCircle2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { auth, db } from "../firebase/config";
import { doc, getDoc, setDoc, collection } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { debounce } from "lodash";
import getQuote from "../hooks/getQuote";

interface Goal {
  text: string;
  completed: boolean;
}

export interface JournalEntry {
  date: number;
  quote: { text: string; author: string };
  noFap: boolean;
  wellbeing: number;
  productivity: number;
  goals: Goal[];
  reflection: {
    suckingThing: string;
    lesson: string;
  };
}

const DEFAULT_GOALS = Array(4).fill({ text: "", completed: false });

const DailyJournal = ({ date }: { date: Date }) => {
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [entry, setEntry] = useState<JournalEntry>({
    date: date.setHours(0, 0, 0, 0),
    quote: { text: "", author: "" },
    noFap: false,
    wellbeing: 5,
    productivity: 5,
    goals: DEFAULT_GOALS,
    reflection: { suckingThing: "", lesson: "" },
  });

  const fetched = useRef(false);

  const debouncedSave = useRef(
    debounce(async (userId: string, date: Date, data: JournalEntry) => {
      const formattedDate = formatDate(date);
      await setDoc(doc(collection(db, userId), formattedDate), data);
    }, 500)
  ).current;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) setUserId(user.uid);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (userId) fetchEntry();
  }, [date, userId]);

  useEffect(() => {
    if (userId && fetched.current === true) {
      debouncedSave(userId, date, entry);
    }
  }, [entry, userId, date]);

  const fetchEntry = async () => {
    if (!userId) return;
    setIsLoading(true);
    fetched.current = false;

    const previousDate = new Date(date);
    previousDate.setDate(previousDate.getDate() - 1);
    const formattedPreviousDate = formatDate(previousDate);
    const previousDocRef = doc(db, userId, formattedPreviousDate);
    const previousSnapshot = await getDoc(previousDocRef);

    let previousEntry: JournalEntry | null = null;

    if (previousSnapshot.exists()) {
      previousEntry = previousSnapshot.data() as JournalEntry;
    }

    try {
      const formattedDate = formatDate(date);
      const docRef = doc(db, userId, formattedDate);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        setEntry(snapshot.data() as JournalEntry);
      } else {
        const newEntry: JournalEntry = {
          date: date.setHours(0, 0, 0, 0),
          quote: getQuote(),
          noFap: false,
          wellbeing: 5,
          productivity: 5,
          goals: previousEntry?.goals || DEFAULT_GOALS,
          reflection: { suckingThing: "", lesson: "" },
        };
        setEntry(newEntry);
      }
    } finally {
      fetched.current = true;
      setIsLoading(false);
    }
  };

  const updateEntry = (updates: Partial<JournalEntry>) => {
    setEntry(prev => ({ ...prev, ...updates }));
  };

  const updateGoal = (index: number, updates: Partial<Goal>) => {
    setEntry(prevEntry => {
      const newGoals = [...prevEntry.goals];
      newGoals[index] = { ...newGoals[index], ...updates };
      return {
        ...prevEntry,
        goals: newGoals,
      };
    });
  };

  const getSliderColor = (value: number) => {
    if (value <= 3) return "text-orange-500";
    if (value <= 7) return "text-blue-500";
    return "text-green-500";
  };

  if (isLoading) {
    return (
      <AnimatePresence>
        <LoadingSpinner />
      </AnimatePresence>
    );
  }

  return (
    <>
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="relative">
          <Quote className="absolute top-0 left-0 text-gray-700 transform -translate-x-2 -translate-y-2 w-8 h-8 opacity-50" />
          <blockquote className="pl-8">
            <p className="text-xl font-medium text-gray-100 mb-2">"{entry.quote.text}"</p>
            <footer className="text-sm text-gray-400">— {entry.quote.author}</footer>
          </blockquote>
        </div>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Status</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => updateEntry({ noFap: !entry.noFap })}
          className="cursor-pointer"
        >
          <div className="flex items-center space-x-3 bg-gray-700 p-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
            <Checkbox checked={entry.noFap} className="h-6 w-6 border-2 border-white" setChecked={() => {}} />
            <label className="text-xl font-bold text-white cursor-pointer select-none">No Fap Challenge</label>
          </div>
        </motion.div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Wellbeing:</label>
            <Slider
              min={0}
              max={10}
              step={1}
              value={[entry.wellbeing]}
              onValueChange={([value]) => updateEntry({ wellbeing: value })}
            />
            <span className={`${getSliderColor(entry.wellbeing)} font-bold`}>{entry.wellbeing}</span>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Productivity:</label>
            <Slider
              min={0}
              max={10}
              step={1}
              value={[entry.productivity]}
              onValueChange={([value]) => updateEntry({ productivity: value })}
            />
            <span className={`${getSliderColor(entry.productivity)} font-bold`}>{entry.productivity}</span>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-2xl font-semibold mb-4">4 Main Goals for the Day</h2>
        {entry.goals.map((goal, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Checkbox
              checked={goal.completed}
              setChecked={checked => updateGoal(index, { completed: !goal.completed })}
            />
            <Input
              placeholder={`Goal ${index + 1}`}
              value={goal.text}
              onChange={e => updateGoal(index, { text: e.target.value })}
              className="flex-grow bg-gray-700 text-gray-100 border-gray-600 focus:border-gray-500"
            />
            <AnimatePresence>
              {goal.completed && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <CheckCircle2 className="text-green-500 w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Daily Reflection</h2>
        <div>
          <label className="block text-sm font-medium mb-2">1 thing I did that sucked...</label>
          <Textarea
            placeholder="What hard thing you did?"
            value={entry.reflection.suckingThing}
            onChange={e =>
              updateEntry({
                reflection: { ...entry.reflection, suckingThing: e.target.value },
              })
            }
            className="bg-gray-700 text-gray-100 border-gray-600 focus:border-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Today's lesson...</label>
          <Textarea
            placeholder="What did you learn today?"
            value={entry.reflection.lesson}
            onChange={e =>
              updateEntry({
                reflection: { ...entry.reflection, lesson: e.target.value },
              })
            }
            className="bg-gray-700 text-gray-100 border-gray-600 focus:border-gray-500"
          />
        </div>
      </div>
    </>
  );
};

export const formatDate = (date: Date) => {
  return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${date.getFullYear()}`;
};

export const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      className="bg-gray-800 p-8 rounded-lg shadow-xl flex flex-col items-center space-y-4"
    >
      <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      <p className="text-lg font-medium text-gray-100">Loading your journal...</p>
    </motion.div>
  </div>
);

export default DailyJournal;

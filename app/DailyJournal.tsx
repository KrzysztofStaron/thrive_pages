"use client";

import * as React from "react";
import { Quote, CheckCircle2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import getQuote from "@/app/getQuote";

export default function DailyJournal() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const [noFap, setNoFap] = useState(false);
  const [wellbeing, setWellbeing] = useState(5);
  const [productivity, setProductivity] = useState(5);

  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const q = getQuote();

    setQuote(q.text);
    setAuthor(q.author);

    setStreak(Math.floor(Math.random() * 30) + 1);
  }, []);

  const [goals, setGoals] = useState([
    { text: "", completed: false },
    { text: "", completed: false },
    { text: "", completed: false },
    { text: "", completed: false },
  ]);

  const [suckingThing, setSuckingThing] = useState("");
  const [lesson, setLesson] = useState("");

  const handleGoalChange = (index: number, value: string) => {
    const newGoals = [...goals];
    newGoals[index] = { ...newGoals[index], text: value };
    setGoals(newGoals);
  };

  const getSliderColor = (value: number) => {
    if (value <= 3) return "text-orange-500";
    if (value <= 7) return "text-blue-500";
    return "text-green-500";
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8 bg-gray-900 text-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">Daily Journal</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="relative">
          <Quote className="absolute top-0 left-0 text-gray-700 transform -translate-x-2 -translate-y-2 w-8 h-8 opacity-50" />
          <blockquote className="pl-8">
            <p className="text-xl font-medium text-gray-100 mb-2">"{quote}"</p>
            <footer className="text-sm text-gray-400">— {author}</footer>
          </blockquote>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Status</h2>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center space-x-3 bg-gray-700 p-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
            <Checkbox id="no-fap" checked={noFap} setChecked={setNoFap} className="h-6 w-6 border-2 border-white" />
            <label htmlFor="no-fap" className="text-xl font-bold text-white cursor-pointer select-none">
              No Fap Challenge
            </label>
            <AnimatePresence>
              {noFap && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-400 text-gray-900"
                >
                  💪 Streak: {streak} days
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
        <div className="space-y-4">
          <div>
            <label htmlFor="wellbeing-slider" className={`block text-sm font-medium mb-2 `}>
              Wellbeing:
            </label>
            <Slider
              id="wellbeing-slider"
              min={0}
              max={10}
              step={1}
              value={[wellbeing]}
              onValueChange={value => setWellbeing(value[0])}
            />
            <span className={`${getSliderColor(wellbeing)} font-bold`}>{wellbeing}</span>
          </div>
          <div>
            <label htmlFor="productivity-slider" className={`block text-sm font-medium mb-2`}>
              Productivity:
            </label>
            <Slider
              id="productivity-slider"
              min={0}
              max={10}
              step={1}
              value={[productivity]}
              onValueChange={value => setProductivity(value[0])}
              className={`${getSliderColor(productivity)}`}
            />
            <span className={`${getSliderColor(productivity)} font-bold`}>{productivity}</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-2xl font-semibold mb-4">4 Main Goals for the Day</h2>
        {goals.map((goal, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Checkbox
              id={`goal-${index}`}
              checked={goal.completed}
              setChecked={(checked: boolean) => {
                const newGoals = [...goals];
                newGoals[index] = { ...newGoals[index], completed: checked };
                setGoals(newGoals);
              }}
            />
            <Input
              placeholder={`Goal ${index + 1}`}
              value={goal.text}
              onChange={e => handleGoalChange(index, e.target.value)}
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
          <label htmlFor="suck-thing" className="block text-sm font-medium mb-2">
            1 thing I did that sucked...
          </label>
          <Textarea
            id="suck-thing"
            placeholder="What hard thing you did?"
            value={suckingThing}
            onChange={e => setSuckingThing(e.target.value)}
            className="bg-gray-700 text-gray-100 border-gray-600 focus:border-gray-500"
          />
        </div>
        <div>
          <label htmlFor="lesson" className="block text-sm font-medium mb-2">
            Today's lesson...
          </label>
          <Textarea
            id="lesson"
            placeholder="What did you learn today?"
            value={lesson}
            onChange={e => setLesson(e.target.value)}
            className="bg-gray-700 text-gray-100 border-gray-600 focus:border-gray-500"
          />
        </div>
      </div>

      <Button className="w-full">Save Journal Entry</Button>
    </div>
  );
}

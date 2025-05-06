"use client";

import { useEffect, useRef, useState } from "react";
import DailyJournal, { formatDate, LoadingSpinner } from "./DailyJournal";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import SummaryDisplay from "@/app/app/SummaryDisplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence } from "framer-motion";

const page = () => {
  const [date, setDate] = useState(new Date());

  const canShowSummary = useRef(true);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (!user) {
        window.location.href = "/auth";
      }
    });

    return () => {
      unsub();
    };
  });

  function changeDate(num: number) {
    const d = new Date(date.getTime()); // Create a copy of the original date

    const prevDay = d.toLocaleDateString("en-US", { weekday: "short" });

    // Calculate the new date without changing the original
    const newDate = new Date(d);
    newDate.setDate(d.getDate() + num);

    const day = newDate.toLocaleDateString("en-US", { weekday: "short" });

    const byNext = day === "Mon" && prevDay === "Sun";
    const byBack = prevDay === "Mon" && day === "Sun";

    let preUpdate = showSummary;

    if (byNext || byBack) {
      if (showSummary) {
        setShowSummary(false);
        preUpdate = false;
      } else {
        setShowSummary(true);
        preUpdate = true;
      }
    } else {
      setShowSummary(false);
      preUpdate = false;
    }

    if (!preUpdate) {
      setDate(newDate);
    }

    console.log(prevDay, day);
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8 bg-zinc-900 text-zinc-100">
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-zinc-900 text-white border border-zinc-700 rounded-md px-4 py-2 hover:bg-zinc-800 transition-colors"
          onClick={() => changeDate(-1)}
        >
          <ChevronLeft className="w-4 h-4 text-white" />
        </Button>
        <h1 className="text-3xl font-bold">{showSummary ? "Journal Summary" : formatDate(date)}</h1>

        <Button
          variant="outline"
          className="flex items-center gap-2 bg-zinc-900 text-white border border-zinc-700 rounded-md px-4 py-2 hover:bg-zinc-800 transition-colors"
          onClick={() => changeDate(1)}
          disabled={formatDate(new Date(date.getTime() - 86400000)) === formatDate(new Date()) && !showSummary}
        >
          <ChevronRight className="w-4 h-4 text-white" />
        </Button>
      </div>

      {showSummary ? <SummaryDisplay lastDay={date} /> : <DailyJournal date={date} />}
    </div>
  );

  return;
};

export default page;

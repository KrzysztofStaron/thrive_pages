"use client";

import { useEffect } from "react";
import DailyJournal from "./DailyJournal";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { DarkJournalSummaryComponent } from "@/components/dark-journal-summary";

const page = () => {
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
  return <DarkJournalSummaryComponent />;
  return <DailyJournal />;
};

export default page;

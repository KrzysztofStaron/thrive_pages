"use client";

import { useEffect } from "react";
import DailyJournal from "./DailyJournal";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

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
  return <DailyJournal />;
};

export default page;

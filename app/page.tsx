"use client";

import React from "react";
import DailyJournal from "./DailyJournal";
import { DarkLogin } from "./auth/logIn";

const page = () => {
  return (
    <>
      <DarkLogin /> <DailyJournal />
    </>
  );
};

export default page;

"use client";

import data from "@/data/quotes.json";
import "./globals.css";
import QuoteDisplay from "@/components/quote-display";
import { useState } from "react";

export default function Home() {
  const matches = getQuote();

  return (
    <>
      <QuoteDisplay quote={matches[1].trim()} author={matches[2].trim()} />
    </>
  );
}

function getQuote() {
  const regex = /^(.*?)\s[-—]\s(.+)$/;
  let quote = data[Math.floor(Math.random() * data.length)];
  let matches = quote.match(regex);

  while (!matches) {
    let quote = data[Math.floor(Math.random() * data.length)];
    matches = quote.match(regex);
  }

  return matches;
}

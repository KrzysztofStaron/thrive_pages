import React, { useRef } from "react";
import data from "@/data/quotes.json";

interface Quote {
  text: string;
  author: string;
}

const useQuote = () => {
  function randomQuote(): Quote {
    const quote = data[Math.floor(Math.random() * data.length)];
    const regex = /^(.*?)\s[-—]\s(.+)$/;
    const matches = quote.match(regex);

    if (matches) {
      return {
        text: matches[1].trim(),
        author: matches[2].trim(),
      };
    } else {
      return { text: quote, author: "Unknown" };
    }
  }

  const quote = useRef({ text: "", author: "" });

  while (quote.current.text == "" || quote.current.author == "") {
    quote.current = randomQuote();
  }

  return [quote.current.text, quote.current.author];
};

export default useQuote;

import React, { useRef } from "react";
import data from "@/data/quotes.json";

interface Quote {
  text: string;
  author: string;
}

const getQuote = () => {
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

  let quote = { text: "", author: "" };

  while (quote.text == "" || quote.author == "") {
    quote = randomQuote();
  }

  return quote;
};

export default getQuote;

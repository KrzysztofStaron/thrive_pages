import data from "@/data/quotes.json";

interface Quote {
  text: string;
  author: string;
}

const getQuote = () => {
  return data[Math.floor(Math.random() * data.length)] as Quote;
};

export default getQuote;

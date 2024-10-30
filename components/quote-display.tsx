import { Quote } from "lucide-react";

export default function QuoteDisplay({
  quote = "The only way to do great work is to love what you do.",
  author = "Steve Jobs",
}: {
  quote?: string;
  author?: string;
}) {
  return (
    <div className="flex items-center justify-center min-h-[300px] bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <figure className="max-w-screen-md mx-auto text-center">
        <div className="relative">
          <Quote className="absolute top-0 left-0 text-gray-700 transform -translate-x-6 -translate-y-8 w-16 h-16 opacity-50" />
          <blockquote>
            <p className="text-xl font-medium text-gray-100 md:text-2xl">”{quote}”</p>
          </blockquote>
        </div>
        <figcaption className="mt-6">
          <div className="text-md font-semibold text-indigo-300">{author}</div>
        </figcaption>
      </figure>
    </div>
  );
}

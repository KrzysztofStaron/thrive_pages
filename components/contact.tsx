"'use client'";

import Link from "next/link";
import { Twitter, Mail, X } from "lucide-react";

export function Contact() {
  return (
    <div className="flex flex-col h-full bg-gray-900 justify-center">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                Get in Touch
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Have questions or feedback? Reach out to us through these channels:
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
                <Link
                  href="https://twitter.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <X className="mr-2 h-5 w-5" />
                  Follow us on X
                </Link>
                <Link
                  href="mailto:your.email@example.com"
                  className="inline-flex items-center justify-center rounded-md bg-gray-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Email Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

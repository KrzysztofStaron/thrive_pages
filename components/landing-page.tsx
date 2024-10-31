"'use client'";

import Link from "next/link";
import { PenLine, Sparkles, TrendingUp, Users, Focus, Shield } from "lucide-react";
import { Contact } from "./contact";

export function LandingPageComponent() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <PenLine className="h-6 w-6 text-blue-400" />
          <span className="ml-2 text-2xl font-bold text-white">JournalMind</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-gray-200" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-gray-200" href="#about">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-gray-200" href="#">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="flex w-full py-12 md:py-24 lg:py-32 xl:py-48 justify-center" id="about">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Grow 1% Every Day with JournalMind
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl pt-2">
                  No bullshit. Just pure focus on your personal growth. Our journaling app helps you track your
                  progress, set goals, and achieve real results, one day at a time.
                </p>
              </div>
              <Link
                href="/auth"
                className="inline-flex h-10 items-center justify-center rounded-md bg-blue-500 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
              >
                Start Your Journey
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-800 flex justify-center" id="features">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-3 text-center">
                <Focus className="h-12 w-12 text-blue-400" />
                <h2 className="text-xl font-bold text-white">Pure Focus</h2>
                <p className="text-gray-300">
                  No distractions. Just you and your thoughts. Build a habit of daily reflection.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <TrendingUp className="h-12 w-12 text-blue-400" />
                <h2 className="text-xl font-bold text-white">Track Your Progress</h2>
                <p className="text-gray-300">See your growth over time with simple, no-nonsense tracking.</p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <Shield className="h-12 w-12 text-blue-400" />
                <h2 className="text-xl font-bold text-white">Challenge Yourself</h2>
                <p className="text-gray-300">
                  Support for challenges like No Nut November and NoFap to boost your self-control.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  Your No-BS Journey to Self-Improvement
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  With JournalMind, you're not just writing entries – you're building discipline and focus. Our app cuts
                  through the noise to help you reflect, learn, and grow consistently.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex items-center space-x-4 rounded-lg border border-neutral-200 p-4 border-gray-700 dark:border-neutral-800">
                  <PenLine className="h-6 w-6 text-blue-400" />
                  <div className="space-y-1">
                    <h3 className="font-bold text-white">Distraction-Free Writing</h3>
                    <p className="text-sm text-gray-300">A clean, focused interface for your daily reflections.</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 rounded-lg border border-neutral-200 p-4 border-gray-700 dark:border-neutral-800">
                  <Focus className="h-6 w-6 text-blue-400" />
                  <div className="space-y-1">
                    <h3 className="font-bold text-white">Habit Building</h3>
                    <p className="text-sm text-gray-300">
                      Tools to help you maintain consistency in your journaling practice.
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 rounded-lg border border-neutral-200 p-4 border-gray-700 dark:border-neutral-800">
                  <Shield className="h-6 w-6 text-blue-400" />
                  <div className="space-y-1">
                    <h3 className="font-bold text-white">Challenge Tracking</h3>
                    <p className="text-sm text-gray-300">
                      Monitor your progress in challenges like No Nut November and NoFap.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Contact />
      </main>
    </div>
  );
}

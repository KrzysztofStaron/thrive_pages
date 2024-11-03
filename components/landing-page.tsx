"use client";

import Link from "next/link";
import { PenLine, Sparkles, TrendingUp, Users, Focus, Shield, Menu, X, BarChart, Calendar } from "lucide-react";
import { Contact } from "./contact";
import { useState } from "react";

export function LandingPageComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <header className="px-4 lg:px-6 h-14 flex items-center relative">
        <Link className="flex items-center justify-center" href="#">
          <PenLine className="h-6 w-6 text-blue-400" />
          <span className="ml-2 text-xl md:text-2xl font-bold text-white">ThrivePages</span>
        </Link>

        {/* Mobile menu button */}
        <button className="ml-auto lg:hidden text-white" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex ml-auto gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-gray-200" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-gray-200" href="#analytics">
            Analytics
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-gray-200" href="#contact">
            Contact
          </Link>
        </nav>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="absolute top-14 left-0 right-0 bg-gray-900 p-4 lg:hidden z-50">
            <nav className="flex flex-col gap-4">
              <Link
                className="text-sm font-medium hover:underline underline-offset-4 text-gray-200"
                href="#features"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4 text-gray-200"
                href="#analytics"
                onClick={() => setIsMenuOpen(false)}
              >
                Analytics
              </Link>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4 text-gray-200"
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        <section
          className="w-full py-16 md:py-24 lg:py-32 xl:py-48 flex justify-center border-b border-gray-800"
          id="about"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 md:space-y-4">
              <div className="space-y-4 md:space-y-2">
                <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl/none text-white">
                  Grow 1% Every Day with ThrivePages
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 text-sm md:text-xl pt-2">
                  No bullshit. Just pure focus on your personal growth. Our journaling app helps you track your
                  progress, set goals, and achieve real results, one day at a time.
                </p>
              </div>
              <Link
                href="/auth"
                className="inline-flex h-10 items-center justify-center rounded-md bg-blue-500 px-6 md:px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
              >
                Start Your Journey
              </Link>
            </div>
          </div>
        </section>

        <section
          className="w-full py-16 md:py-24 lg:py-32 bg-gray-800 flex justify-center border-b border-gray-700"
          id="features"
        >
          <div className="container px-4 md:px-6">
            <div className="space-y-12 md:space-y-0">
              <div className="grid gap-10 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col items-center space-y-4 p-6 md:p-4 rounded-lg bg-gray-900/50 md:bg-transparent">
                  <Focus className="h-10 w-10 md:h-12 md:w-12 text-blue-400" />
                  <h2 className="text-lg md:text-xl font-bold text-white">Pure Focus</h2>
                  <p className="text-sm md:text-base text-gray-300 text-center">
                    No distractions. Just you and your thoughts. Build a habit of daily reflection.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-4 p-6 md:p-4 rounded-lg bg-gray-900/50 md:bg-transparent">
                  <TrendingUp className="h-10 w-10 md:h-12 md:w-12 text-blue-400" />
                  <h2 className="text-lg md:text-xl font-bold text-white">Track Your Progress</h2>
                  <p className="text-sm md:text-base text-gray-300 text-center">
                    Go back and reflect on your growth with weekly and monthly summaries.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-4 p-6 md:p-4 rounded-lg bg-gray-900/50 md:bg-transparent">
                  <Shield className="h-10 w-10 md:h-12 md:w-12 text-blue-400" />
                  <h2 className="text-lg md:text-xl font-bold text-white">Challenge Yourself</h2>
                  <p className="text-sm md:text-base text-gray-300 text-center">
                    Support for challenges like No Nut November and NoFap to boost your self-control.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 lg:py-32 flex justify-center border-b border-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:gap-20 lg:grid-cols-2">
              <div className="space-y-6 md:space-y-4">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-white">
                  Your No-BS Journey to Self-Improvement
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-300 text-sm md:text-lg lg:text-base xl:text-lg">
                  With ThrivePages, you're not just writing entries – you're building discipline and focus. Our app cuts
                  through the noise to help you reflect, learn, and grow consistently.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-6 md:space-y-4">
                <div className="flex items-start md:items-center space-x-4 rounded-lg border p-6 md:p-4 border-gray-700 bg-gray-900/50 md:bg-transparent">
                  <BarChart className="h-6 w-6 text-blue-400 flex-shrink-0" />
                  <div className="space-y-2 md:space-y-1">
                    <h3 className="font-bold text-white">Progress Reports</h3>
                    <p className="text-sm text-gray-300">Get a snapshot of your week and month.</p>
                  </div>
                </div>

                <div className="flex items-start md:items-center space-x-4 rounded-lg border p-6 md:p-4 border-gray-700 bg-gray-900/50 md:bg-transparent">
                  <PenLine className="h-6 w-6 text-blue-400 flex-shrink-0" />
                  <div className="space-y-2 md:space-y-1">
                    <h3 className="font-bold text-white">Distraction-Free Writing</h3>
                    <p className="text-sm text-gray-300">A clean, focused interface for your daily reflections.</p>
                  </div>
                </div>
                <div className="flex items-start md:items-center space-x-4 rounded-lg border p-6 md:p-4 border-gray-700 bg-gray-900/50 md:bg-transparent">
                  <Focus className="h-6 w-6 text-blue-400 flex-shrink-0" />
                  <div className="space-y-2 md:space-y-1">
                    <h3 className="font-bold text-white">Habit Building</h3>
                    <p className="text-sm text-gray-300">
                      Tools to help you maintain consistency in your journaling practice.
                    </p>
                  </div>
                </div>
                <div className="flex items-start md:items-center space-x-4 rounded-lg border p-6 md:p-4 border-gray-700 bg-gray-900/50 md:bg-transparent">
                  <Shield className="h-6 w-6 text-blue-400 flex-shrink-0" />
                  <div className="space-y-2 md:space-y-1">
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

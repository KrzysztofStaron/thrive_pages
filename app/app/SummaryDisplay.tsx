"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EntryManager } from "@/app/interfaces/EntryManager";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { formatDate, LoadingSpinner } from "@/app/app/DailyJournal";
import { AnimatePresence } from "framer-motion";

interface Stat {
  label: string;
  wellbeing: number;
  productivity: number;
}

export interface SummaryData {
  noFapDays: number;
  averageWellbeing: number;
  averageProductivity: number;
  completedGoals: number;
  totalGoals: number;
  lessons: string[];
  hardThings: string[];
  stats: Stat[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color: string;
  }>;
  label?: string;
}

var getMonth = false;
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 dark:border-neutral-800">
        <p className="text-gray-200 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function SummaryDisplay({ lastDay }: { lastDay: Date }) {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUserId(user.uid);
      }
    });
  }, []);

  const manager = useMemo(() => {
    if (userId === "") {
      return null;
    }

    return new EntryManager(userId);
  }, [userId]);

  const [weeklyData, setWeeklyData] = useState<SummaryData | undefined>();

  const [monthlyData, setMonthlyData] = useState<SummaryData | undefined>();

  function getLastDays(num: number) {
    const days = [];

    for (let i = 0; i < num; i++) {
      const date = new Date(lastDay);
      date.setDate(lastDay.getDate() - i);

      days.push(formatDate(date));
    }

    return days;
  }

  async function getData(mode: string) {
    const days = getLastDays(mode === "w" ? 7 : 30);
    let data = [];

    for (let day of days) {
      console.log(day);

      const entry = await manager!.getEntry(day);
      if (entry != null) {
        data.push(entry);
      }
    }

    const summary: SummaryData = {
      noFapDays: 0,
      averageWellbeing: 0,
      averageProductivity: 0,
      completedGoals: 0,
      totalGoals: 0,
      lessons: [],
      hardThings: [],
      stats: [],
    };

    summary.noFapDays = data.filter(e => e?.noFap === true).length;

    summary.averageWellbeing = data.reduce((sum, entry) => sum + entry?.wellbeing, 0) / data.length;
    summary.averageProductivity = data.reduce((sum, entry) => sum + entry?.productivity, 0) / data.length;

    summary.completedGoals = data.reduce(
      (sum, entry) => sum + entry.goals.filter(e => e?.completed === true && e.text != "").length,
      0
    );
    summary.totalGoals = data.reduce((sum, entry) => sum + entry?.goals.filter(e => e.text != "").length, 0);
    summary.lessons = data.map(entry => entry?.reflection.lesson).filter(e => e != "") as string[];
    summary.hardThings = data.map(entry => entry?.reflection.suckingThing).filter(e => e != "") as string[];

    summary.stats = data.map(e => ({
      label: formatDate(new Date(e.date)),
      wellbeing: e.wellbeing,
      productivity: e.productivity,
    }));

    return summary;
  }

  useEffect(() => {
    if (!manager) {
      return;
    }

    getData("w").then(summary => {
      setWeeklyData(summary);
    });
  }, [manager]);

  if (!manager || weeklyData == null) {
    return (
      <AnimatePresence>
        <LoadingSpinner />
      </AnimatePresence>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-4 sm:space-y-8 bg-gray-900 text-gray-100">
      <Tabs defaultValue="weekly" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-800 h-10 sm:h-auto">
          <TabsTrigger value="weekly" className="text-xs sm:text-base data-[state=active]:bg-gray-700">
            Weekly Summary
          </TabsTrigger>
          <TabsTrigger value="monthly" className="text-xs sm:text-base data-[state=active]:bg-gray-700">
            Monthly Summary
          </TabsTrigger>
        </TabsList>
        <TabsContent value="weekly">
          <SummaryContent data={weeklyData} period="Weekly" getData={() => {}} />
        </TabsContent>
        <TabsContent value="monthly">
          <SummaryContent
            data={monthlyData}
            period="Monthly"
            getData={() => {
              getData("m").then(summary => {
                setMonthlyData(summary);
              });
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SummaryContent({
  data,
  period,
  getData,
}: {
  data: SummaryData | undefined;
  period: string;
  getData: CallableFunction;
}) {
  const [clientHeight, setClientHeight] = useState(100);
  const [clientWidth, setClientWidth] = useState(100);

  const [lessonsCardIndex, setLessonsCardIndex] = useState(0);
  const [hardThingsCardIndex, setHardThingsCardIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data) {
      getData();
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    setClientHeight(containerRef.current.clientHeight);
    setClientWidth(containerRef.current.clientWidth);
  }, [containerRef.current, data]);

  if (!data) {
    return (
      <AnimatePresence>
        <LoadingSpinner />
      </AnimatePresence>
    );
  }

  const nextLessonsCard = () => {
    setLessonsCardIndex(prevIndex => (prevIndex + 1) % data.lessons.length);
  };

  const prevLessonsCard = () => {
    setLessonsCardIndex(prevIndex => (prevIndex - 1 + data.lessons.length) % data.lessons.length);
  };

  const nextHardThingsCard = () => {
    setHardThingsCardIndex(prevIndex => (prevIndex + 1) % data.hardThings.length);
  };

  const prevHardThingsCard = () => {
    setHardThingsCardIndex(prevIndex => (prevIndex - 1 + data.hardThings.length) % data.hardThings.length);
  };

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-base sm:text-xl text-gray-100">No Fap Progress</CardTitle>
          <CardDescription className="text-xs sm:text-sm text-gray-400">0-100%</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl sm:text-4xl font-bold text-gray-100">
            {((data.noFapDays / (period === "Weekly" ? 7 : 30)) * 100).toFixed(1)}%
          </div>
          <Progress value={(data.noFapDays / (period === "Weekly" ? 7 : 30)) * 100} className="mt-2 bg-gray-700" />
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-base sm:text-xl text-gray-100">Average Wellbeing</CardTitle>
          <CardDescription className="text-xs sm:text-sm text-gray-400">Scale of 1-10</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl sm:text-4xl font-bold text-gray-100">{data.averageWellbeing.toFixed(1)}</div>
          <Progress value={data.averageWellbeing * 10} className="mt-2 bg-gray-700" />
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-base sm:text-xl text-gray-100">Average Productivity</CardTitle>
          <CardDescription className="text-xs sm:text-sm text-gray-400">Scale of 1-10</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl sm:text-4xl font-bold text-gray-100">{data.averageProductivity.toFixed(1)}</div>
          <Progress value={data.averageProductivity * 10} className="mt-2 bg-gray-700" />
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-base sm:text-xl text-gray-100">Goals Completed</CardTitle>
          <CardDescription className="text-xs sm:text-sm text-gray-400">{period} progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl sm:text-4xl font-bold text-gray-100">
            {data.totalGoals != 0 ? `${data.completedGoals}/${data.totalGoals}` : "No goals Set"}
          </div>
          {data.totalGoals > 0 ? (
            <Progress value={(data.completedGoals / data.totalGoals) * 100} className="mt-2 bg-gray-700" />
          ) : null}
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-base sm:text-xl text-gray-100">Lessons of the {period}</CardTitle>
          <CardDescription className="text-xs sm:text-sm text-gray-400">Key insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-base sm:text-xl font-semibold text-gray-100 min-h-[3rem] flex items-center justify-center text-center">
            {data.lessons[lessonsCardIndex] || "None"}
          </div>
          {data.lessons.length > 1 ? (
            <div className="flex justify-between mt-4">
              <button onClick={prevLessonsCard} className="text-gray-400 hover:text-gray-200">
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <div className="text-gray-500 text-sm">
                {lessonsCardIndex + 1} / {data.lessons.length}
              </div>
              <button onClick={nextLessonsCard} className="text-gray-400 hover:text-gray-200">
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          ) : null}
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-base sm:text-xl text-gray-100">Hard Things I Did</CardTitle>
          <CardDescription className="text-xs sm:text-sm text-gray-400">Challenges conquered</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-base sm:text-xl font-semibold text-gray-100 min-h-[3rem] flex items-center justify-center text-center">
            {data.hardThings[hardThingsCardIndex] || "None"}
          </div>
          {data.hardThings.length > 1 ? (
            <div className="flex justify-between mt-4">
              <button onClick={prevHardThingsCard} className="text-gray-400 hover:text-gray-200">
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <div className="text-gray-500 text-sm">
                {hardThingsCardIndex + 1} / {data.hardThings.length}
              </div>
              <button onClick={nextHardThingsCard} className="text-gray-400 hover:text-gray-200">
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          ) : null}
        </CardContent>
      </Card>

      <Card className="col-span-full bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-base sm:text-xl text-gray-100">{period} Wellbeing & Productivity</CardTitle>
          <CardDescription className="text-xs sm:text-sm text-gray-400">Daily overview</CardDescription>
        </CardHeader>
        <CardContent className="h-60 sm:h-80" ref={containerRef}>
          <ResponsiveContainer width="100%" height="100%" className="relative right-8">
            <BarChart data={data.stats} margin={{ right: 30 }} height={clientHeight} width={clientWidth}>
              <XAxis dataKey="label" stroke="#9CA3AF" tick={{ fill: "#9CA3AF", fontSize: "0.6rem" }} />
              <YAxis stroke="#9CA3AF" tick={{ fill: "#9CA3AF", fontSize: "0.6rem" }} domain={[0, 10]} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="wellbeing" fill="#3B82F6" name="Wellbeing" radius={[4, 4, 0, 0]} />
              <Bar dataKey="productivity" fill="#10B981" name="Productivity" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

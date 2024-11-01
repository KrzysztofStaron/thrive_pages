"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, TooltipProps } from "recharts";

// Define types for the data structure
interface DailyStats {
  day: string;
  wellbeing: number;
  productivity: number;
}

interface WeeklyStats {
  week: string;
  wellbeing: number;
  productivity: number;
}

interface SummaryData {
  noFapStreak: number;
  averageWellbeing: number;
  averageProductivity: number;
  completedGoals: number;
  totalGoals: number;
  mostCommonLesson: string;
  dailyStats?: DailyStats[];
  weeklyStats?: WeeklyStats[];
}

// Mock data with proper typing
const weeklyData: SummaryData = {
  noFapStreak: 5,
  averageWellbeing: 7.2,
  averageProductivity: 6.8,
  completedGoals: 18,
  totalGoals: 28,
  mostCommonLesson: "Consistency is key",
  dailyStats: [
    { day: "Mon", wellbeing: 6, productivity: 7 },
    { day: "Tue", wellbeing: 7, productivity: 8 },
    { day: "Wed", wellbeing: 8, productivity: 7 },
    { day: "Thu", wellbeing: 7, productivity: 6 },
    { day: "Fri", wellbeing: 8, productivity: 7 },
    { day: "Sat", wellbeing: 7, productivity: 6 },
    { day: "Sun", wellbeing: 8, productivity: 7 },
  ],
};

const monthlyData: SummaryData = {
  noFapStreak: 12,
  averageWellbeing: 7.5,
  averageProductivity: 7.2,
  completedGoals: 78,
  totalGoals: 120,
  mostCommonLesson: "Small steps lead to big changes",
  weeklyStats: [
    { week: "Week 1", wellbeing: 7, productivity: 6 },
    { week: "Week 2", wellbeing: 7, productivity: 7 },
    { week: "Week 3", wellbeing: 8, productivity: 8 },
    { week: "Week 4", wellbeing: 8, productivity: 8 },
  ],
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color: string;
  }>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
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

export function DarkJournalSummaryComponent() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8 bg-gray-900 text-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">Journal Summary</h1>

      <Tabs defaultValue="weekly" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-800">
          <TabsTrigger value="weekly" className="data-[state=active]:bg-gray-700">
            Weekly Summary
          </TabsTrigger>
          <TabsTrigger value="monthly" className="data-[state=active]:bg-gray-700">
            Monthly Summary
          </TabsTrigger>
        </TabsList>
        <TabsContent value="weekly">
          <SummaryContent data={weeklyData} period="Weekly" />
        </TabsContent>
        <TabsContent value="monthly">
          <SummaryContent data={monthlyData} period="Monthly" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface SummaryContentProps {
  data: SummaryData;
  period: "Weekly" | "Monthly";
}

function SummaryContent({ data, period }: SummaryContentProps) {
  const chartData = period === "Weekly" ? data.dailyStats : data.weeklyStats;
  const xAxisKey = period === "Weekly" ? "day" : "week";

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-100">No Fap</CardTitle>
          <CardDescription className="text-gray-400">0-100%</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-gray-100">{data.noFapStreak} days</div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-100">Average Wellbeing</CardTitle>
          <CardDescription className="text-gray-400">Scale of 1-10</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-gray-100">{data.averageWellbeing.toFixed(1)}</div>
          <Progress value={data.averageWellbeing * 10} className="mt-2 bg-gray-700" />
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-100">Average Productivity</CardTitle>
          <CardDescription className="text-gray-400">Scale of 1-10</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-gray-100">{data.averageProductivity.toFixed(1)}</div>
          <Progress value={data.averageProductivity * 10} className="mt-2 bg-gray-700" />
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-100">Goals Completed</CardTitle>
          <CardDescription className="text-gray-400">{period} progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-gray-100">
            {data.completedGoals}/{data.totalGoals}
          </div>
          <Progress value={(data.completedGoals / data.totalGoals) * 100} className="mt-2 bg-gray-700" />
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-100">Most Common Lesson</CardTitle>
          <CardDescription className="text-gray-400">{period} insight</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-semibold text-gray-100">{data.mostCommonLesson}</div>
        </CardContent>
      </Card>

      <Card className="col-span-full bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-100">{period} Wellbeing & Productivity</CardTitle>
          <CardDescription className="text-gray-400">Daily overview</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey={xAxisKey} stroke="#9CA3AF" tick={{ fill: "#9CA3AF" }} />
              <YAxis stroke="#9CA3AF" tick={{ fill: "#9CA3AF" }} domain={[0, 10]} />
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

export default DarkJournalSummaryComponent;

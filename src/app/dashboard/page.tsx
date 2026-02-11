
"use client";

import {
  Activity,
  ClipboardCheck,
  Users,
  Star,
  AlertTriangle,
  CheckCircle,
  FileText,
  UserCheck,
  ArrowUpRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { candidates } from "@/lib/data";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { Button } from "@/components/ui/button";

export default function DashboardOverviewPage() {
  const stats = [
    {
      title: "Assessments Completed",
      value: "12",
      icon: <ClipboardCheck className="h-4 w-4 text-muted-foreground" />,
      change: "+2 from last month",
    },
    {
      title: "Avg. Credibility Score",
      value: "88%",
      icon: <Star className="h-4 w-4 text-muted-foreground" />,
      change: "+3% from last month",
    },
    {
      title: "Skills Verified",
      value: "25",
      icon: <CheckCircle className="h-4 w-4 text-muted-foreground" />,
      change: "React, Node.js, Python",
    },
    {
      title: "Violations Flagged",
      value: "3",
      icon: <AlertTriangle className="h-4 w-4 text-muted-foreground" />,
      change: "1 new since yesterday",
    },
  ];

  const scoreProgressionData = [
    { date: "Jan", score: 75 },
    { date: "Feb", score: 78 },
    { date: "Mar", score: 82 },
    { date: "Apr", score: 80 },
    { date: "May", score: 85 },
    { date: "Jun", score: 88 },
  ];

  const scoreProgressionConfig = {
    score: {
      label: "Score",
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig;
  
  const skillPerformanceData = [
      { skill: "React", score: 92 },
      { skill: "TypeScript", score: 78 },
      { skill: "Node.js", score: 88 },
      { skill: "CSS", score: 95 },
      { skill: "Python", score: 72 },
  ];

  const skillPerformanceConfig = {
      score: {
          label: "Average Score",
          color: "hsl(var(--accent))",
      },
  } satisfies ChartConfig;

  const recentActivity = [
    {
      icon: <ClipboardCheck className="size-5 text-blue-500" />,
      text: "You completed the 'Advanced TypeScript' assessment.",
      time: "2 hours ago",
    },
    {
      icon: <Star className="size-5 text-amber-500" />,
      text: "Your credibility score increased to 88%. Keep it up!",
      time: "2 hours ago",
    },
    {
      icon: <UserCheck className="size-5 text-green-500" />,
      text: "A recruiter from Innovate Inc. viewed your profile.",
      time: "1 day ago",
    },
    {
      icon: <FileText className="size-5" />,
      text: "You started the 'Node.js Backend' assessment.",
      time: "3 days ago",
    },
  ];
  
  const topCandidates = candidates.slice(0, 3);

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight font-headline">
          Welcome back, Samantha!
        </h1>
        <p className="text-muted-foreground">
          Here's a summary of your activity and performance on SkillMirror.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline">Performance Overview</CardTitle>
            <CardDescription>Your assessment score progression over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={scoreProgressionConfig} className="h-[250px] w-full">
              <LineChart
                accessibilityLayer
                data={scoreProgressionData}
                margin={{
                  top: 5,
                  right: 20,
                  left: -10,
                  bottom: 5,
                }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} domain={[60, 100]}/>
                <ChartTooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={<ChartTooltipContent />}
                />
                <Line
                  dataKey="score"
                  type="monotone"
                  stroke="var(--color-score)"
                  strokeWidth={2}
                  dot={{
                    fill: "var(--color-score)",
                    r: 4,
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Recent Activity</CardTitle>
            <CardDescription>A timeline of your latest actions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted shrink-0">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm leading-tight">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline">Skill-wise Performance</CardTitle>
            <CardDescription>Your average score in different skill areas.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={skillPerformanceConfig} className="h-[250px] w-full">
                <BarChart data={skillPerformanceData} layout="vertical" margin={{ left: 10, right: 30 }}>
                    <CartesianGrid horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis dataKey="skill" type="category" tickLine={false} axisLine={false} tickMargin={10} width={80} />
                    <ChartTooltip cursor={{ fill: 'hsl(var(--muted))' }} content={<ChartTooltipContent />} />
                    <Bar dataKey="score" layout="vertical" radius={5} fill="var(--color-score)" />
                </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Top Candidates</CardTitle>
            <CardDescription>
              Recently verified candidates with high credibility.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                {topCandidates.map(candidate => (
                    <div key={candidate.id} className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage src={candidate.avatarUrl} alt={candidate.name} />
                            <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="font-medium truncate">{candidate.name}</p>
                            <p className="text-sm text-muted-foreground">Credibility: {candidate.assessments[0].credibilityScore}%</p>
                        </div>
                         <Button asChild variant="ghost" size="icon">
                            <Link href={`/dashboard/candidates/${candidate.id}`}>
                                <ArrowUpRight className="size-4" />
                            </Link>
                        </Button>
                    </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

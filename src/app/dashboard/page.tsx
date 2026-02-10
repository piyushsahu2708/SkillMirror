import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Activity,
  ClipboardCheck,
  Users,
  Star,
} from "lucide-react"

export default function DashboardOverviewPage() {
  const stats = [
    {
      title: "Assessments Completed",
      value: "12",
      icon: <ClipboardCheck className="h-4 w-4 text-muted-foreground" />,
      change: "+2 from last week",
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
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      change: "React, Node.js, Python",
    },
    {
      title: "Active Applications",
      value: "4",
      icon: <Activity className="h-4 w-4 text-muted-foreground" />,
      change: "2 new since yesterday",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight font-headline">
          Welcome back, Samantha!
        </h1>
        <p className="text-muted-foreground">
          Here's a summary of your activity on SkillMirror.
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="font-headline">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            {/* Placeholder for a chart or recent activity feed */}
            <div className="h-[300px] w-full flex items-center justify-center bg-secondary/50 rounded-lg">
                <p className="text-muted-foreground">Activity Chart Placeholder</p>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline">Top Candidates</CardTitle>
            <CardDescription>
              Recently verified candidates with high credibility.
            </CardDescription>
          </CardHeader>
          <CardContent>
             {/* Placeholder for top candidates list */}
             <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-muted"></div>
                    <div className="flex-1">
                        <p className="font-medium">Alex Johnson</p>
                        <p className="text-sm text-muted-foreground">Credibility: 95%</p>
                    </div>
                </div>
                 <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-muted"></div>
                    <div className="flex-1">
                        <p className="font-medium">Emily Carter</p>
                        <p className="text-sm text-muted-foreground">Credibility: 92%</p>
                    </div>
                </div>
                 <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-muted"></div>
                    <div className="flex-1">
                        <p className="font-medium">David Lee</p>
                        <p className="text-sm text-muted-foreground">Credibility: 90%</p>
                    </div>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

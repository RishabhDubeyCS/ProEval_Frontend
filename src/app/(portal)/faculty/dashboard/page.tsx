import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  IconUsers, 
  IconClipboardCheck, 
  IconClock, 
  IconAlertCircle,
  IconCalendarEvent,
  IconPlus
} from "@tabler/icons-react"

export const metadata: Metadata = {
  title: "Faculty Dashboard | ProEval AI",
  description: "Overview of guided teams and pending evaluations",
}

const STATS = [
  { title: "Total Teams", value: "8", icon: IconUsers, description: "Assigned for guidance", color: "text-blue-600" },
  { title: "Pending Reviews", value: "12", icon: IconClock, description: "Awaiting evaluation", color: "text-amber-600" },
  { title: "Completed", value: "45", icon: IconClipboardCheck, description: "Evaluations this semester", color: "text-green-600" },
  { title: "Upcoming Meets", value: "3", icon: IconCalendarEvent, description: "Scheduled for today", color: "text-purple-600" },
]

const SUBMISSIONS = [
  { team: "Team Alpha", project: "AI Driven Analytics", phase: "Phase 2", time: "2h ago", status: "Pending" },
  { team: "Byte Me", project: "E-commerce Platform", phase: "Phase 1", time: "5h ago", status: "Reviewing" },
  { team: "Cyber Sentinels", project: "Network Security Tool", phase: "Phase 3", time: "Yesterday", status: "Completed" },
]

export default function FacultyDashboardPage() {
  return (
    <main className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, Dr. Jane</h1>
          <p className="text-muted-foreground text-lg">Manage your teams and evaluations efficiently.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <IconCalendarEvent className="mr-2 h-4 w-4" />
            Schedule
          </Button>
          <Button>
            <IconPlus className="mr-2 h-4 w-4" />
            New Evaluation
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        {/* Submissions Section */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
            <CardDescription>Direct access to the latest work from your teams.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {SUBMISSIONS.map((sub, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="space-y-1">
                  <p className="font-semibold">{sub.team}</p>
                  <p className="text-xs text-muted-foreground">{sub.project} • <span className="font-medium text-primary">{sub.phase}</span></p>
                </div>
                <div className="text-right space-y-1">
                  <Badge variant={sub.status === "Pending" ? "outline" : sub.status === "Reviewing" ? "secondary" : "default"}>
                    {sub.status}
                  </Badge>
                  <p className="text-[10px] text-muted-foreground">{sub.time}</p>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-xs">View All Submissions</Button>
          </CardContent>
        </Card>

        {/* Schedule & Alerts Section */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ScheduleItem title="Team Alpha - Phase 2 Viva" time="10:30 AM" />
              <ScheduleItem title="Byte Me - Discussion" time="02:00 PM" />
              
              <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg flex gap-3">
                <IconAlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-amber-900 dark:text-amber-100">Feedback Overdue</p>
                  <p className="text-xs text-amber-800 dark:text-amber-300">Team "Nexus" - Phase 1</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

function ScheduleItem({ title, time }: { title: string, time: string }) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-md border-l-4 border-primary bg-muted/30">
      <div className="text-xs font-bold text-primary w-16">{time}</div>
      <div className="text-sm font-medium">{title}</div>
    </div>
  )
}

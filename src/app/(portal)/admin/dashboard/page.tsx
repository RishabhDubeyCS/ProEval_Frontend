import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  IconUsers, 
  IconSchool, 
  IconBriefcase, 
  IconActivity,
  IconPlus,
  IconSettings,
  IconShieldCheck,
  IconAlertTriangle
} from "@tabler/icons-react"

export const metadata: Metadata = {
  title: "Admin Dashboard | ProEval AI",
  description: "System-wide overview and management",
}

const STATS = [
  { title: "Total Students", value: "1,240", icon: IconUsers, description: "Registered students", color: "text-blue-600" },
  { title: "Total Faculty", value: "84", icon: IconSchool, description: "Active faculty members", color: "text-indigo-600" },
  { title: "Active Teams", value: "312", icon: IconBriefcase, description: "Across all departments", color: "text-emerald-600" },
  { title: "System Status", value: "Optimal", icon: IconShieldCheck, description: "All services running", color: "text-green-600" },
]

const RECENT_LOGS = [
  { action: "New Faculty Registered", user: "Admin", target: "Dr. Smith", time: "10m ago", status: "Success" },
  { action: "Evaluation Phase Started", user: "System", target: "Phase 2", time: "1h ago", status: "Notification" },
  { action: "Database Backup", user: "System", target: "Daily Backup", time: "3h ago", status: "Success" },
  { action: "Login Failure Alert", user: "Unknown", target: "Multiple attempts", time: "5h ago", status: "Warning" },
]

export default function AdminDashboardPage() {
  return (
    <main className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground text-lg">System-wide monitoring and administrative controls.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <IconSettings className="mr-2 h-4 w-4" />
            System Config
          </Button>
          <Button>
            <IconPlus className="mr-2 h-4 w-4" />
            Add New User
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
        {/* Recent Activity/Logs */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>System Activity Logs</CardTitle>
            <CardDescription>Real-time audit trail of administrative actions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {RECENT_LOGS.map((log, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{log.action}</p>
                    {log.status === "Warning" && <IconAlertTriangle className="h-4 w-4 text-amber-500" />}
                  </div>
                  <p className="text-xs text-muted-foreground">Performed by: <span className="font-medium">{log.user}</span> on <span className="font-medium">{log.target}</span></p>
                </div>
                <div className="text-right space-y-1">
                  <Badge variant={log.status === "Success" ? "default" : log.status === "Warning" ? "destructive" : "secondary"}>
                    {log.status}
                  </Badge>
                  <p className="text-[10px] text-muted-foreground">{log.time}</p>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-xs">View All Logs</Button>
          </CardContent>
        </Card>

        {/* Quick Insights & Management */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Management Shortcuts</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <ShortcutItem 
                icon={IconUsers} 
                title="Student Registry" 
                count="1240 Students" 
                href="/admin/users" 
              />
              <ShortcutItem 
                icon={IconSchool} 
                title="Faculty Roster" 
                count="84 Professors" 
                href="/admin/faculties" 
              />
              <ShortcutItem 
                icon={IconBriefcase} 
                title="Active Projects" 
                count="312 Projects" 
                href="/admin/teams" 
              />
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Evaluation Phase</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xl font-bold">Phase 2</p>
                  <p className="text-xs text-muted-foreground">Ends in 5 days</p>
                </div>
                <Button size="sm">Modify</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

function ShortcutItem({ icon: Icon, title, count, href }: { icon: any, title: string, count: string, href: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-md bg-muted/30 border border-transparent hover:border-border transition-all cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-background rounded-md shadow-sm">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">{count}</p>
        </div>
      </div>
      <IconActivity className="h-4 w-4 text-muted-foreground/30" />
    </div>
  )
}

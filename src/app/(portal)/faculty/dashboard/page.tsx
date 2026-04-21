import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  IconUsers, 
  IconClipboardCheck, 
  IconClock, 
  IconCalendarEvent,
  IconPlus,
  IconDownload,
  IconEye,
  IconExternalLink,
  IconLayoutDashboard,
  IconAlertCircle
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
  { student: "Rahul Sharma", project: "AI Driven Analytics", programme: "B.Tech CSE", semester: "6th Semester" },
  { student: "Priya Patel", project: "E-commerce Platform", programme: "B.Tech CSE", semester: "4th Semester" },
  { student: "Amit Kumar", project: "Network Security Tool", programme: "B.Tech IT", semester: "8th Semester" },
  { student: "Sneha Reddy", project: "Healthcare App", programme: "M.Tech CSE", semester: "2nd Semester" },
  { student: "Vikram Singh", project: "Smart City IoT", programme: "B.Tech ECE", semester: "6th Semester" },
  { student: "Ananya Iyer", project: "Supply Chain Block", programme: "MBA IT", semester: "4th Semester" },
  { student: "Rohan Gupta", project: "NLP Chatbot", programme: "B.Tech CSE", semester: "6th Semester" },
  { student: "Meera Das", project: "AR Learning App", programme: "M.Tech AI", semester: "2nd Semester" },
  { student: "Karan Malhotra", project: "Fintech Wallet", programme: "B.Tech CSE", semester: "8th Semester" },
  { student: "Ishita Sen", project: "Smart Irrigation", programme: "B.Tech Agri", semester: "4th Semester" },
]

export default function FacultyDashboardPage() {
  return (
    <main className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-neutral-900 dark:text-white flex items-center gap-3">
             <IconLayoutDashboard className="h-8 w-8 text-primary" />
             Welcome back, Aditya Patel 
          </h1>
          <p className="text-muted-foreground text-lg font-medium mt-1">Manage your teams and evaluations efficiently.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl h-11 px-6 border-neutral-200 dark:border-neutral-800" asChild>
            <Link href="/faculty/schedule">
              <IconCalendarEvent className="mr-2 h-4 w-4 text-primary" />
              Schedule
            </Link>
          </Button>
          <Button className="rounded-xl h-11 px-6 shadow-lg shadow-primary/20" asChild>
            <Link href="/faculty/evaluations">
              <IconPlus className="mr-2 h-4 w-4" />
              New Evaluation
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, idx) => (
          <Card key={stat.title} className="hover:shadow-xl transition-all duration-300 border-none bg-white dark:bg-neutral-900 rounded-[2rem] overflow-hidden group">
            <div className={cn("h-1 w-full", stat.color.replace('text-', 'bg-'))} />
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">{stat.title}</CardTitle>
              <div className={cn("p-2 rounded-xl group-hover:scale-110 transition-transform", stat.color.replace('text-', 'bg-').replace('600', '50'))}>
                <stat.icon className={cn("h-4 w-4", stat.color)} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black tracking-tighter">{stat.value}</div>
              <p className="text-[10px] font-bold text-muted-foreground mt-1 uppercase tracking-widest">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-6">
        {/* Project Overview Section */}
        <Card className="w-full border-none shadow-sm rounded-[2.5rem] bg-white dark:bg-neutral-900 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between p-8">
            <div>
              <CardTitle className="text-2xl font-black">Project Overview</CardTitle>
              <CardDescription className="font-medium">Summary of all supervised projects and student distributions.</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="rounded-xl h-10 px-4">
                <IconDownload className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
              <Button variant="outline" size="sm" className="rounded-xl h-10 px-4" asChild>
                <Link href="/faculty/studentproject">
                  <IconEye className="mr-2 h-4 w-4" />
                  View All
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto px-8 pb-8">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/50">
                    <th className="p-5 font-black uppercase tracking-widest text-muted-foreground text-[10px]">Student</th>
                    <th className="p-5 font-black uppercase tracking-widest text-muted-foreground text-[10px]">Project Title</th>
                    <th className="p-5 font-black uppercase tracking-widest text-muted-foreground text-[10px]">Programme</th>
                    <th className="p-5 font-black uppercase tracking-widest text-muted-foreground text-[10px]">Semester</th>
                    <th className="p-5 font-black uppercase tracking-widest text-muted-foreground text-[10px] text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                  {SUBMISSIONS.map((sub, i) => (
                    <tr key={i} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors group">
                      <td className="p-5">
                         <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs uppercase">
                               {sub.student.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="font-bold text-neutral-800 dark:text-neutral-200">{sub.student}</span>
                         </div>
                      </td>
                      <td className="p-5 font-medium group-hover:text-primary transition-colors">{sub.project}</td>
                      <td className="p-5">
                         <Badge variant="outline" className="rounded-lg font-bold text-[10px] bg-neutral-100/50 dark:bg-neutral-800/50 border-none uppercase tracking-tighter px-3">
                            {sub.programme}
                         </Badge>
                      </td>
                      <td className="p-5">
                        <Badge variant="outline" className="rounded-lg font-bold text-[10px] bg-neutral-100/50 dark:bg-neutral-800/50 border-none uppercase px-3">
                           {sub.semester}
                        </Badge>
                      </td>
                      <td className="p-5 text-right">
                        <Button size="sm" variant="ghost" className="h-9 rounded-xl text-primary font-bold hover:bg-primary hover:text-white transition-all px-4" asChild>
                          <Link href="/faculty/evaluations">
                            <IconExternalLink className="mr-2 h-4 w-4" />
                            Evaluate
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Schedule & Alerts Section */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="lg:col-span-2 border-none shadow-sm rounded-[2.5rem] bg-white dark:bg-neutral-900 p-4">
            <CardHeader>
              <CardTitle className="text-xl font-black">Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <ScheduleItem title="Team Alpha - Phase 2 Viva" time="10:30 AM" />
                <ScheduleItem title="Byte Me - Discussion" time="02:00 PM" />
                <ScheduleItem title="Smart City - Review" time="04:15 PM" />
                <ScheduleItem title="NLP Chatbot - Mentoring" time="05:00 PM" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-sm rounded-[2.5rem] bg-white dark:bg-neutral-900 p-4 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <IconAlertCircle className="h-32 w-32" />
            </div>
            <CardHeader>
              <CardTitle className="text-xl font-black">Important Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900 rounded-3xl flex gap-4 hover:scale-[1.02] transition-transform cursor-pointer">
                <IconClock className="h-6 w-6 text-amber-600 shrink-0" />
                <div>
                  <p className="text-sm font-black text-amber-900 dark:text-amber-100 uppercase tracking-widest">Feedback Overdue</p>
                  <p className="text-xs font-bold text-amber-800 dark:text-amber-300 mt-1">Team "Nexus" - Phase 1 Review</p>
                </div>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900 rounded-3xl flex gap-4 hover:scale-[1.02] transition-transform cursor-pointer">
                <IconCalendarEvent className="h-6 w-6 text-blue-600 shrink-0" />
                <div>
                  <p className="text-sm font-black text-blue-900 dark:text-blue-100 uppercase tracking-widest">Next Deadline</p>
                  <p className="text-xs font-bold text-blue-800 dark:text-blue-300 mt-1">Phase 3 Final Submissions (May 1st)</p>
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
    <div className="flex items-center gap-4 p-4 rounded-3xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 group hover:border-primary transition-colors cursor-pointer">
      <div className="text-xs font-black text-primary w-20 uppercase tracking-tighter">{time}</div>
      <div className="text-sm font-bold text-neutral-800 dark:text-neutral-200 group-hover:text-primary transition-colors">{title}</div>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ')
}

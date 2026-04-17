"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  IconSearch,
  IconFilter,
  IconFileCheck,
  IconClock,
  IconCircleCheck,
  IconAlertCircle,
  IconDownload,
  IconExternalLink,
  IconArrowRight
} from "@tabler/icons-react"

interface Submission {
  id: string;
  teamName: string;
  projectName: string;
  phase: string;
  submittedAt: string;
  status: "pending" | "reviewed" | "delayed";
  score?: number;
}

const SUBMISSIONS: Submission[] = [
  {
    id: "SUB-001",
    teamName: "Team Alpha",
    projectName: "AI Driven Predictive Analytics",
    phase: "Phase 2",
    submittedAt: "Oct 12, 2025, 11:30 AM",
    status: "pending",
  },
  {
    id: "SUB-002",
    teamName: "Byte Me",
    projectName: "E-commerce Platform with AR",
    phase: "Phase 1",
    submittedAt: "Oct 14, 2025, 02:45 PM",
    status: "pending",
  },
  {
    id: "SUB-003",
    teamName: "Nexus",
    projectName: "IoT Smart Home Energy Management",
    phase: "Phase 2",
    submittedAt: "Oct 10, 2025, 09:15 AM",
    status: "reviewed",
    score: 85,
  },
  {
    id: "SUB-004",
    teamName: "Cyber Sentinels",
    projectName: "Blockchain Secure Voting",
    phase: "Phase 3",
    submittedAt: "Sep 25, 2025, 04:20 PM",
    status: "reviewed",
    score: 92,
  },
  {
    id: "SUB-005",
    teamName: "Data Wizards",
    projectName: "ML based Stock Market Predictor",
    phase: "Phase 1",
    submittedAt: "Oct 15, 2025, 10:00 AM",
    status: "pending",
  }
]

export default function FacultyEvaluationsPage() {
  const [search, setSearch] = useState("")

  const pendingSubmissions = SUBMISSIONS.filter(s => s.status === "pending")
  const completedSubmissions = SUBMISSIONS.filter(s => s.status === "reviewed")

  return (
    <main className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Evaluations</h1>
          <p className="text-muted-foreground text-lg">Review submissions and provide academic feedback.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline">
              <IconDownload className="mr-2 h-4 w-4" />
              Export Report
           </Button>
        </div>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <TabsList>
            <TabsTrigger value="pending" className="relative">
              Pending
              <Badge className="ml-2 bg-primary/20 text-primary hover:bg-primary/20 border-none px-1.5 h-5 min-w-5 justify-center">
                {pendingSubmissions.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <div className="flex flex-1 w-full md:max-w-md gap-2">
            <div className="relative flex-1">
              <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search teams or projects..." 
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="All Phases" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Phases</SelectItem>
                <SelectItem value="p1">Phase 1</SelectItem>
                <SelectItem value="p2">Phase 2</SelectItem>
                <SelectItem value="p3">Phase 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="pending" className="space-y-4 outline-none">
          {pendingSubmissions.length === 0 ? (
            <EmptyState message="No pending submissions to review." />
          ) : (
            pendingSubmissions.map((sub) => (
              <SubmissionCard key={sub.id} submission={sub} />
            ))
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 outline-none">
          {completedSubmissions.length === 0 ? (
            <EmptyState message="No completed evaluations found." />
          ) : (
            completedSubmissions.map((sub) => (
              <SubmissionCard key={sub.id} submission={sub} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </main>
  )
}

function SubmissionCard({ submission }: { submission: Submission }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row md:items-center p-6 gap-6">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
             <IconFileCheck className="h-6 w-6 text-primary" />
          </div>
          
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
               <h3 className="font-bold text-lg">{submission.teamName}</h3>
               <Badge variant="outline" className="text-[10px] uppercase tracking-wider h-5">
                 {submission.phase}
               </Badge>
               {submission.status === "reviewed" && (
                 <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/10 border-green-500/20 text-[10px] h-5">
                   Score: {submission.score}/100
                 </Badge>
               )}
            </div>
            <p className="text-muted-foreground text-sm line-clamp-1">
              {submission.projectName}
            </p>
            <div className="flex items-center gap-4 pt-1">
               <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <IconClock className="h-3.5 w-3.5" />
                  {submission.submittedAt}
               </div>
               <div className="text-xs text-muted-foreground font-mono">
                  {submission.id}
               </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
             <Button variant="ghost" size="sm" className="h-9 gap-2">
                <IconDownload className="h-4 w-4" />
                Files
             </Button>
             <Button size="sm" className="h-9 gap-2 group">
                {submission.status === "pending" ? "Start Review" : "View Feedback"}
                <IconArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
             </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-muted/20 border border-dashed rounded-xl space-y-3">
       <IconCircleCheck className="h-10 w-10 text-muted-foreground/40" />
       <p className="text-muted-foreground font-medium">{message}</p>
    </div>
  )
}

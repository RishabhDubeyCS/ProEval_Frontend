"use client"

import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  IconUsers, 
  IconSearch, 
  IconFilter, 
  IconMessageCircle, 
  IconClipboardCheck,
  IconCalendarEvent,
  IconExternalLink,
  IconDotsVertical,
  IconLayoutGrid
} from "@tabler/icons-react"
import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"

interface TeamMember {
  name: string;
  avatar?: string;
  initial: string;
}

interface Team {
  id: string;
  name: string;
  project: string;
  phase: string;
  progress: number;
  members: TeamMember[];
  status: string;
  lastSubmission: string;
  nextMeeting: string;
}

const TEAMS: Team[] = [
  {
    id: "T101",
    name: "Team Alpha",
    project: "AI Driven Predictive Analytics for Healthcare",
    phase: "Phase 2",
    progress: 65,
    members: [
      { name: "John Doe", avatar: "https://github.com/shadcn.png", initial: "JD" },
      { name: "Sarah Smith", initial: "SS" },
      { name: "Mike Ross", initial: "MR" },
    ],
    status: "Active",
    lastSubmission: "Oct 12, 2025",
    nextMeeting: "Oct 20, 10:30 AM"
  },
  {
    id: "T105",
    name: "Byte Me",
    project: "E-commerce Platform with AR Virtual Try-on",
    phase: "Phase 1",
    progress: 30,
    members: [
      { name: "Emma Watson", initial: "EW" },
      { name: "Robert Brown", initial: "RB" },
    ],
    status: "Pending Review",
    lastSubmission: "Oct 15, 2025",
    nextMeeting: "Oct 21, 02:00 PM"
  },
  {
    id: "T112",
    name: "Cyber Sentinels",
    project: "Blockchain-based Secure Voting System",
    phase: "Phase 3",
    progress: 90,
    members: [
      { name: "Alice Green", initial: "AG" },
      { name: "Bob White", initial: "BW" },
      { name: "Charlie Black", initial: "CB" },
      { name: "Diana Prince", initial: "DP" },
    ],
    status: "Delayed",
    lastSubmission: "Sep 28, 2025",
    nextMeeting: "Oct 19, 11:00 AM"
  },
  {
    id: "T120",
    name: "Nexus",
    project: "IoT Smart Home Energy Management",
    phase: "Phase 2",
    progress: 55,
    members: [
      { name: "Kevin Hart", initial: "KH" },
      { name: "James Bond", initial: "JB" },
    ],
    status: "Active",
    lastSubmission: "Oct 10, 2025",
    nextMeeting: "Oct 22, 04:00 PM"
  }
]

export default function FacultyTeamsPage() {
  const [search, setSearch] = useState("")
  const [isCalendarView, setIsCalendarView] = useState(false)

  return (
    <main className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Teams</h1>
          <p className="text-muted-foreground text-lg">Manage and guide your assigned project teams.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button 
            variant={isCalendarView ? "default" : "outline"}
            onClick={() => setIsCalendarView(!isCalendarView)}
           >
              {isCalendarView ? (
                <>
                  <IconLayoutGrid className="mr-2 h-4 w-4" />
                  Grid View
                </>
              ) : (
                <>
                  <IconCalendarEvent className="mr-2 h-4 w-4" />
                  Calendar View
                </>
              )}
           </Button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search teams or projects..." 
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="delayed">Delayed</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Phase" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Phases</SelectItem>
              <SelectItem value="p1">Phase 1</SelectItem>
              <SelectItem value="p2">Phase 2</SelectItem>
              <SelectItem value="p3">Phase 3</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
             <IconFilter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content Area */}
      {isCalendarView ? (
        <Card className="p-6">
          <div className="flex justify-center">
            <Calendar 
              mode="single"
              className="rounded-md border shadow"
              onTeamsViewClick={() => setIsCalendarView(false)}
            />
          </div>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {TEAMS.map((team) => (
            <Card key={team.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-muted/60">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                        {team.id}
                      </span>
                      <Badge variant={
                        team.status === "Active" ? "default" : 
                        team.status === "Pending Review" ? "secondary" : 
                        "destructive"
                      } className="text-[10px] h-5 px-1.5">
                        {team.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {team.name}
                    </CardTitle>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <IconDotsVertical className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription className="line-clamp-1 font-medium text-foreground/80 pt-1">
                  {team.project}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Progress Section */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-muted-foreground">{team.phase} Progress</span>
                    <span>{team.progress}%</span>
                  </div>
                  <Progress value={team.progress} className="h-1.5" />
                </div>

                {/* Members Section */}
                <div className="flex items-center justify-between py-2 border-y border-muted/40">
                  <div className="flex -space-x-2 overflow-hidden">
                    {team.members.map((member, i) => (
                      <Avatar key={i} className="inline-block border-2 border-background ring-2 ring-transparent group-hover:ring-primary/10 transition-all h-8 w-8">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="text-[10px] bg-slate-100">{member.initial}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <div className="text-right">
                     <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Last Submission</p>
                     <p className="text-xs font-medium">{team.lastSubmission}</p>
                  </div>
                </div>

                {/* Next Meet Section */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-muted/50">
                   <IconCalendarEvent className="h-4 w-4 text-primary" />
                   <div className="flex-1">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Next Meeting</p>
                      <p className="text-xs font-semibold">{team.nextMeeting}</p>
                   </div>
                   <Button size="sm" variant="ghost" className="h-7 text-[10px] px-2">Reschedule</Button>
                </div>

                {/* Actions Section */}
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs">
                    <IconMessageCircle className="h-3.5 w-3.5" />
                    Chat
                  </Button>
                  <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs">
                    <IconClipboardCheck className="h-3.5 w-3.5" />
                    Review
                  </Button>
                  <Button size="sm" className="h-9 gap-1.5 text-xs">
                    <IconExternalLink className="h-3.5 w-3.5" />
                    View Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State / Pagination */}
      {!isCalendarView && (
        <div className="flex items-center justify-center pt-8">
           <p className="text-sm text-muted-foreground">Showing 4 of 8 active teams assigned to you.</p>
        </div>
      )}
    </main>
  )
}

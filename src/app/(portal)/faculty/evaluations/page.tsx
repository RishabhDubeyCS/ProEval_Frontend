"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
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
  IconArrowRight,
  IconSparkles,
  IconUser,
  IconBook,
  IconLoader2
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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    teamLeaderName: "",
    teamId: "",
    programme: "",
    semester: "",
    phase: "Phase 2",
    projectTitle: "",
    githubUrl: "",
    progressNotes: "",
    completedMilestone: "",
    scores: {
      innovation: 5,
      technicalDepth: 5,
      implementation: 5,
      documentation: 5,
      resultImpact: 5,
      codeQuality: 5
    }
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleScoreChange = (criterion: string, score: number) => {
    setFormData(prev => ({
      ...prev,
      scores: { ...prev.scores, [criterion]: score }
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch("/api/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        alert("AI Evaluation report generated successfully!")
      } else {
        alert("Failed to generate AI evaluation.")
      }
    } catch (error) {
      alert("An error occurred. Please check your connection.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const CRITERIA = [
    { id: "innovation", label: "Innovation" },
    { id: "technicalDepth", label: "Technical Depth" },
    { id: "implementation", label: "Implementation" },
    { id: "documentation", label: "Documentation" },
    { id: "resultImpact", label: "Result & Impact" },
    { id: "codeQuality", label: "Code Quality" },
  ]

  const pendingSubmissions = SUBMISSIONS.filter(s => s.status === "pending")
  const completedSubmissions = SUBMISSIONS.filter(s => s.status === "reviewed")

  return (
    <main className="p-6 space-y-10 max-w-7xl mx-auto" suppressHydrationWarning>
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

      {/* AI-Assisted Evaluation Section */}
      <Card className="border-primary/20 shadow-sm bg-gradient-to-br from-background to-primary/5">
        <CardHeader className="border-b bg-background/50 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <IconSparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>AI-Assisted Evaluation</CardTitle>
              <CardDescription>Generate an automated AI report based on team submissions and technical scores.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Top Row: Team & Project Basics */}
            <div className="grid gap-6 md:grid-cols-4">
              <div className="md:col-span-1 space-y-2">
                <Label htmlFor="teamLeaderName" className="text-sm font-semibold">Team Leader Name</Label>
                <div className="relative">
                  <IconUser className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="teamLeaderName" name="teamLeaderName" placeholder="Rahul Sharma" className="pl-9" required value={formData.teamLeaderName} onChange={handleInputChange} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="teamId" className="text-sm font-semibold">Team ID</Label>
                <Input id="teamId" name="teamId" placeholder="TEAM-2024-001" required value={formData.teamId} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="programme" className="text-sm font-semibold">Programme</Label>
                <Select required onValueChange={(v) => handleSelectChange("programme", v)} value={formData.programme}>
                  <SelectTrigger id="programme"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="btech_cse">B.Tech CSE</SelectItem>
                    <SelectItem value="btech_it">B.Tech IT</SelectItem>
                    <SelectItem value="mtech_ai">M.Tech AI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="semester" className="text-sm font-semibold">Semester</Label>
                <Select required onValueChange={(v) => handleSelectChange("semester", v)} value={formData.semester}>
                  <SelectTrigger id="semester"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                      <SelectItem key={s} value={s.toString()}>Semester {s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Left Column: Phase & Deliverables */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-primary">Evaluation Phase</Label>
                  <div className="flex flex-wrap gap-2">
                    {["Phase 2", "Phase 3"].map((p) => (
                      <Button key={p} type="button" variant={formData.phase === p ? "default" : "outline"} size="sm" className="rounded-full" onClick={() => handleSelectChange("phase", p)}>
                        {p}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectTitle" className="text-sm font-semibold">Project Title</Label>
                  <Input id="projectTitle" name="projectTitle" placeholder="Project Title" required value={formData.projectTitle} onChange={handleInputChange} />
                </div>

                {/* Conditional Phase 2 Fields */}
                {formData.phase === "Phase 2" && (
                  <div className="grid gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="space-y-2">
                      <Label htmlFor="githubUrl" className="text-sm font-semibold">GitHub URL</Label>
                      <Input id="githubUrl" name="githubUrl" placeholder="https://github.com/team/repo" value={formData.githubUrl} onChange={handleInputChange} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-primary">Zip File</Label>
                        <Input type="file" className="text-xs h-9 cursor-pointer file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-primary">PPT Upload</Label>
                        <Input type="file" className="text-xs h-9 cursor-pointer file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="completedMilestone" className="text-sm font-semibold">Completed Milestone</Label>
                      <Input id="completedMilestone" name="completedMilestone" placeholder="e.g. Backend API Integration" value={formData.completedMilestone} onChange={handleInputChange} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="progressNotes" className="text-sm font-semibold">Progress Notes</Label>
                      <Textarea id="progressNotes" name="progressNotes" placeholder="Summary of work completed so far..." className="h-24" value={formData.progressNotes} onChange={handleInputChange} />
                    </div>
                  </div>
                )}
                
                {formData.phase === "Phase 3" && (
                  <div className="p-8 rounded-xl bg-muted/30 border border-dashed flex flex-col items-center justify-center text-center space-y-2">
                    <IconBook className="h-8 w-8 text-muted-foreground/50" />
                    <p className="text-sm font-medium text-muted-foreground">Phase 3 Final Evaluation</p>
                    <p className="text-xs text-muted-foreground/70">Please ensure all final deliverables are reviewed before generating the report.</p>
                  </div>
                )}
              </div>

              {/* Right Column: AI Process & Rubric Weights */}
              <div className="space-y-6">
                <div className="p-5 rounded-xl border border-primary/20 bg-primary/5 space-y-4">
                  <div className="flex items-center gap-2 text-primary">
                    <IconSparkles className="h-5 w-5" />
                    <h3 className="font-bold">How AI Evaluation Works</h3>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex gap-3">
                      <Badge variant="outline" className="h-5 w-5 rounded-full p-0 flex items-center justify-center shrink-0 border-primary/30">1</Badge>
                      <p><span className="font-semibold">Data Extraction:</span> Automatically extracts key features from GitHub repos, PDFs, and ZIP files.</p>
                    </li>
                    <li className="flex gap-3">
                      <Badge variant="outline" className="h-5 w-5 rounded-full p-0 flex items-center justify-center shrink-0 border-primary/30">2</Badge>
                      <p><span className="font-semibold">Semantic Analysis:</span> Uses NLP to analyze technical depth and documentation clarity.</p>
                    </li>
                    <li className="flex gap-3">
                      <Badge variant="outline" className="h-5 w-5 rounded-full p-0 flex items-center justify-center shrink-0 border-primary/30">3</Badge>
                      <p><span className="font-semibold">Code Profiling:</span> Evaluates code quality, structure, and implementation complexity.</p>
                    </li>
                    <li className="flex gap-3">
                      <Badge variant="outline" className="h-5 w-5 rounded-full p-0 flex items-center justify-center shrink-0 border-primary/30">4</Badge>
                      <p><span className="font-semibold">Objective Scoring:</span> Maps findings against academic rubrics for unbiased grading.</p>
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-xl border border-muted bg-muted/20 space-y-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <IconFilter className="h-5 w-5" />
                    <h3 className="font-bold text-foreground">Active Rubric Weights</h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: "Innovation & Originality", weight: 20 },
                      { label: "Technical Depth", weight: 20 },
                      { label: "Implementation", weight: 15 },
                      { label: "Documentation", weight: 15 },
                      { label: "Result & Social Impact", weight: 20 },
                      { label: "Code Quality", weight: 10 },
                    ].map((item) => (
                      <div key={item.label} className="space-y-1.5">
                        <div className="flex justify-between text-xs font-medium">
                          <span>{item.label}</span>
                          <span>{item.weight}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all duration-500" 
                            style={{ width: `${item.weight}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 flex gap-3">
                  <IconAlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
                  <p className="text-xs text-amber-800 leading-relaxed">
                    <strong>Note:</strong> AI generated scores are preliminary and should be reviewed by faculty before final submission.
                  </p>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full md:w-auto h-11 px-10 gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20" disabled={isSubmitting}>
              {isSubmitting ? <><IconLoader2 className="h-4 w-4 animate-spin" /> Generating...</> : <><IconSparkles className="h-4 w-4" /> Generate AI Evaluation</>}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-2">
          <IconFileCheck className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-xl font-bold tracking-tight uppercase">Recent Evaluations</h2>
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
      </div>
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


"use client";

import React, { useState, useMemo } from "react";
import { 
  IconSearch, 
  IconFilter, 
  IconDownload, 
  IconUsers, 
  IconClipboardCheck, 
  IconChartBar,
  IconDotsVertical,
  IconAlertCircle,
  IconCalendarStats,
  IconBrandOpenai,
  IconMessageHeart,
  IconX,
  IconSend,
  IconRocket,
  IconFileDownload,
  IconCircleCheckFilled,
  IconSparkles
} from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Mock Data for supervised projects
const projectsData = [
  {
    id: "PROJ-8821",
    teamId: "TM-001",
    student: { name: "Alex Rivera", email: "alex@example.com", avatar: "" },
    title: "Neuro-Sync: EEG Pattern Recognition",
    programme: "B.Tech CS",
    domain: "Neuroscience",
    phase: "Phase 2",
    status: "In Review",
    aiScore: 88,
    submittedDate: "2026-04-18",
    submittedStatus: "On Time",
    aiSummary: "The project demonstrates exceptional algorithmic efficiency in pattern recognition. However, the signal-to-noise ratio handling needs optimization in real-time scenarios. Code architecture follows industry standards."
  },
  {
    id: "PROJ-8822",
    teamId: "TM-042",
    student: { name: "Sarah Chen", email: "sarah@example.com", avatar: "" },
    title: "GreenGrid: Smart Energy Optimization",
    programme: "M.Tech AI",
    domain: "Sustainability",
    phase: "Phase 3",
    status: "Pending",
    aiScore: 94,
    submittedDate: "2026-04-20",
    submittedStatus: "Early",
    aiSummary: "Outstanding integration of reinforcement learning for grid balancing. The predictive model shows 94% accuracy. Documentation is comprehensive and technical depth is significant."
  },
  {
    id: "PROJ-8823",
    teamId: "TM-105",
    student: { name: "Marcus Thorne", email: "marcus@example.com", avatar: "" },
    title: "VisionTrack: AR Navigation for Blind",
    programme: "B.Tech CS",
    domain: "Assistive Tech",
    phase: "Phase 1",
    status: "Evaluated",
    aiScore: 76,
    submittedDate: "2026-04-15",
    submittedStatus: "Delayed",
    aiSummary: "Innovative concept but the latency in spatial mapping exceeds the safety threshold for real-time navigation. UI/UX design requires significant accessibility improvements."
  },
  {
    id: "PROJ-8824",
    teamId: "TM-088",
    student: { name: "Elena Kostic", email: "elena@example.com", avatar: "" },
    title: "AquaSafe: Water Purity Monitoring",
    programme: "B.Tech ME",
    domain: "IoT",
    phase: "Phase 2",
    status: "Pending",
    aiScore: 82,
    submittedDate: "2026-04-19",
    submittedStatus: "On Time",
    aiSummary: "Sensor integration is robust. The data visualization dashboard provides clear insights. Recommendations: Add predictive maintenance alerts for the hardware sensors."
  }
];

const StudentProjectsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [programmeFilter, setProgrammeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [domainFilter, setDomainFilter] = useState("all");
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  
  // Feedback States
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<typeof projectsData[0] | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [attachAIReport, setAttachAIReport] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filtering Logic
  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      const matchesSearch = 
        project.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.teamId.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesProgramme = programmeFilter === "all" || project.programme === programmeFilter;
      const matchesStatus = statusFilter === "all" || project.status === statusFilter;
      const matchesDomain = domainFilter === "all" || project.domain === domainFilter;

      return matchesSearch && matchesProgramme && matchesStatus && matchesDomain;
    });
  }, [searchQuery, programmeFilter, statusFilter, domainFilter]);

  // Stats
  const stats = {
    total: projectsData.length,
    pending: projectsData.filter(p => p.status === "Pending").length,
    avgScore: Math.round(projectsData.reduce((acc, curr) => acc + curr.aiScore, 0) / projectsData.length)
  };

  const handleOpenFeedback = (project: typeof projectsData[0]) => {
    setActiveProject(project);
    setIsFeedbackOpen(true);
    setFeedbackText("");
    setAttachAIReport(true);
  };

  const handleDownloadAIReport = () => {
    toast.info("Generating PDF Report...", {
      description: "Preparing AI performance analysis for download.",
    });
    // Simulate download
    setTimeout(() => {
      toast.success("Report downloaded successfully!", {
        icon: <IconFileDownload className="h-4 w-4" />,
      });
    }, 1200);
  };

  const handleSendFeedback = () => {
    if (!feedbackText.trim()) {
      toast.error("Please enter some feedback first.");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success(`Feedback ${attachAIReport ? "& AI Report " : ""}sent to ${activeProject?.student.name}!`, {
        description: "The team will receive a notification in their portal.",
        icon: <IconCircleCheckFilled className="h-5 w-5 text-green-500" />
      });
      setIsSubmitting(false);
      setIsFeedbackOpen(false);
      setFeedbackText("");
      setActiveProject(null);
    }, 1500);
  };

  const toggleSelectAll = () => {
    if (selectedTeams.length === filteredProjects.length) {
      setSelectedTeams([]);
    } else {
      setSelectedTeams(filteredProjects.map(p => p.teamId));
    }
  };

  const toggleSelectTeam = (teamId: string) => {
    setSelectedTeams(prev => 
      prev.includes(teamId) ? prev.filter(id => id !== teamId) : [...prev, teamId]
    );
  };

  return (
    <div className="p-6 md:p-8 space-y-8 bg-neutral-50/50 dark:bg-neutral-950/50 min-h-screen relative" suppressHydrationWarning>
      {/* Header & Main Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3 text-neutral-900 dark:text-white">
            <IconRocket className="text-primary h-8 w-8" />
            Supervised Projects
          </h1>
          <p className="text-muted-foreground mt-1 font-medium">Monitoring and evaluating {stats.total} innovation ventures.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl gap-2 h-11 border-neutral-200 dark:border-neutral-800">
            <IconDownload className="h-4 w-4" /> Export Report
          </Button>
          <Button className="rounded-xl gap-2 h-11 shadow-lg shadow-primary/20">
            <IconClipboardCheck className="h-4 w-4" /> Bulk Evaluate
          </Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Supervised", value: stats.total, icon: IconUsers, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/20" },
          { label: "Pending Evaluations", value: stats.pending, icon: IconAlertCircle, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950/20" },
          { label: "Average AI Score", value: `${stats.avgScore}%`, icon: IconChartBar, color: "text-green-500", bg: "bg-green-50 dark:bg-green-950/20" },
        ].map((stat, idx) => (
          <Card key={idx} className="border-none shadow-sm rounded-3xl overflow-hidden group hover:shadow-md transition-all">
            <CardContent className="p-6 flex items-center gap-5">
              <div className={cn("p-4 rounded-2xl group-hover:scale-110 transition-transform", stat.bg)}>
                <stat.icon className={cn("h-7 w-7", stat.color)} />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-black mt-1">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Control Bar: Filters & Search */}
      <Card className="rounded-[2rem] border-none shadow-sm bg-white dark:bg-neutral-900 overflow-visible">
        <CardContent className="p-4 md:p-6 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1 group">
              <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                placeholder="Search by student name, title, or team ID..." 
                className="pl-11 h-12 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Select value={programmeFilter} onValueChange={setProgrammeFilter}>
                <SelectTrigger className="w-[160px] h-12 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border-none shadow-none">
                  <SelectValue placeholder="Programme" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-none shadow-xl">
                  <SelectItem value="all">All Programmes</SelectItem>
                  <SelectItem value="B.Tech CS">B.Tech CS</SelectItem>
                  <SelectItem value="M.Tech AI">M.Tech AI</SelectItem>
                  <SelectItem value="B.Tech ME">B.Tech ME</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px] h-12 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border-none shadow-none">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-none shadow-xl">
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Review">In Review</SelectItem>
                  <SelectItem value="Evaluated">Evaluated</SelectItem>
                </SelectContent>
              </Select>

              <Select value={domainFilter} onValueChange={setDomainFilter}>
                <SelectTrigger className="w-[160px] h-12 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border-none shadow-none">
                  <SelectValue placeholder="Domain" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-none shadow-xl">
                  <SelectItem value="all">All Domains</SelectItem>
                  <SelectItem value="Neuroscience">Neuroscience</SelectItem>
                  <SelectItem value="Sustainability">Sustainability</SelectItem>
                  <SelectItem value="Assistive Tech">Assistive Tech</SelectItem>
                  <SelectItem value="IoT">IoT</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl hover:bg-neutral-100 dark:hover:bg-neutral-800">
                <IconFilter className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project "Chart" Grid / Table */}
      <div className="overflow-x-auto rounded-[2rem] border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/50">
              <th className="p-5 w-12 text-center">
                <Checkbox 
                  checked={selectedTeams.length === filteredProjects.length && filteredProjects.length > 0} 
                  onCheckedChange={toggleSelectAll}
                  className="rounded-md"
                />
              </th>
              <th className="p-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Student & Team</th>
              <th className="p-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Project Details</th>
              <th className="p-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Domain & Track</th>
              <th className="p-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Phase & Status</th>
              <th className="p-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">AI Score</th>
              <th className="p-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Submission</th>
              <th className="p-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.tr 
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={project.id} 
                  className={cn(
                    "group hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors",
                    selectedTeams.includes(project.teamId) && "bg-primary/5 dark:bg-primary/10"
                  )}
                >
                  <td className="p-5 text-center">
                    <Checkbox 
                      checked={selectedTeams.includes(project.teamId)} 
                      onCheckedChange={() => toggleSelectTeam(project.teamId)}
                      className="rounded-md"
                    />
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10 border-2 border-white dark:border-neutral-800 shadow-sm">
                        <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">{project.student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-bold text-neutral-800 dark:text-neutral-200">{project.student.name}</p>
                        <p className="text-[10px] font-black text-primary uppercase tracking-tighter">{project.teamId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="max-w-[200px]">
                      <p className="text-sm font-bold truncate group-hover:text-primary transition-colors" title={project.title}>{project.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{project.id}</p>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="space-y-1.5">
                      <Badge variant="outline" className="rounded-lg font-bold text-[10px] bg-neutral-100/50 dark:bg-neutral-800/50 border-none">{project.programme}</Badge>
                      <p className="text-xs font-medium text-muted-foreground ml-1">{project.domain}</p>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="space-y-2">
                       <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black text-muted-foreground uppercase">{project.phase}</span>
                          <div className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                       </div>
                       <Badge className={cn(
                         "rounded-full px-3 py-0.5 font-bold text-[10px] border-none",
                         project.status === "Pending" ? "bg-orange-100 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400" :
                         project.status === "In Review" ? "bg-blue-100 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400" :
                         "bg-green-100 text-green-600 dark:bg-green-950/30 dark:text-green-400"
                       )}>
                         {project.status}
                       </Badge>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex flex-col items-center gap-2 min-w-[120px]">
                       <div className="flex items-center gap-1.5 text-primary">
                          <IconBrandOpenai className="h-3.5 w-3.5" />
                          <span className="text-lg font-black tracking-tighter">{project.aiScore}%</span>
                       </div>
                       <div className="w-full h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: `${project.aiScore}%` }}
                          />
                       </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                        <IconCalendarStats className="h-3.5 w-3.5 text-muted-foreground" />
                        {new Date(project.submittedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                      <span className={cn(
                        "text-[10px] font-black uppercase tracking-widest",
                        project.submittedStatus === "Delayed" ? "text-red-500" : "text-green-500"
                      )}>
                        {project.submittedStatus}
                      </span>
                    </div>
                  </td>
                  <td className="p-5 text-center">
                    <div className="flex items-center justify-center gap-2">
                       <Button 
                        size="sm" 
                        variant="outline" 
                        className="rounded-xl h-9 gap-2 font-bold text-xs bg-neutral-100/50 dark:bg-neutral-800/50 border-none hover:bg-primary hover:text-white transition-all"
                        onClick={() => handleOpenFeedback(project)}
                       >
                         <IconMessageHeart className="h-4 w-4" /> Feedback
                       </Button>
                       <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800">
                        <IconDotsVertical className="h-4 w-4" />
                       </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        
        {filteredProjects.length === 0 && (
          <div className="p-20 text-center flex flex-col items-center gap-4">
            <div className="p-6 rounded-full bg-neutral-50 dark:bg-neutral-900 border border-dashed border-neutral-200 dark:border-neutral-800">
               <IconSearch className="h-12 w-12 text-muted-foreground opacity-20" />
            </div>
            <div>
               <p className="text-xl font-bold text-neutral-900 dark:text-white">No projects found</p>
               <p className="text-muted-foreground">Adjust your filters or search query to find specific teams.</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between px-2 pb-10">
        <p className="text-sm font-medium text-muted-foreground">
          Showing <span className="text-neutral-900 dark:text-white font-black">{filteredProjects.length}</span> of {projectsData.length} active supervised projects.
        </p>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="h-10 w-10 p-0 rounded-xl" disabled>1</Button>
           <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl">2</Button>
           <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl">3</Button>
        </div>
      </div>

      {/* Feedback & AI Report Modal */}
      <AnimatePresence>
        {isFeedbackOpen && activeProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <Card className="rounded-[2.5rem] border-none shadow-2xl bg-white dark:bg-neutral-900 overflow-hidden">
                <div className="h-2 bg-primary" />
                <CardHeader className="p-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl font-black text-neutral-900 dark:text-white flex items-center gap-3">
                        <IconSparkles className="h-6 w-6 text-primary" />
                        Professional Evaluation
                      </CardTitle>
                      <CardDescription className="text-sm mt-1">Reviewing {activeProject.student.name} ({activeProject.teamId})</CardDescription>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setIsFeedbackOpen(false)}
                      className="rounded-full h-10 w-10"
                    >
                      <IconX className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="px-8 pb-8 space-y-8">
                  {/* AI Intelligence Report Section */}
                  <div className="space-y-4">
                     <div className="flex items-center justify-between">
                        <h3 className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                           <IconBrandOpenai className="h-4 w-4" /> AI Intelligence Insights
                        </h3>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 rounded-lg text-[10px] font-black uppercase tracking-widest gap-2 bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
                          onClick={handleDownloadAIReport}
                        >
                           <IconFileDownload className="h-4 w-4" /> Download AI Report (PDF)
                        </Button>
                     </div>
                     <div className="p-6 rounded-[2rem] bg-neutral-900 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                           <IconSparkles className="h-20 w-20" />
                        </div>
                        <p className="text-sm font-medium leading-relaxed opacity-90 relative z-10">
                           {activeProject.aiSummary}
                        </p>
                        <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-4 relative z-10">
                           <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold text-neutral-400">AI CONFIDENCE</span>
                              <Badge className="bg-cyan-500 text-black font-black text-[10px]">98.2%</Badge>
                           </div>
                           <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold text-neutral-400">SCORE</span>
                              <Badge className="bg-primary text-white font-black text-[10px]">{activeProject.aiScore}/100</Badge>
                           </div>
                        </div>
                     </div>
                     <div className="flex items-center space-x-3 px-2">
                        <Checkbox 
                           id="attach-ai" 
                           checked={attachAIReport} 
                           onCheckedChange={(checked) => setAttachAIReport(!!checked)}
                           className="h-5 w-5 rounded-md border-primary text-primary"
                        />
                        <label 
                           htmlFor="attach-ai" 
                           className="text-xs font-bold text-neutral-600 dark:text-neutral-400 cursor-pointer select-none"
                        >
                           Attach this AI Performance Report to student's portal notification
                        </label>
                     </div>
                  </div>

                  {/* Professional Feedback Section */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-widest text-neutral-900 dark:text-white ml-2">Your Professional Guidance</h3>
                    <Textarea 
                      placeholder="Add your unique insights, mentor notes, or specific areas for improvement..."
                      className="min-h-[160px] rounded-[2rem] p-6 bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 focus-visible:ring-primary/20 resize-none transition-all shadow-inner"
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-4">
                    <Button 
                      className="flex-1 h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-lg gap-3 shadow-2xl shadow-primary/20 transition-all active:scale-95"
                      onClick={handleSendFeedback}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <IconSend className="h-5 w-5" /> Consolidate & Send
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-14 px-8 rounded-2xl font-bold border-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      onClick={() => setIsFeedbackOpen(false)}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                  </div>
                  
                  <p className="text-center text-[10px] text-muted-foreground font-medium uppercase tracking-[0.2em]">
                    Data is encrypted and synchronized with the {activeProject.student.name.split(' ')[0]}'s dashboard
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentProjectsPage;

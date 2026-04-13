"use client"

import { useState } from "react"
import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function StudentEnrollmentPage() {
  const [currentPhase, setCurrentPhase] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    enrollmentNo: "",
    programme: "",
    department: "",
    batch: "",
    email: "",
    phone: "",
    projectTitle: "",
    projectSummary: "",
    domain: "",
    semester: "",
    guide: "",
  })

  const phases = [
    { number: 1, label: "Basics" },
    { number: 2, label: "Work" },
    { number: 3, label: "Submit" },
  ]

 const guides = [
  "Aditya Patel",
  "Mangala Sharma",
  "Priyanka Gupta Mam",
  "Medhavi",
  "Bharghav",
  "Anjali Sharma",
  "Nikhil Chorasia",
  "Aditya Bhat",
  "Mukesh Dexit",
  "Rakesh Verma Sir",
  "Shivshakar Prajapati Sir",
  "Nandini Mam"
];

  const programmes = ["B.Tech", "M.Tech", "B.Sc", "M.Scs"]
  const departments = ["Computer Science", "Electronics", "Mechanical", "Civil"]
  const domains = ["AI / ML", "Web Development", "Mobile Apps", "Data Science", "IoT", "Blockchain"]
  const semesters = ["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6", "Semester 7", "Semester 8"]

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Enrollment Data:", formData)
    alert("Enrollment submitted! Waiting for guide acceptance.")
  }

  const isPhase1Valid = formData.fullName && formData.enrollmentNo && formData.email
  const isPhase2Valid = isPhase1Valid && formData.projectTitle && formData.projectSummary
  const isPhase3Valid = isPhase2Valid && formData.guide

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="space-y-8">
        <h1 className="text-4xl font-bold">Student Enrollment</h1>

        {/* Phase Indicator */}
        <div className="flex justify-center gap-4">
          {phases.map((phase, idx) => (
            <div key={phase.number} className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                  currentPhase >= phase.number
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {phase.number}
              </div>
              <div className="text-sm font-medium">
                Phase {phase.number} · {phase.label}
              </div>
              {idx < phases.length - 1 && (
                <div className={`w-16 h-1 ${currentPhase > phase.number ? "bg-primary" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle>
              {currentPhase === 1 && "Personal Details"}
              {currentPhase === 2 && "Project Details"}
              {currentPhase === 3 && "Guide Selection"}
            </CardTitle>
            <CardDescription>
              {currentPhase === 1 && "Enter your personal information"}
              {currentPhase === 2 && "Enter your project information"}
              {currentPhase === 3 && "Select your guide"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Phase 1: Personal Details */}
              {currentPhase >= 1 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Personal Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        placeholder="Arjun Sharma"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="enrollmentNo">Enrollment No.</Label>
                      <Input
                        id="enrollmentNo"
                        placeholder="0101CS21001"
                        value={formData.enrollmentNo}
                        onChange={(e) => handleInputChange("enrollmentNo", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="programme">Programme</Label>
                      <Select value={formData.programme} onValueChange={(val) => handleInputChange("programme", val)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select programme" />
                        </SelectTrigger>
                        <SelectContent>
                          {programmes.map((prog) => (
                            <SelectItem key={prog} value={prog}>{prog}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="department">Department</Label>
                      <Select value={formData.department} onValueChange={(val) => handleInputChange("department", val)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="batch">Batch / Year</Label>
                      <Input
                        id="batch"
                        placeholder="2021–25"
                        value={formData.batch}
                        onChange={(e) => handleInputChange("batch", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="arjun@university.ac.in"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Phase 2: Project Details */}
              {currentPhase >= 2 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Project Details</h3>
                  
                  <div>
                    <Label htmlFor="projectTitle">Project Title</Label>
                    <Input
                      id="projectTitle"
                      placeholder="Smart irrigation system using IoT sensors"
                      value={formData.projectTitle}
                      onChange={(e) => handleInputChange("projectTitle", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="projectSummary">Project Summary</Label>
                    <Textarea
                      id="projectSummary"
                      placeholder="Describe what your project does, its objective, and expected outcomes..."
                      className="min-h-24"
                      value={formData.projectSummary}
                      onChange={(e) => handleInputChange("projectSummary", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="domain">Domain / Area</Label>
                      <Select value={formData.domain} onValueChange={(val) => handleInputChange("domain", val)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select domain" />
                        </SelectTrigger>
                        <SelectContent>
                          {domains.map((dom) => (
                            <SelectItem key={dom} value={dom}>{dom}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="semester">Semester</Label>
                      <Select value={formData.semester} onValueChange={(val) => handleInputChange("semester", val)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select semester" />
                        </SelectTrigger>
                        <SelectContent>
                          {semesters.map((sem) => (
                            <SelectItem key={sem} value={sem}>{sem}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Phase 3: Guide Selection */}
              {currentPhase >= 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Guide Selection</h3>
                  <p className="text-sm text-muted-foreground">
                    A notification will be sent to your chosen guide. Your submission is locked until they accept.
                  </p>
                  
                  <div>
                    <Label htmlFor="guide">Choose Guide</Label>
                    <Select value={formData.guide} onValueChange={(val) => handleInputChange("guide", val)}>
                      <SelectTrigger>
                        <SelectValue placeholder="— Select faculty —" />
                      </SelectTrigger>
                      <SelectContent>
                        {guides.map((guide) => (
                          <SelectItem key={guide} value={guide}>{guide}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentPhase(Math.max(1, currentPhase - 1))}
                  disabled={currentPhase === 1}
                >
                  Previous
                </Button>

                {currentPhase < 3 ? (
                  <Button
                    type="button"
                    onClick={() => setCurrentPhase(currentPhase + 1)}
                    disabled={
                      (currentPhase === 1 && !isPhase1Valid) ||
                      (currentPhase === 2 && !isPhase2Valid)
                    }
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={!isPhase3Valid}
                  >
                    Submit Enrollment
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

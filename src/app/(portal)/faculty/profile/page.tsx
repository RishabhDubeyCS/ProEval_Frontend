"use client";

import React from "react";
import { 
  IconMail, 
  IconPhone, 
  IconAward, 
  IconBook, 
  IconChecklist,
  IconUsers,
  IconEdit,
  IconSchool,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// Mock data
const facultyData = {
  name: "Aditya Patel",
  role: "Assistant Professor",
  department: "Computer Science & Engineering",
  email: "aditya.patel@university.edu",
  phone: "+91 6266697361",
  bio: "Specializing in Artificial Intelligence and Machine Learning with over 15 years of academic and industrial experience. Dedicated to mentoring student innovation and research excellence.",
  expertise: ["Machine Learning",  "Cloud Computing", "AI Ethics"],
  stats: [
    { label: "Active Teams", value: 12, icon: IconUsers, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/20" },
    { label: "Evaluations", value: 48, icon: IconChecklist, color: "text-green-500", bg: "bg-green-50 dark:bg-green-950/20" },
    { label: "Research Papers", value: 24, icon: IconBook, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-950/20" },
    { label: "Awards", value: 5, icon: IconAward, color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-950/20" },
  ],
};

const ProfilePage = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Simple Header */}
      <Card className="overflow-hidden border-none shadow-sm bg-white dark:bg-neutral-800 rounded-3xl">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
            <Avatar className="h-32 w-32 border-4 border-primary/10 shadow-xl">
              <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" />
              <AvatarFallback className="text-2xl font-bold">AP</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">{facultyData.name}</h1>
                  <p className="text-lg text-muted-foreground font-medium flex items-center justify-center md:justify-start gap-2 mt-1">
                    <IconSchool className="h-5 w-5 text-primary" />
                    {facultyData.role} • {facultyData.department}
                  </p>
                </div>
                <Button variant="outline" size="sm" className="rounded-xl gap-2">
                  <IconEdit className="h-4 w-4" /> Edit Profile
                </Button>
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <Badge variant="secondary" className="gap-2 py-1 px-3 rounded-lg font-medium">
                  <IconMail className="h-4 w-4 text-primary" /> {facultyData.email}
                </Badge>
                <Badge variant="secondary" className="gap-2 py-1 px-3 rounded-lg font-medium">
                  <IconPhone className="h-4 w-4 text-primary" /> {facultyData.phone}
                </Badge>
                <Badge variant="secondary" className="gap-2 py-1 px-3 rounded-lg font-medium">
                  <IconBrandLinkedin className="h-4 w-4 text-blue-600" /> LinkedIn
                </Badge>
              </div>
              
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
                {facultyData.bio}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      

      {/* Expertise */}
      <Card className="border-none shadow-sm bg-white dark:bg-neutral-800 rounded-3xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold">Expertise & Specialization</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2 pt-4">
          {facultyData.expertise.map((skill) => (
            <Badge key={skill} variant="outline" className="px-4 py-1.5 rounded-xl text-sm font-medium border-primary/20 text-primary bg-primary/5">
              {skill}
            </Badge>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;

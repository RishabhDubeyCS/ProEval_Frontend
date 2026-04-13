import { z } from "zod";

export const projectPhase1Schema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  enrollmentNo: z.string().min(5, "Enrollment number is required"),
  programme: z.string().min(2, "Programme is required"),
  department: z.string().min(2, "Department is required"),
  batch: z.string().min(4, "Batch/Year is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  projectTitle: z.string().min(5, "Project title must be at least 5 characters"),
  projectSummary: z.string().min(20, "Project summary must be at least 20 characters"),
  domain: z.string().min(2, "Domain/Area is required"),
  semester: z.string().min(1, "Semester is required"),
  guide: z.string().min(2, "Guide selection is required"),
});

export const projectPhase2Schema = z.object({
  repoUrl: z.string().url("Invalid GitHub/GitLab URL"),
  branch: z.string().min(1, "Branch name is required"),
  presentationUrl: z.string().url("Invalid slide deck URL"),
  progressNotes: z.string().optional(),
  reportUrl: z.string().url("Invalid report PDF URL"),
  finalRepoUrl: z.string().url("Invalid final GitHub URL"),
  finalPresentationUrl: z.string().url("Invalid final presentation URL"),
  demoVideoUrl: z.string().url("Invalid demo video URL").optional().or(z.literal("")),
  declaration: z.boolean().refine((val) => val === true, {
    message: "You must confirm the declaration",
  }),
});

export const joinTeamSchema = z.object({
  teamId: z.string().regex(/^TEAM-\d{4}-\d{4}$/, "Invalid Team ID format (e.g., TEAM-2025-0042)"),
});

export type ProjectPhase1Data = z.infer<typeof projectPhase1Schema>;
export type ProjectPhase2Data = z.infer<typeof projectPhase2Schema>;
export type JoinTeamData = z.infer<typeof joinTeamSchema>;

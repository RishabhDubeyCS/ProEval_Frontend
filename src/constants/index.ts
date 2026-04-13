export const APP_NAME = "ProEval AI";
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const PROJECT_STATUS = {
  PENDING: 'pending',
  PHASE1_COMPLETE: 'phase1_complete',
  PHASE2_ACTIVE: 'phase2_active',
  COMPLETED: 'completed',
} as const;

export const ROLES = {
  STUDENT: 'student',
  FACULTY: 'faculty',
  ADMIN: 'admin',
} as const;

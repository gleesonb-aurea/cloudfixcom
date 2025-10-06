import * as z from 'zod'

// Step schemas
export const companyInfoSchema = z.object({
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  industry: z.string().min(1, 'Please select an industry'),
  companySize: z.string().min(1, 'Please select company size'),
  role: z.string().min(1, 'Please select your role'),
  currentChallenges: z.array(z.string()).min(1, 'Please select at least one challenge'),
});

export const awsUsageSchema = z.object({
  monthlySpend: z.string().min(1, 'Please select monthly spend range'),
  primaryServices: z.array(z.string()).min(1, 'Please select at least one service'),
  usageDuration: z.string().min(1, 'Please select usage duration'),
  optimizationEfforts: z.string().min(1, 'Please select optimization status'),
  monitoringTools: z.array(z.string()).optional(),
  painPoints: z.array(z.string()).min(1, 'Please select at least one pain point'),
  savingsGoals: z.string().min(1, 'Please select savings goal'),
});

export const contactInfoSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  consent: z.boolean().refine(val => val === true, 'You must agree to receive communications'),
});

export const assessmentSchema = z.object({
  ...companyInfoSchema.shape,
  ...awsUsageSchema.shape,
  ...contactInfoSchema.shape,
});

export type AssessmentData = z.infer<typeof assessmentSchema>;


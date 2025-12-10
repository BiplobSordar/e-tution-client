import * as z from 'zod';

export const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
  
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    zipCode: z.string().optional(),
  }).optional(),
  
  avatarUrl: z.string().optional(),
  
  tutorProfile: z.object({
    subjects: z.array(z.string()).default([]),
    hourlyRate: z.number().min(0, 'Hourly rate cannot be negative').optional(),
    experienceYears: z.number().min(0, 'Experience years cannot be negative').optional(),
    bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
    qualifications: z.array(z.string()).default([]),
    rating: z.number().min(0).max(5).default(0),
    totalReviews: z.number().min(0).default(0),
    availability: z.array(
      z.object({
        day: z.number().min(0).max(6),
        from: z.string(),
        to: z.string(),
      })
    ).default([]),
  }).optional().nullable(),
  
  studentProfile: z.object({
    grade: z.string().optional(),
    school: z.string().optional(),
    subjectsInterested: z.array(z.string()).default([]),
    learningGoals: z.array(z.string()).default([]),
    guardianContact: z.string().optional(),
  }).optional().nullable(),
  
  guardianProfile: z.object({
    occupation: z.string().optional(),
    emergencyContact: z.string().optional(),
    studentsUnderCare: z.array(z.string()).default([]),
  }).optional().nullable(),
  
  adminProfile: z.object({
    department: z.string().optional(),
    lastLogin: z.string().optional(),
  }).optional().nullable(),
});
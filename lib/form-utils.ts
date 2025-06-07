import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Common validation schemas
export const emailSchema = z.string().min(1, 'Email is required').email('Invalid email format');

export const passwordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters')
  .max(50, 'Password must be less than 50 characters');

export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters')
  .regex(/^[a-zA-Zа-яА-Я\s]+$/, 'Name can only contain letters and spaces');

export const phoneSchema = z
  .string()
  .min(10, 'Phone number must be at least 10 digits')
  .regex(/^\+?[\d\s\-\(\)]+$/, 'Invalid phone number format');

// Form schemas
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const profileSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema.optional(),
  bio: z.string().max(200, 'Bio must be less than 200 characters').optional(),
});

export const contactSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  subject: z.string().min(1, 'Subject is required').max(100, 'Subject too long'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(500, 'Message too long'),
});

// Type inference from schemas
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;

// Resolver exports for easy use with react-hook-form
export const loginResolver = zodResolver(loginSchema);
export const registerResolver = zodResolver(registerSchema);
export const profileResolver = zodResolver(profileSchema);
export const contactResolver = zodResolver(contactSchema);

// Custom validation helpers
export const createMinMaxSchema = (min: number, max: number, fieldName: string) =>
  z
    .string()
    .min(min, `${fieldName} must be at least ${min} characters`)
    .max(max, `${fieldName} must be less than ${max} characters`);

export const createOptionalSchema = (schema: z.ZodString) =>
  z.union([z.string().length(0), schema]);

// Form error handler
export const getFormErrorMessage = (error: any): string => {
  if (error?.message) return error.message;
  if (typeof error === 'string') return error;
  return 'An error occurred';
};

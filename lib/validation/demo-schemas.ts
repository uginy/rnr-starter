import { z } from 'zod';

// Login form schema
export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// User profile form schema
export const userProfileSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  location: z.string().max(100, 'Location must be less than 100 characters').optional(),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
});

export type UserProfileFormData = z.infer<typeof userProfileSchema>;

// Post creation form schema
export const postSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title must be less than 100 characters'),
  content: z
    .string()
    .min(1, 'Content is required')
    .min(20, 'Content must be at least 20 characters')
    .max(2000, 'Content must be less than 2000 characters'),
  author: z
    .string()
    .min(1, 'Author is required')
    .min(2, 'Author name must be at least 2 characters'),
  tags: z
    .array(z.string().min(1, 'Tag cannot be empty'))
    .min(1, 'At least one tag is required')
    .max(5, 'Maximum 5 tags allowed'),
});

export type PostFormData = z.infer<typeof postSchema>;

// Contact form schema
export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  subject: z.string().min(1, 'Subject is required').min(5, 'Subject must be at least 5 characters'),
  message: z
    .string()
    .min(1, 'Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
  priority: z.enum(['low', 'medium', 'high'], {
    required_error: 'Priority is required',
  }),
  newsletter: z.boolean().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// Settings form schema
export const settingsSchema = z.object({
  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
    sms: z.boolean(),
  }),
  privacy: z.object({
    profileVisible: z.boolean(),
    showEmail: z.boolean(),
    showLocation: z.boolean(),
  }),
  preferences: z.object({
    theme: z.enum(['light', 'dark', 'system']),
    language: z.enum(['en', 'ru', 'es', 'fr']),
    timezone: z.string().min(1, 'Timezone is required'),
  }),
});

export type SettingsFormData = z.infer<typeof settingsSchema>;

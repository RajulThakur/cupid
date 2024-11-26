import z from 'zod';

export const signInSchema = z.object({
  email: z
    .string({required_error: 'Email is required'})
    .min(1, 'Email is required')
    .email('Invalid email'),
  password: z
    .string({required_error: 'Password is required'})
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});

export const signUpSchema = z.object({
  email: z
    .string({required_error: 'Email is required'})
    .min(1, 'Email is required')
    .email('Invalid email'),
  username: z.string({required_error: 'Username is required'}).min(1),
  password: z
    .string({required_error: 'Password is required'})
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});

export const InfoSchema = z.object({
  formFirstName: z.string({required_error: 'First Name is required'}).min(2),
  formLastName: z.string({required_error: 'Last Name is required'}).min(2),
  gender: z.enum(['male', 'female', 'others'], {
    required_error: 'Gender is required',
  }),
  relationship: z.enum(
    [
      'Happily Married',
      'Pta nahi bagwan jane',
      'Single',
      'In a Relationship',
      'Complicated',
      'Open to Relationships',
      'Married',
      'In an Open Relationship',
    ],
    {
      required_error: 'Relationship Status required',
    }
  ),
  bio: z.string({required_error: 'Bio is required'}).max(50).min(5),
});

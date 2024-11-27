import z from 'zod';

export const signInSchema = z.object({
  email: z
    .string({required_error: 'Email is required'})
    .min(1, 'Email must not be empty')
    .email('Invalid email'),
  password: z
    .string({required_error: 'Password is required'})
    .min(8, 'Password must be at least 8 characters long')
    .max(32, 'Password must be less than 32 characters'),
});

export const signUpSchema = z.object({
  email: z
    .string({required_error: 'Email is required'})
    .min(1, 'Email must not be empty')
    .email('Invalid email'),
  username: z.string({required_error: 'Username is required'}).min(1, 'Username must not be empty'),
  password: z
    .string({required_error: 'Password is required'})
    .min(8, 'Password must be at least 8 characters long')
    .max(64, 'Password must be less than 64 characters'),
});

export const InfoSchema = z.object({
  firstName: z
    .string({required_error: 'First Name is required', description: 'First Name is required'})
    .min(2, 'First Name must be at least 2 characters long'),
  lastName: z
    .string({required_error: 'Last Name is required', description: 'Last Name is required'})
    .min(2, 'Last Name must be at least 2 characters long'),
  gender: z.enum(['male', 'female', 'others'], {
    required_error: 'Gender is required',
    invalid_type_error: 'Please select a valid gender option',
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
      invalid_type_error: 'Invalid relationship status',
      required_error: 'Relationship Status is required',
    }
  ),
  bio: z
    .string({required_error: 'Bio is required'})
    .max(50, 'Bio must be less than 50 characters')
    .min(5, 'Bio must be at least 5 characters long'),
});

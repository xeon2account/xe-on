'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { addContent, approveContent, deleteContent, verifyAdminPassword } from './data';
import { cookies } from 'next/headers';

const FormSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL.' }),
  caption: z.string().min(3, { message: 'Caption must be at least 3 characters long.' }).max(280, { message: 'Caption cannot be longer than 280 characters.' }),
});

const LoginSchema = z.object({
    password: z.string().min(1, { message: 'Password is required.' }),
});

export type State = {
  errors?: {
    url?: string[];
    caption?: string[];
  };
  message?: string | null;
};

export type LoginState = {
    errors?: {
        password?: string[];
    };
    message?: string | null;
}

export async function login(prevState: LoginState, formData: FormData) {
    const validatedFields = LoginSchema.safeParse({
        password: formData.get('password'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Invalid input.',
        };
    }

    const { password } = validatedFields.data;
    const isValid = await verifyAdminPassword(password);

    if (!isValid) {
        return {
            errors: {},
            message: 'Invalid password.',
        };
    }

    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    cookies().set('session', 'admin', { expires, httpOnly: true });
    
    redirect('/admin/dashboard');
}

export async function logout() {
    cookies().set('session', '', { expires: new Date(0) });
    redirect('/admin/login');
}


export async function submitContent(prevState: State, formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    url: formData.get('url'),
    caption: formData.get('caption'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to submit content. Please check the fields.',
    };
  }

  try {
    await addContent(validatedFields.data.url, validatedFields.data.caption);
  } catch (error) {
    return {
      message: 'Database Error: Failed to create content.',
    };
  }

  revalidatePath('/admin/dashboard');
  redirect('/');
}

export async function approveContentAction(id: string) {
  try {
    await approveContent(id);
    revalidatePath('/admin/dashboard');
    revalidatePath('/');
  } catch (error) {
    return { message: 'Database Error: Failed to approve content.' };
  }
}

export async function deleteContentAction(id: string) {
    try {
        await deleteContent(id);
        revalidatePath('/admin/dashboard');
        revalidatePath('/');
    } catch (error) {
        return { message: 'Database Error: Failed to delete content.' };
    }
}
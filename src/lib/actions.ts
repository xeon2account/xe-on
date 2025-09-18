'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { addContent, approveContent, deleteContent } from './data';

const FormSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL.' }),
  caption: z.string().min(3, { message: 'Caption must be at least 3 characters long.' }).max(280, { message: 'Caption cannot be longer than 280 characters.' }),
});

export type State = {
  errors?: {
    url?: string[];
    caption?: string[];
  };
  message?: string | null;
};

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

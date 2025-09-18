'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { submitContent, type State } from '@/lib/actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </Button>
  );
}

export function ContentForm() {
  const initialState: State = { message: null, errors: {} };
  const [state, dispatch] = useFormState(submitContent, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && state.errors) {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: state.message,
      })
    }
  }, [state, toast]);


  return (
    <form action={dispatch}>
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Submit Content</CardTitle>
          <CardDescription>Share an image or video URL and a caption with the world.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Image/Video URL</Label>
            <Input id="url" name="url" placeholder="https://example.com/media.jpg" required aria-describedby="url-error" />
            <div id="url-error" aria-live="polite" aria-atomic="true">
              {state.errors?.url &&
                state.errors.url.map((error: string) => (
                  <p className="text-sm font-medium text-destructive" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="caption">Caption</Label>
            <Textarea id="caption" name="caption" placeholder="Write something amazing..." required aria-describedby="caption-error" />
            <div id="caption-error" aria-live="polite" aria-atomic="true">
              {state.errors?.caption &&
                state.errors.caption.map((error: string) => (
                  <p className="text-sm font-medium text-destructive" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <SubmitButton />
        </CardFooter>
      </Card>
    </form>
  );
}

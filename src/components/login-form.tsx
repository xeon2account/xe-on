'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { login, type LoginState } from '@/lib/actions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Logging in...' : 'Login'}
    </Button>
  );
}

export function LoginForm() {
  const initialState: LoginState = { message: null, errors: {} };
  const [state, dispatch] = useActionState(login, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Admin Login</CardTitle>
        <CardDescription>Enter your credentials to access the dashboard.</CardDescription>
      </CardHeader>
      <form action={dispatch}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" placeholder="••••••••" required />
            <div id="password-error" aria-live="polite" aria-atomic="true">
              {state.errors?.password &&
                state.errors.password.map((error: string) => (
                  <p className="text-sm font-medium text-destructive" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <LoginButton />
        </CardFooter>
      </form>
    </Card>
  );
}

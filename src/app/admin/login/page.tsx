import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AdminLoginPage() {
    // In a real app, a server action would handle this form,
    // verify credentials, and set a session cookie.
    // For this demo, the button just links to the dashboard.
  return (
    <div className="flex-1 flex items-center justify-center p-4 animate-fade-in">
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Admin Login</CardTitle>
                <CardDescription>Enter your credentials to access the dashboard.</CardDescription>
            </CardHeader>
            <form>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder="••••••••" defaultValue="admin123" />
                    </div>
                </CardContent>
                <CardFooter>
                     <Button asChild className="w-full">
                        <Link href="/admin/dashboard">Login</Link>
                    </Button>
                </CardFooter>
            </form>
        </Card>
    </div>
  )
}

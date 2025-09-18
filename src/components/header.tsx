import Link from 'next/link';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cookies } from 'next/headers';
import { logout } from '@/lib/actions';
import { headers } from 'next/headers'

function LogoutButton() {
  return (
    <form action={logout}>
      <Button type="submit" variant="outline">Logout</Button>
    </form>
  )
}

export function Header() {
  const headersList = headers();
  const pathname = headersList.get('x-next-pathname');
  const session = cookies().get('session');
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <Camera className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Fainted.360</h1>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" asChild>
            <Link href="/">Feed</Link>
          </Button>
          <Button variant="default" asChild>
            <Link href="/submit">Submit</Link>
          </Button>
          {isAdminPage && session ? (
             <LogoutButton />
          ) : (
            <Button variant="outline" asChild>
              <Link href="/admin/dashboard">Admin</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}

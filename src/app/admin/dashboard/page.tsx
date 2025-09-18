import { getAllContent } from '@/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { approveContentAction, deleteContentAction } from '@/lib/actions';
import { Eye, Check, Trash2 } from 'lucide-react';
import Link from 'next/link';

function ApproveButton({ id }: { id: string }) {
    const approveAction = approveContentAction.bind(null, id);
    return (
        <form action={approveAction}>
            <Button variant="ghost" size="icon" type="submit" aria-label="Approve">
                <Check className="h-4 w-4 text-green-500" />
            </Button>
        </form>
    );
}

function DeleteButton({ id }: { id: string }) {
    const deleteAction = deleteContentAction.bind(null, id);
    return (
        <form action={deleteAction}>
            <Button variant="ghost" size="icon" type="submit" aria-label="Delete">
                <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
        </form>
    );
}


export default async function AdminDashboard() {
  const allContent = await getAllContent();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead>Caption</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allContent.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Badge variant={item.status === 'approved' ? 'default' : 'secondary'} className={item.status === 'approved' ? 'bg-green-700 hover:bg-green-800' : ''}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium max-w-xs md:max-w-sm truncate">{item.caption}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.createdAt.toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                        <Button asChild variant="ghost" size="icon" aria-label="View Content">
                            <Link href={item.url} target="_blank" rel="noopener noreferrer">
                                <Eye className="h-4 w-4" />
                            </Link>
                        </Button>
                        {item.status === 'pending' && <ApproveButton id={item.id} />}
                        <DeleteButton id={item.id} />
                    </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
       {allContent.length === 0 && (
          <div className="text-center py-20 border rounded-lg mt-4">
            <h2 className="text-xl font-semibold">No content submitted yet.</h2>
            <p className="text-muted-foreground mt-2">Create a .env.local file and add your MongoDB connection string to see content.</p>
          </div>
        )}
    </div>
  );
}

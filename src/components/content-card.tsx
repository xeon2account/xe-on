
'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import type { ContentItem } from '@/lib/definitions';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button';
import { Expand } from 'lucide-react';


export function ContentCard({ item }: { item: ContentItem }) {
  const isVideo = item.type === 'video';

  return (
    <Dialog>
      <Card className="overflow-hidden flex flex-col group">
        <CardContent className="p-0">
          <div className="aspect-[4/5] w-full bg-muted relative">
            {isVideo ? (
              <video
                src={item.url}
                controls
                playsInline
                className="w-full h-full object-cover"
                aria-label={item.caption}
              />
            ) : (
              <Image
                src={item.url}
                alt={item.caption}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint="post photo"
              />
            )}
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70 text-white hover:text-white">
                    <Expand className="h-5 w-5" />
                    <span className="sr-only">View full screen</span>
                </Button>
            </DialogTrigger>
          </div>
        </CardContent>
        <CardFooter className="p-4 flex-1 flex items-start">
          <p className="text-card-foreground/80">{item.caption}</p>
        </CardFooter>
      </Card>
      <DialogContent className="max-w-4xl w-full p-2 h-auto max-h-[90vh]">
         {isVideo ? (
            <video
              src={item.url}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain max-h-[85vh]"
              aria-label={item.caption}
            />
          ) : (
            <div className="relative w-full h-full min-h-[50vh] max-h-[85vh]">
                <Image
                    src={item.url}
                    alt={item.caption}
                    fill
                    className="object-contain"
                />
            </div>
          )}
      </DialogContent>
    </Dialog>
  );
}

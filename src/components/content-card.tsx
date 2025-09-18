import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import type { ContentItem } from '@/lib/definitions';

export function ContentCard({ item }: { item: ContentItem }) {
  const isVideo = item.type === 'video';

  return (
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
        </div>
      </CardContent>
      <CardFooter className="p-4 flex-1 flex items-start">
        <p className="text-card-foreground/80">{item.caption}</p>
      </CardFooter>
    </Card>
  );
}

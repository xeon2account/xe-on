import { getApprovedContent } from '@/lib/data';
import { ContentCard } from '@/components/content-card';

export default async function Home() {
  const contentItems = await getApprovedContent();

  return (
    <div className="flex-1 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {contentItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {contentItems.map((item) => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold">Nothing to see here yet!</h2>
            <p className="text-muted-foreground mt-2">Check back later or submit your own content.</p>
          </div>
        )}
      </div>
    </div>
  );
}

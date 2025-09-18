import { unstable_noStore as noStore } from 'next/cache';
import type { ContentItem } from './definitions';

let contentItems: ContentItem[] = [
  {
    id: '1',
    url: 'https://picsum.photos/seed/1/600/800',
    caption: 'A beautiful landscape to start the feed!',
    type: 'image',
    status: 'approved',
    createdAt: new Date('2023-10-26T10:00:00Z'),
  },
  {
    id: '2',
    url: 'https://picsum.photos/seed/2/800/600',
    caption: 'Exploring the city at night.',
    type: 'image',
    status: 'approved',
    createdAt: new Date('2023-10-26T11:00:00Z'),
  },
  {
    id: '3',
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    caption: 'A short video clip.',
    type: 'video',
    status: 'approved',
    createdAt: new Date('2023-10-26T12:00:00Z'),
  },
  {
    id: '4',
    url: 'https://picsum.photos/seed/4/700/700',
    caption: 'This one is waiting for approval.',
    type: 'image',
    status: 'pending',
    createdAt: new Date('2023-10-26T13:00:00Z'),
  },
   {
    id: '5',
    url: 'https://picsum.photos/seed/5/800/800',
    caption: 'Another stunning view.',
    type: 'image',
    status: 'approved',
    createdAt: new Date('2023-10-27T09:00:00Z'),
  },
];

const getUrlType = (url: string): 'image' | 'video' => {
  try {
    const videoExtensions = ['.mp4', '.webm', '.ogg'];
    const path = new URL(url).pathname;
    const extension = path.substring(path.lastIndexOf('.'));
    return videoExtensions.includes(extension.toLowerCase()) ? 'video' : 'image';
  } catch (error) {
    return 'image';
  }
};

export async function getApprovedContent(): Promise<ContentItem[]> {
  noStore();
  return contentItems
    .filter(item => item.status === 'approved')
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function getAllContent(): Promise<ContentItem[]> {
  noStore();
  return [...contentItems].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function addContent(url: string, caption: string): Promise<ContentItem> {
  noStore();
  const newContent: ContentItem = {
    id: (contentItems.length + 1 + Math.random()).toString(),
    url,
    caption,
    type: getUrlType(url),
    status: 'pending',
    createdAt: new Date(),
  };
  contentItems.unshift(newContent);
  return newContent;
}

export async function approveContent(id: string): Promise<ContentItem | undefined> {
  noStore();
  const item = contentItems.find(item => item.id === id);
  if (item) {
    item.status = 'approved';
  }
  return item;
}

export async function deleteContent(id: string): Promise<void> {
  noStore();
  contentItems = contentItems.filter(item => item.id !== id);
}

// Mock admin verification. In a real app, use a proper auth system.
export async function verifyAdminPassword(password: string): Promise<boolean> {
  noStore();
  return password === 'admin123';
}

import { unstable_noStore as noStore } from 'next/cache';
import type { ContentItem, ContentItemFromDb } from './definitions';
import { connectToDatabase } from './mongodb';
import { ObjectId } from 'mongodb';

const mapContentItemFromDb = (item: ContentItemFromDb): ContentItem => {
  return {
    ...item,
    id: item._id.toString(),
    createdAt: item.createdAt,
  };
};

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
  const { db } = await connectToDatabase();
  const items = await db.collection<ContentItemFromDb>('content')
    .find({ status: 'approved' })
    .sort({ createdAt: -1 })
    .toArray();

  return items.map(mapContentItemFromDb);
}

export async function getAllContent(): Promise<ContentItem[]> {
  noStore();
  const { db } = await connectToDatabase();
  const items = await db.collection<ContentItemFromDb>('content')
    .find()
    .sort({ createdAt: -1 })
    .toArray();
  return items.map(mapContentItemFromDb);
}

export async function addContent(url: string, caption: string): Promise<void> {
  noStore();
  const { db } = await connectToDatabase();
  const newContent = {
    url,
    caption,
    type: getUrlType(url),
    status: 'pending',
    createdAt: new Date(),
  };
  await db.collection('content').insertOne(newContent);
}

export async function approveContent(id: string): Promise<void> {
  noStore();
  const { db } = await connectToDatabase();
  await db.collection('content').updateOne(
    { _id: new ObjectId(id) },
    { $set: { status: 'approved' } }
  );
}

export async function deleteContent(id: string): Promise<void> {
  noStore();
  const { db } = await connectToDatabase();
  await db.collection('content').deleteOne({ _id: new ObjectId(id) });
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  return password === 'admin123';
}

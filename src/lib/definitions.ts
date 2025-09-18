import { ObjectId } from 'mongodb';

export type ContentItem = {
  id: string;
  url: string;
  caption: string;
  type: 'image' | 'video';
  status: 'pending' | 'approved';
  createdAt: Date;
};

export type ContentItemFromDb = Omit<ContentItem, 'id'> & {
  _id: ObjectId;
};

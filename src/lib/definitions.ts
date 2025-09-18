export type ContentItem = {
  id: string;
  url: string;
  caption: string;
  type: 'image' | 'video';
  status: 'pending' | 'approved';
  createdAt: Date;
};

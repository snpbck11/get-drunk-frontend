export interface IStory {
  id: string;
  type: "image" | "video";
  mediaUrl: string;
  thumbnailUrl?: string;
  caption?: string;
  viewCount: number;
  expiresAt: string;
  isActive: boolean;
  createdAt: string;
}

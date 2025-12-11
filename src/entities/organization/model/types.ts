import { IStory } from "@/entities/story";
import { IUser } from "@/entities/user";

export type TOrganizationTypes =
  | "restaurant"
  | "cafe"
  | "bar"
  | "shop"
  | "gym"
  | "salon"
  | "other"
  | "club"
  | "pub"
  | "karaoke";

export interface IOrganization {
  id: string;
  name: string;
  description?: string;
  type: TOrganizationTypes;
  address: string;
  phone?: string;
  website?: string;
  logo?: string;
  coverImage?: string;
  latitude?: number;
  longitude?: number;
  isActive: boolean;
  isVerified: boolean;
  owner?: IUser;
  stories?: IStory[];
  createdAt: string;
  updatedAt: string;
}

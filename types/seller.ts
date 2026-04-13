import { ObjectId } from "mongodb";

export interface Seller {
  sellerId: ObjectId;
  sellerName: string;
  shopName: string;
  tagline: string;
  story: string;
  profileUrl: string;
  isDemo?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
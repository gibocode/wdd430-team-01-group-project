import { ObjectId } from 'mongodb';

export interface Seller {
    userId: ObjectId;
    sellerName: string;
    shopName: string;
    tagline: string;
    story: string;
    profileUrl: string;
    createdAt: Date;
    updatedAt: Date;
}

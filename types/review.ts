import { ObjectId } from 'mongodb';

export interface Review {
    _id?: ObjectId;
    productId: ObjectId;
    comment: string;
    rating: number;
    reviewer: string;
    createdAt: Date;
    updatedAt: Date;
}

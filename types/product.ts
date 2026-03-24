import { ObjectId } from 'mongodb';

export interface Product {
    _id?: ObjectId;
    sellerId: ObjectId;
    title: string;
    image: string;
    description?: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}

import { createProduct } from '@/models/product';
import { z } from 'zod';
import { Product } from '@/types/product';
import { ObjectId } from 'mongodb';

// Product data validation
const ProductSchema = z.object({
    title: z.string().min(6),
    image: z.string().min(1),
    description: z.string().optional(),
    price: z.number().positive(),
});

// API to create a product for a seller
export async function POST(request: Request, { params }: { params: Promise<{ sellerId: string }>}) {
    try {
        const { sellerId } = await params;
        const body = await request.json();

        // Validate product data
        const validated = ProductSchema.parse(body);

        // Insert seller ID to the product data
        const data: Product = {
            ...validated,
            sellerId: new ObjectId(sellerId),
            createdAt: new Date(),
            updatedAt: new Date()
        };

        // Create a product
        const product = await createProduct(data);

        return Response.json({
            success: true,
            data: product,
        });
    }
    catch (error) {
        console.error(error);
        return Response.json(
            {
                success: false,
                message: 'Failed to create a product.',
            },
            { status: 500 }
        );
    }
}

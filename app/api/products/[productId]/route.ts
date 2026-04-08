import { findProductById, updateProduct, deleteProductById } from '@/models/product';
import { ObjectId } from 'mongodb';
import { z } from 'zod';

// Product data validation
const ProductSchema = z.object({
    sellerId: z.custom<ObjectId>(),
    title: z.string().min(6),
    image: z.string().min(1),
    description: z.string().optional(),
    price: z.number().positive(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

// API to get single product by ID
export async function GET(request: Request, { params }: { params: Promise<{ productId: string }> }): Promise<Response> {
    try {
        const { productId } = await params;
        const product = await findProductById(productId);
        if (!product) {
            return Response.json({
                success: false,
                message: 'Product not found.',
            }, { status: 404 });
        }
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
                message: 'Failed to fetch product.',
            },
            { status: 500 }
        );
    }
}

// API to update a product
export async function PUT(request: Request, { params }: { params: Promise<{ productId: string }>}): Promise<Response> {
    try {
        const { productId } = await params;
        const body = await request.json();

        // Validate product data before updating
        const validated = ProductSchema.parse(body);

        // Update product by ID
        const success = await updateProduct(productId, validated);

        return Response.json({
            success: success,
            message: 'Product successfully updated.',
            data: body
        });
    }
    catch (error) {
        console.error(error);
        return Response.json(
            {
                success: false,
                message: 'Failed to update product.',
            },
            { status: 500 }
        );
    }
}

// API to delete a product
export async function DELETE(request: Request, { params }: { params: Promise<{ productId: string }>}): Promise<Response> {
    try {
        const { productId } = await params;

        // Delete product by ID
        const success = await deleteProductById(productId);

        return Response.json({
            success: success,
            message: 'Product successfully deleted.',
            id: productId
        });
    }
    catch (error) {
        console.error(error);
        return Response.json(
            {
                success: false,
                message: 'Failed to delete product.',
            },
            { status: 500 }
        );
    }
}

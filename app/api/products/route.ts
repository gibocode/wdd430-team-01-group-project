import { getAllProducts } from '@/models/product';

// API to get all products
export async function GET() {
    try {
        const products = await getAllProducts();
        return Response.json({
            success: true,
            data: products,
        });
    }
    catch (error) {
        console.error(error);
        return Response.json(
            {
                success: false,
                message: 'Failed to fetch products.',
            },
            { status: 500 }
        );
    }
}

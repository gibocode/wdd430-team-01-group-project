import { getAllProductsBySellerId } from "@/models/product";

// API to get all products of the seller
export async function GET(request: Request, { params }: { params: Promise<{ sellerId: string }>}) {
    try {
        const { sellerId } = await params;

        // Get all products of the seller
        const products = await getAllProductsBySellerId(sellerId);

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
                message: 'Failed to get products for this seller.',
            },
            { status: 500 }
        );
    }
}

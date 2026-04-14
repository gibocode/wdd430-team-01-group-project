import { getAllProductsBySellerId, createProduct } from "@/models/product";
import { getOrCreateSeller } from "@/lib/services/sellers";
import { z } from "zod";
import { Product } from "@/types/product";
import { ObjectId } from "mongodb";

// Product data validation
const ProductSchema = z.object({
  title: z.string().min(6),
  image: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive(),
});

// API to get all products of the seller
export async function GET(
  request: Request,
  { params }: { params: Promise<{ sellerId: string }> },
): Promise<Response> {
  try {
    const { sellerId } = await params;

    // Get all products of the seller
    const products = await getAllProductsBySellerId(sellerId);

    return Response.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        success: false,
        message: "Failed to get products for this seller.",
      },
      { status: 500 },
    );
  }
}

// API to create a product for a seller
export async function POST(
  request: Request,
  { params }: { params: Promise<{ sellerId: string }> },
): Promise<Response> {
  try {
    const { sellerId } = await params;
    const body = await request.json();

    const validated = ProductSchema.parse(body);

    const seller = await getOrCreateSeller(sellerId);

    const data: Omit<Product, "_id" | "createdAt" | "updatedAt"> = {
      ...validated,
      sellerId: seller.sellerId,
    };

    const product = await createProduct(data);

    return Response.json({
      success: true,
      message: "Product successfully created.",
      data: product,
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        success: false,
        message: "Failed to create a product.",
      },
      { status: 500 },
    );
  }
}

import { getAllReviewsByProductId, createReview } from "@/models/review";
import { z } from "zod";
import { Review } from "@/types/review";
import { ObjectId } from "mongodb";
import { validateId } from "@/lib/utils";

// Product review data validation
const ReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  reviewer: z.string().min(1),
  comment: z.string().min(5),
});

// API to get all product reviews
export async function GET(
  request: Request,
  { params }: { params: Promise<{ productId: string }> },
): Promise<Response> {
  try {
    const { productId } = await params;

    // Get all product reviews
    const reviews = await getAllReviewsByProductId(productId);

    return Response.json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        success: false,
        message: "Failed to fetch product reviews.",
      },
      { status: 500 },
    );
  }
}

// API to create a product review
export async function POST(
  request: Request,
  { params }: { params: Promise<{ productId: string }> },
): Promise<Response> {
  try {
    const { productId } = await params;
    const body = await request.json();

    const _productId = validateId(productId);

    // Validates product review data
    const validated = ReviewSchema.parse(body);

    const data: Omit<Review, "_id"> = {
      ...validated,
      productId: _productId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Creates product review
    const review = await createReview(data);

    return Response.json({
      success: true,
      message: "Product review successfully created.",
      data: review,
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        success: false,
        message: "Failed to create a product review.",
      },
      { status: 500 },
    );
  }
}

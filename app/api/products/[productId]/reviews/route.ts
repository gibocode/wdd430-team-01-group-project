import { getAllReviewsByProductId, createReview } from "@/models/review";
import { z } from "zod";
import { Review } from "@/types/review";
import { validateId } from "@/lib/utils";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { findUserById } from "@/models/user";

// Product review data validation
const ReviewSchema = z.object({
  rating: z.number().min(1).max(5),
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

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized. Please log in to leave a review.",
        },
        { status: 401 },
      );
    }

    const payload = verifyToken(token);
    if (!payload || typeof payload === "string" || !("userId" in payload)) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized. Invalid session.",
        },
        { status: 401 },
      );
    }

    const user = await findUserById(payload.userId);
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized. User not found.",
        },
        { status: 401 },
      );
    }

    const _productId = validateId(productId);
    const validated = ReviewSchema.parse(body);

    const data: Omit<Review, "_id"> = {
      ...validated,
      reviewer: user.name,
      productId: _productId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

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

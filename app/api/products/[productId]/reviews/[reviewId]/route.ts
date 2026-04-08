import { deleteReviewById } from "@/models/review";

// API to delete a product review
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ reviewId: string }> },
): Promise<Response> {
  try {
    const { reviewId } = await params;

    // Delete product review by ID
    const success = await deleteReviewById(reviewId);

    return Response.json({
      success: success,
      message: "Product review successfully deleted.",
      id: reviewId,
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        success: false,
        message: "Failed to delete product review.",
      },
      { status: 500 },
    );
  }
}

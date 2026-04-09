import { getAllReviewsByProductId } from "@/models/review";
import { mapReviewToUi, UiReview } from "@/lib/mappers/review";
import { mockReviews } from "@/app/data/reviews";

export type FetchReviewsResult = {
  reviews: UiReview[];
  error: string | null;
  usingFallback: boolean;
};

export async function fetchReviewsByProductId(
  productId: string,
): Promise<FetchReviewsResult> {
  try {
    const reviews = await getAllReviewsByProductId(productId);

    return {
      reviews: reviews.map(mapReviewToUi),
      error: null,
      usingFallback: false,
    };
  } catch (error) {
    console.error("Using mock reviews fallback:", error);

    return {
      reviews: mockReviews
        .filter((review) => String(review.productId) === productId)
        .map((review) => ({
          id: String(review.id),
          productId: String(review.productId),
          rating: review.rating,
          reviewer: review.user,
          comment: review.text,
          date: review.date,
        })),
      error: "Unable to load live reviews. Showing fallback reviews.",
      usingFallback: true,
    };
  }
}

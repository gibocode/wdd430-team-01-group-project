import { ObjectId } from "mongodb";

export type UiReview = {
  id: string;
  productId: string;
  rating: number;
  reviewer: string;
  comment: string;
  date: string;
};

type BackendReview = {
  _id?: ObjectId;
  productId?: ObjectId;
  rating?: number;
  reviewer?: string;
  comment?: string;
  createdAt?: Date | string;
};

export function mapReviewToUi(review: BackendReview): UiReview {
  return {
    id: review._id?.toString() ?? "",
    productId: review.productId?.toString() ?? "",
    rating: typeof review.rating === "number" ? review.rating : 0,
    reviewer: review.reviewer ?? "User",
    comment: review.comment ?? "",
    date: review.createdAt
      ? new Date(review.createdAt).toISOString().slice(0, 10)
      : "",
  };
}
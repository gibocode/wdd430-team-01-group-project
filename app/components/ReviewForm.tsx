"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type ReviewFormProps = {
  productId: string;
};

export default function ReviewForm({ productId }: ReviewFormProps) {
  const [rating, setRating] = useState("5");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const isLoggedIn = false; // replace later with real auth state

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/products/${productId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: Number(rating),
          reviewer: "User",
          comment: text,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit review.");
      }

      setText("");
      setRating("5");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <p style={{ color: "#555", marginTop: "1rem" }}>
        Please{" "}
        <a href="/login" style={{ color: "#1976D2" }}>
          log in
        </a>{" "}
        to leave a review.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {error && <p style={{ color: "#b00020", margin: 0 }}>{error}</p>}

        <label>
          <span style={{ display: "block", marginBottom: "0.5rem" }}>
            Rating
          </span>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            style={{ padding: "0.5rem", borderRadius: "4px" }}
          >
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Very Good</option>
            <option value="3">3 - Good</option>
            <option value="2">2 - Fair</option>
            <option value="1">1 - Poor</option>
          </select>
        </label>

        <label>
          <span style={{ display: "block", marginBottom: "0.5rem" }}>
            Review
          </span>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            required
            placeholder="Share your thoughts about this product"
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: "0.75rem 1rem",
            backgroundColor: "#1976D2",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            width: "fit-content",
            opacity: isSubmitting ? 0.7 : 1,
          }}
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </form>
  );
}

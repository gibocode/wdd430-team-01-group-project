"use client";

import { FormEvent, useState } from "react";

export default function ReviewForm() {
  const [rating, setRating] = useState("5");
  const [text, setText] = useState("");
  const isLoggedIn = false; // temporary mock state

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Mock review submitted:", { rating, text });
    setText("");
    setRating("5");
  };

  if (!isLoggedIn) {
    return (
      <p style={{ color: "#555", marginTop: "1rem" }}>
        Please <a href="/login" style={{ color: "#1976D2" }}>log in</a> to leave a review.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <label>
          <span style={{ display: "block", marginBottom: "0.5rem" }}>Rating</span>
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
          <span style={{ display: "block", marginBottom: "0.5rem" }}>Review</span>
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
          style={{
            padding: "0.75rem 1rem",
            backgroundColor: "#1976D2",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            width: "fit-content",
          }}
        >
          Submit Review
        </button>
      </div>
    </form>
  );
}
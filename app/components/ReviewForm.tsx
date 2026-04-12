"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthProvider";
import NextLink from "./NextLink";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Link as MuiLink,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

type ReviewFormProps = {
  productId: string;
};

export default function ReviewForm({ productId }: ReviewFormProps) {
  const [rating, setRating] = useState("5");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { user, loading } = useAuth();

  const isLoggedIn = !!user;

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
          comment: text,
        }),
        credentials: "include",
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

  if (loading) {
    return (
      <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
        <CircularProgress size={20} />
        <Typography color="text.secondary">Checking login...</Typography>
      </Box>
    );
  }

  if (!isLoggedIn) {
    return (
      <Typography sx={{ mt: 2, color: "text.secondary" }}>
        Please{" "}
        <MuiLink
          component={NextLink}
          href="/login"
          color="primary"
          underline="hover"
        >
          log in
        </MuiLink>{" "}
        to leave a review.
      </Typography>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {error && <Alert severity="error">{error}</Alert>}

        <FormControl size="small" sx={{ maxWidth: 220 }}>
          <InputLabel id="review-rating-label">Rating</InputLabel>
          <Select
            labelId="review-rating-label"
            value={rating}
            label="Rating"
            onChange={(e) => setRating(e.target.value)}
          >
            <MenuItem value="5">5 - Excellent</MenuItem>
            <MenuItem value="4">4 - Very Good</MenuItem>
            <MenuItem value="3">3 - Good</MenuItem>
            <MenuItem value="2">2 - Fair</MenuItem>
            <MenuItem value="1">1 - Poor</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Review"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          multiline
          rows={4}
          placeholder="Share your thoughts about this product"
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          sx={{ alignSelf: "flex-start", textTransform: "none", px: 3 }}
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </Box>
    </Box>
  );
}
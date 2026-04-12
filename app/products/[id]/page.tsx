import Link from "next/link";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ReviewForm from "../../components/ReviewForm";
import { fetchProductById } from "@/lib/services/product-detail";
import { fetchReviewsByProductId } from "@/lib/services/reviews";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
} from "@mui/material";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;

  const [{ product, error: productError }, { reviews, error: reviewsError }] =
    await Promise.all([fetchProductById(id), fetchReviewsByProductId(id)]);

  if (!product) {
    return (
      <>
        <Header />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Product Not Found
          </Typography>
          <Typography color="text.secondary">
            {productError || "The requested product could not be found."}
          </Typography>
        </Container>
        <Footer />
      </>
    );
  }

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : null;

  return (
    <>
      <Header />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {productError && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            {productError}
          </Alert>
        )}

        {reviewsError && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            {reviewsError}
          </Alert>
        )}

        <Box
          component="section"
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 4,
            alignItems: "start",
          }}
        >
          <Box>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                aspectRatio: "1 / 1",
                borderRadius: 2,
                overflow: "hidden",
                backgroundColor: "background.paper",
              }}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                style={{ objectFit: "cover" }}
              />
            </Box>
          </Box>

          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {product.name}
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                mt: 2,
                lineHeight: 1.7,
              }}
            >
              {product.description}
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "primary.main",
                mt: 2,
              }}
            >
              {product.price}
            </Typography>

            <Typography sx={{ mt: 2 }}>
              Seller:{" "}
              <Link
                href={`/sellers/${product.sellerId}`}
                style={{
                  color: "inherit",
                  textDecorationColor: "currentColor",
                }}
              >
                View seller profile
              </Link>
            </Typography>
          </Box>
        </Box>

        <Box component="section" sx={{ mt: 6 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Reviews
          </Typography>

          {averageRating ? (
            <Typography sx={{ color: "text.secondary", mt: 1 }}>
              Average rating: <strong>{averageRating}</strong> / 5 (
              {reviews.length} review{reviews.length !== 1 ? "s" : ""})
            </Typography>
          ) : (
            <Typography sx={{ color: "text.secondary", mt: 1 }}>
              No reviews yet.
            </Typography>
          )}

          <Box sx={{ mt: 3 }}>
            {reviews.length === 0 ? (
              <Typography sx={{ color: "text.secondary" }}>
                Be the first to leave a review.
              </Typography>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {reviews.map((review) => (
                  <Card
                    key={review.id}
                    sx={{
                      backgroundColor: "background.paper",
                      borderRadius: 2,
                    }}
                  >
                    <CardContent>
                      <Typography sx={{ fontWeight: 700 }}>
                        {review.reviewer} · {review.rating}/5
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", mt: 0.5 }}
                      >
                        {review.date}
                      </Typography>
                      <Typography
                        sx={{
                          mt: 1.5,
                          color: "text.secondary",
                          lineHeight: 1.7,
                        }}
                      >
                        {review.comment}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </Box>
        </Box>

        <Card
          component="section"
          sx={{
            mt: 6,
            backgroundColor: "background.paper",
            borderRadius: 2,
          }}
        >
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              Leave a Review
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <ReviewForm productId={id} />
          </CardContent>
        </Card>
      </Container>

      <Footer />
    </>
  );
}
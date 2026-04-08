import Link from "next/link";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ReviewForm from "../../components/ReviewForm";
import { mockProducts } from "../../data/products";
import { mockReviews } from "../../data/reviews";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;

  const product = mockProducts.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <>
        <Header />
        <main
          style={{
            padding: "1.5rem",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          <h2>Product Not Found</h2>
          <p>The requested product could not be found.</p>
        </main>
        <Footer />
      </>
    );
  }

  const productReviews = mockReviews.filter(
    (review) => review.productId === product.id,
  );

  const averageRating =
    productReviews.length > 0
      ? (
          productReviews.reduce((sum, review) => sum + review.rating, 0) /
          productReviews.length
        ).toFixed(1)
      : null;

  return (
    <>
      <Header />

      <main
        style={{
          padding: "1.5rem",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          <div>
            <Image
              src="/placeholder.svg"
              alt={product.name}
              width={400}
              height={400}
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
          </div>

          <div>
            <h2>{product.name}</h2>

            <p style={{ color: "#555", marginTop: "1rem", lineHeight: 1.6 }}>
              {product.description}
            </p>

            <p
              style={{
                fontWeight: "bold",
                fontSize: "1.25rem",
                marginTop: "1rem",
              }}
            >
              {product.price}
            </p>

            <p style={{ marginTop: "1rem" }}>
              Seller:{" "}
              <Link
                href={`/sellers/${product.sellerId}`}
                style={{ color: "#1976D2" }}
              >
                View seller profile
              </Link>
            </p>
          </div>
        </section>

        <section style={{ marginTop: "3rem" }}>
          <h3>Reviews</h3>

          {averageRating ? (
            <p style={{ color: "#555", marginTop: "0.5rem" }}>
              Average rating: <strong>{averageRating}</strong> / 5 (
              {productReviews.length} review
              {productReviews.length !== 1 ? "s" : ""})
            </p>
          ) : (
            <p style={{ color: "#555", marginTop: "0.5rem" }}>
              No reviews yet.
            </p>
          )}

          <div style={{ marginTop: "1.5rem" }}>
            {productReviews.length === 0 ? (
              <p style={{ color: "#555" }}>Be the first to leave a review.</p>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {productReviews.map((review) => (
                  <article
                    key={review.id}
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      padding: "1rem",
                      backgroundColor: "#fff",
                    }}
                  >
                    <p style={{ margin: 0, fontWeight: "bold" }}>
                      {review.user || "User"} · {review.rating}/5
                    </p>
                    <p
                      style={{
                        color: "#777",
                        fontSize: "0.9rem",
                        marginTop: "0.25rem",
                      }}
                    >
                      {review.date}
                    </p>
                    <p
                      style={{
                        marginTop: "0.75rem",
                        color: "#555",
                        lineHeight: 1.6,
                      }}
                    >
                      {review.text}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <section
          style={{
            marginTop: "3rem",
            padding: "1rem",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Leave a Review</h3>
          <ReviewForm />
        </section>
      </main>

      <Footer />
    </>
  );
}

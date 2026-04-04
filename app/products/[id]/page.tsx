import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { mockProducts } from "../../data/products";

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
            <img
              src="https://via.placeholder.com/400"
              alt={product.name}
              style={{ width: "100%", borderRadius: "8px" }}
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
              <Link href="/sellers" style={{ color: "#1976D2" }}>
                View seller profile
              </Link>
            </p>

            <p style={{ marginTop: "1.5rem", color: "#555" }}>
              More product details and reviews will be added here later.
            </p>

            <div
              style={{
                marginTop: "2rem",
                padding: "1rem",
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
              }}
            >
              <h3 style={{ marginTop: 0 }}>Loading and API Note</h3>
              <p style={{ marginTop: "0.5rem", color: "#555", lineHeight: 1.6 }}>
                This page is currently using mock data. Full API integration and
                review loading will be added once the backend is ready.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
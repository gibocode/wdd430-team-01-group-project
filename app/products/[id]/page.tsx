import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { mockProducts } from "../../data/products";

type Props = {
  params: {
    id: string;
  };
};

export default function ProductDetailPage({ params }: Props) {
  const product = mockProducts.find(
    (item) => item.id === Number(params.id)
  );

  if (!product) {
    return (
      <>
        <Header />
        <main style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
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

      <main style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
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
            <p style={{ color: "#555", marginTop: "1rem" }}>
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

            <p style={{ marginTop: "1.5rem" }}>
              More product details, seller information, and reviews will be added
              here later.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
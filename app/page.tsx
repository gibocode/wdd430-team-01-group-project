import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";
import { fetchProducts } from "@/lib/api/products";

export default async function Home() {
  const { products, error } = await fetchProducts();

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
        <HeroBanner />

        <section style={{ marginTop: "2rem" }}>
          <h2>Featured Products</h2>

          {error && (
            <p
              style={{
                marginTop: "0.75rem",
                padding: "0.75rem 1rem",
                backgroundColor: "#fff4e5",
                color: "#8a5a00",
                borderRadius: "6px",
              }}
            >
              {error}
            </p>
          )}

          {products.length === 0 ? (
            <p style={{ marginTop: "1rem", color: "#555" }}>
              Loading products...
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "1.5rem",
                marginTop: "1rem",
              }}
            >
              {products.slice(0, 3).map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <main style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
        <HeroBanner />

        <section style={{ marginTop: "2rem" }}>
          <h2>Featured Products</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1.5rem",
              marginTop: "1rem",
            }}
          >
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
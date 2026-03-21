import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

const mockProducts = [
  {
    id: 1,
    name: "Handmade Vase",
    description: "A carefully crafted ceramic vase.",
    price: "$25.00",
  },
  {
    id: 2,
    name: "Knitted Scarf",
    description: "A soft handmade scarf for everyday wear.",
    price: "$18.00",
  },
  {
    id: 3,
    name: "Wooden Bowl",
    description: "A polished wooden bowl made by hand.",
    price: "$30.00",
  },
  {
    id: 4,
    name: "Beaded Bracelet",
    description: "A colorful bracelet with handmade details.",
    price: "$12.00",
  },
];

export default function CatalogPage() {
  return (
    <>
      <Header />

      <main style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
        <section>
          <h2>Catalog</h2>
          <p style={{ color: "#555" }}>
            Browse handcrafted items from talented artisans.
          </p>
        </section>

        <section
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            marginTop: "1.5rem",
          }}
        >
          <select
            defaultValue=""
            style={{ padding: "0.5rem", borderRadius: "4px" }}
          >
            <option value="" disabled>
              Filter by category
            </option>
            <option value="ceramics">Ceramics</option>
            <option value="clothing">Clothing</option>
            <option value="jewelry">Jewelry</option>
            <option value="home">Home Decor</option>
          </select>

          <select
            defaultValue=""
            style={{ padding: "0.5rem", borderRadius: "4px" }}
          >
            <option value="" disabled>
              Filter by price
            </option>
            <option value="0-20">$0 - $20</option>
            <option value="21-50">$21 - $50</option>
            <option value="51+">$51+</option>
          </select>

          <select
            defaultValue=""
            style={{ padding: "0.5rem", borderRadius: "4px" }}
          >
            <option value="" disabled>
              Sort by
            </option>
            <option value="newest">Newest</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </section>

        <section style={{ marginTop: "2rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {mockProducts.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
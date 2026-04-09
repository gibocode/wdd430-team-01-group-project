import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { fetchProducts } from "@/lib/services/products";

type CatalogPageProps = {
  searchParams: Promise<{
    price?: string;
    sort?: string;
  }>;
};

function parsePrice(price: string): number {
  return Number(price.replace(/[^0-9.]/g, ""));
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams;
  const { products, error } = await fetchProducts();

  let filteredProducts = [...products];

  if (params.price === "0-20") {
    filteredProducts = filteredProducts.filter((product) => {
      const value = parsePrice(product.price);
      return value >= 0 && value <= 20;
    });
  }

  if (params.price === "21-50") {
    filteredProducts = filteredProducts.filter((product) => {
      const value = parsePrice(product.price);
      return value >= 21 && value <= 50;
    });
  }

  if (params.price === "51+") {
    filteredProducts = filteredProducts.filter((product) => {
      const value = parsePrice(product.price);
      return value >= 51;
    });
  }

  if (params.sort === "low-high") {
    filteredProducts.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
  }

  if (params.sort === "high-low") {
    filteredProducts.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
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
        <section>
          <h2>Catalog</h2>
          <p style={{ color: "#555" }}>
            Browse handcrafted items from talented artisans.
          </p>
        </section>

        {error && (
          <p
            style={{
              marginTop: "1rem",
              padding: "0.75rem 1rem",
              backgroundColor: "#fff4e5",
              color: "#8a5a00",
              borderRadius: "6px",
            }}
          >
            {error}
          </p>
        )}

        <section
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            marginTop: "1.5rem",
          }}
        >
          <form
            method="GET"
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            <select
              name="price"
              defaultValue={params.price ?? ""}
              style={{
                padding: "0.5rem",
                borderRadius: "4px",
                minWidth: "180px",
                flex: "1 1 180px",
              }}
            >
              <option value="">Filter by price</option>
              <option value="0-20">$0 - $20</option>
              <option value="21-50">$21 - $50</option>
              <option value="51+">$51+</option>
            </select>

            <select
              name="sort"
              defaultValue={params.sort ?? ""}
              style={{
                padding: "0.5rem",
                borderRadius: "4px",
                minWidth: "180px",
                flex: "1 1 180px",
              }}
            >
              <option value="">Sort by</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>

            <button
              type="submit"
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
                backgroundColor: "#fff",
                cursor: "pointer",
              }}
            >
              Apply
            </button>

            <a
              href="/catalog"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
                textDecoration: "none",
                color: "inherit",
                backgroundColor: "#fff",
              }}
            >
              Clear
            </a>
          </form>
        </section>

        <section style={{ marginTop: "2rem" }}>
          {filteredProducts.length === 0 ? (
            <p style={{ color: "#555" }}>No products found.</p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {filteredProducts.map((product) => (
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

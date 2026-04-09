import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";
import { fetchSellers } from "@/lib/services/sellers";

export default async function SellersPage() {
  const { sellers, error } = await fetchSellers();

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
          <h2>Sellers</h2>
          <p style={{ color: "#555" }}>
            Explore the artisans behind the handcrafted products.
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
            marginTop: "2rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {sellers.length === 0 ? (
            <p style={{ color: "#555" }}>No sellers available yet.</p>
          ) : (
            sellers.map((seller) => (
              <article
                key={seller.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "1rem",
                  backgroundColor: "#fff",
                }}
              >
                <Image
                  src={seller.profileUrl}
                  alt={seller.shopName}
                  width={320}
                  height={220}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "6px",
                    marginBottom: "1rem",
                  }}
                />

                <h3 style={{ marginTop: 0 }}>{seller.shopName}</h3>

                <p style={{ color: "#1976D2", fontWeight: "bold" }}>
                  {seller.sellerName}
                </p>

                <p style={{ color: "#555", marginTop: "0.5rem" }}>
                  {seller.tagline}
                </p>

                <Link
                  href={`/sellers/${seller.id}`}
                  style={{
                    display: "inline-block",
                    marginTop: "1rem",
                    color: "#1976D2",
                  }}
                >
                  View seller profile
                </Link>
              </article>
            ))
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

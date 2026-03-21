import Link from "next/link";

export default function HeroBanner() {
  return (
    <section
      style={{
        padding: "3rem 1rem",
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        marginTop: "1rem",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        Discover Unique Handmade Creations
      </h2>

      <p style={{ maxWidth: "600px", margin: "0 auto 1.5rem auto" }}>
        Explore handcrafted products from talented artisans and support a
        creative community.
      </p>

      <Link
        href="/catalog"
        style={{
          display: "inline-block",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#1976D2",
          color: "white",
          borderRadius: "5px",
          textDecoration: "none",
        }}
      >
        Browse Catalog
      </Link>
    </section>
  );
}
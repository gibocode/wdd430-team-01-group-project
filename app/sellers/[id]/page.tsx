import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import { mockProducts } from "../../data/products";
import { mockSellers } from "../../data/sellers";
import Image from "next/image";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SellerProfilePage({ params }: Props) {
  const { id } = await params;

  const seller = mockSellers.find((item) => item.id === id);

  if (!seller) {
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
          <h2>Seller Not Found</h2>
          <p>The requested seller profile could not be found.</p>
        </main>
        <Footer />
      </>
    );
  }

  const sellerProducts = mockProducts.filter(
    (product) => product.sellerId === seller.id,
  );

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
              src={seller.image}
              alt={seller.shopName}
              width={400}
              height={400}
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
          </div>

          <div>
            <p
              style={{
                color: "#1976D2",
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
            >
              Seller Profile
            </p>

            <h2 style={{ marginTop: 0 }}>{seller.shopName}</h2>

            <p
              style={{
                fontSize: "1.05rem",
                color: "#555",
                marginTop: "0.5rem",
              }}
            >
              {seller.tagline}
            </p>

            <p style={{ marginTop: "1rem" }}>
              <strong>Seller:</strong> {seller.sellerName}
            </p>

            <p style={{ color: "#555", lineHeight: 1.6, marginTop: "1rem" }}>
              {seller.story}
            </p>
          </div>
        </section>

        <section style={{ marginTop: "2rem" }}>
          <h3>Products by this seller</h3>

          {sellerProducts.length === 0 ? (
            <p style={{ color: "#555", marginTop: "1rem" }}>
              No products available for this seller yet.
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
              {sellerProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={String(product.id)}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  image="/placeholder.svg"
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

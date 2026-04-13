import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";
import { fetchProducts } from "@/lib/services/products";
import { Container, Box, Typography, Alert } from "@mui/material";

export default async function Home() {
  const { products, error } = await fetchProducts();

  return (
    <>
      <Header />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <HeroBanner />

        <Box component="section" sx={{ mt: 4 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "text.primary" }}
          >
            Featured Products
          </Typography>

          {error && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {products.length === 0 ? (
            <Typography sx={{ mt: 2, color: "text.secondary" }}>
              Loading products...
            </Typography>
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 3,
                mt: 2,
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
            </Box>
          )}
        </Box>
      </Container>

      <Footer />
    </>
  );
}

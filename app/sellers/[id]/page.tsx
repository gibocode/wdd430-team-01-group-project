import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import Image from "next/image";
import { fetchSellerById } from "@/lib/services/sellers";
import { getAllProductsBySellerId } from "@/models/product";
import { mapProductToUi, UiProduct } from "@/lib/mappers/product";
import {
  Alert,
  Box,
  Container,
  Typography,
} from "@mui/material";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SellerProfilePage({ params }: Props) {
  const { id } = await params;

  const { seller, error } = await fetchSellerById(id);

  if (!seller) {
    return (
      <>
        <Header />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Seller Not Found
          </Typography>
          <Typography color="text.secondary">
            {error || "The requested seller profile could not be found."}
          </Typography>
        </Container>
        <Footer />
      </>
    );
  }

  let sellerProducts: UiProduct[] = [];
  try {
    sellerProducts = (await getAllProductsBySellerId(id)).map(mapProductToUi);
  } catch (err) {
    console.error("Failed to load seller products:", err);
  }

  return (
    <>
      <Header />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {error && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box
          component="section"
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 4,
            alignItems: "start",
          }}
        >
          <Box>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                aspectRatio: "1 / 1",
                borderRadius: 2,
                overflow: "hidden",
                backgroundColor: "background.paper",
              }}
            >
              <Image
                src={seller.profileUrl}
                alt={seller.shopName}
                fill
                style={{ objectFit: "cover" }}
              />
            </Box>
          </Box>

          <Box>
            <Typography
              sx={{
                color: "primary.main",
                fontWeight: 700,
                mb: 1,
              }}
            >
              Seller Profile
            </Typography>

            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {seller.shopName}
            </Typography>

            <Typography
              sx={{
                fontSize: "1.05rem",
                color: "text.secondary",
                mt: 1,
              }}
            >
              {seller.tagline}
            </Typography>

            <Typography sx={{ mt: 2 }}>
              <Box component="span" sx={{ fontWeight: 700 }}>
                Seller:
              </Box>{" "}
              {seller.sellerName}
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                lineHeight: 1.7,
                mt: 2,
              }}
            >
              {seller.story}
            </Typography>
          </Box>
        </Box>

        <Box component="section" sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Products by this seller
          </Typography>

          {sellerProducts.length === 0 ? (
            <Typography sx={{ color: "text.secondary", mt: 2 }}>
              No products available for this seller yet.
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
              {sellerProducts.map((product) => (
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
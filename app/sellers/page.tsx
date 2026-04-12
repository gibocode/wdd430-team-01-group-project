import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";
import { fetchSellers } from "@/lib/services/sellers";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";

export default async function SellersPage() {
  const { sellers, error } = await fetchSellers();

  return (
    <>
      <Header />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box component="section">
          <Typography variant="h4" sx={{ fontWeight: 700, color: "text.primary" }}>
            Sellers
          </Typography>
          <Typography sx={{ mt: 1, color: "text.secondary" }}>
            Explore the artisans behind the handcrafted products.
          </Typography>
        </Box>

        {error && (
          <Alert severity="warning" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}

        <Box
          component="section"
          sx={{
            mt: 4,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 3,
          }}
        >
          {sellers.length === 0 ? (
            <Typography sx={{ color: "text.secondary" }}>
              No sellers available yet.
            </Typography>
          ) : (
            sellers.map((seller) => (
              <Link
                key={seller.id}
                href={`/sellers/${seller.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card
                  sx={{
                    backgroundColor: "background.paper",
                    borderRadius: 2,
                    boxShadow: 1,
                    overflow: "hidden",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 3,
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: 220,
                    }}
                  >
                    <Image
                      src={seller.profileUrl}
                      alt={seller.shopName}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </Box>

                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {seller.shopName}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.5,
                        fontWeight: 600,
                        color: "primary.main",
                      }}
                    >
                      {seller.sellerName}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1,
                        color: "text.secondary",
                        lineHeight: 1.6,
                      }}
                    >
                      {seller.tagline}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 2,
                        color: "primary.main",
                        fontWeight: 500,
                      }}
                    >
                      View seller profile
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </Box>
      </Container>

      <Footer />
    </>
  );
}
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { fetchProducts } from "@/lib/services/products";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Alert,
} from "@mui/material";
import NextLink from "../components/NextLink";

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

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box component="section">
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "text.primary" }}
          >
            Catalog
          </Typography>
          <Typography sx={{ mt: 1, color: "text.secondary" }}>
            Browse handcrafted items from talented artisans.
          </Typography>
        </Box>

        {error && (
          <Alert severity="warning" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="section" sx={{ mt: 4 }}>
          <Box
            component="form"
            method="GET"
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <FormControl size="small" sx={{ minWidth: 180, flex: "1 1 180px" }}>
              <InputLabel id="price-label">Filter by price</InputLabel>
              <Select
                labelId="price-label"
                name="price"
                defaultValue={params.price ?? ""}
                label="Filter by price"
              >
                <MenuItem value="">Filter by price</MenuItem>
                <MenuItem value="0-20">$0 - $20</MenuItem>
                <MenuItem value="21-50">$21 - $50</MenuItem>
                <MenuItem value="51+">$51+</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 180, flex: "1 1 180px" }}>
              <InputLabel id="sort-label">Sort by</InputLabel>
              <Select
                labelId="sort-label"
                name="sort"
                defaultValue={params.sort ?? ""}
                label="Sort by"
              >
                <MenuItem value="">Sort by</MenuItem>
                <MenuItem value="low-high">Price: Low to High</MenuItem>
                <MenuItem value="high-low">Price: High to Low</MenuItem>
              </Select>
            </FormControl>

            <Button type="submit" variant="contained" color="primary">
              Apply
            </Button>

            <Button
              component={NextLink}
              href="/catalog"
              variant="outlined"
              color="primary"
            >
              Clear
            </Button>
          </Box>
        </Box>

        <Box component="section" sx={{ mt: 4 }}>
          {filteredProducts.length === 0 ? (
            <Typography sx={{ color: "text.secondary" }}>
              No products found.
            </Typography>
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 3,
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
            </Box>
          )}
        </Box>
      </Container>

      <Footer />
    </>
  );
}

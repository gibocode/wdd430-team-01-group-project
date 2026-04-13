"use client";

import Link from "next/link";
import { Box, Typography, Button, Container } from "@mui/material";

export default function HeroBanner() {
  return (
    <Box
      component="section"
      sx={{
        mt: 2,
        py: { xs: 5, md: 7 },
        backgroundColor: "background.default",
        borderRadius: 2,
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: "text.primary",
            mb: 2,
          }}
        >
          Discover Unique Handmade Creations
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            mb: 3,
          }}
        >
          Explore handcrafted products from talented artisans and support a
          creative community.
        </Typography>

        <Button
          component={Link}
          href="/catalog"
          variant="contained"
          color="primary"
          size="large"
          sx={{
            px: 4,
            py: 1.2,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Browse Catalog
        </Button>
      </Container>
    </Box>
  );
}

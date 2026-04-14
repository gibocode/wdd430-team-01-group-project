"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

type ProductCardProps = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
};

export default function ProductCard({
  id,
  name,
  description,
  price,
  image,
}: ProductCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 2,
        boxShadow: 1,
        backgroundColor: "background.paper",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 3,
        },
      }}
    >
      <CardActionArea component={Link} href={`/products/${id}`}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 200,
          }}
        >
          <Image src={image} alt={name} fill style={{ objectFit: "cover" }} unoptimized/>
        </Box>

        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {name}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {description}
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              mt: 1,
              fontWeight: 700,
              color: "primary.main",
            }}
          >
            {price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

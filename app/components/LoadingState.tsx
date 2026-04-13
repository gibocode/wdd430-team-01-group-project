"use client";

import { Box, CircularProgress, Typography, Container } from "@mui/material";

type Props = {
  message?: string;
};

export default function LoadingState({ message = "Loading..." }: Props) {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          textAlign: "center",
        }}
      >
        <CircularProgress color="primary" />

        <Typography color="text.secondary">{message}</Typography>
      </Box>
    </Container>
  );
}

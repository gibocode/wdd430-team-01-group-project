"use client";

import {
  Typography,
  Modal,
  Button,
  CardHeader,
  Divider,
  CardContent,
  CardActions,
  Card,
  Box,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { IconTrash } from "@tabler/icons-react";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";

export default function DeleteProductButtonWithModal({
  product,
}: {
  product: Product;
}) {
  const router = useRouter();
  const [openDeleteProductModal, setOpenDeleteProductModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleDeleteProduct = async () => {
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/products/${product._id?.toString()}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete product.");
      }

      setOpenDeleteProductModal(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="error"
        startIcon={<IconTrash />}
        onClick={() => setOpenDeleteProductModal(true)}
        sx={{ textTransform: "none", fontWeight: 600 }}
      >
        Delete
      </Button>

      <Modal
        open={openDeleteProductModal}
        onClose={() => setOpenDeleteProductModal(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2000,
          px: 2,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 460 }}>
          <Card
            sx={{
              backgroundColor: "background.paper",
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <CardHeader
              title="Delete Product"
              slotProps={{
                title: {
                  sx: {
                    fontSize: "1.5rem",
                    fontWeight: 700,
                  },
                },
              }}
            />

            <Divider />

            <CardContent>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <Typography variant="body1" sx={{ color: "text.primary" }}>
                Are you sure you want to delete{" "}
                <Box component="span" sx={{ fontWeight: 700 }}>
                  {product.title}
                </Box>
                ?
              </Typography>

              <Typography sx={{ mt: 1, color: "text.secondary" }}>
                This action cannot be undone.
              </Typography>
            </CardContent>

            <Divider />

            <CardActions
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 1.5,
                p: 2,
              }}
            >
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                onClick={() => setOpenDeleteProductModal(false)}
                sx={{ textTransform: "none", fontWeight: 600 }}
              >
                Cancel
              </Button>

              <Button
                type="button"
                variant="contained"
                color="error"
                onClick={handleDeleteProduct}
                disabled={isSubmitting}
                sx={{ textTransform: "none", fontWeight: 600 }}
              >
                {isSubmitting ? "Deleting..." : "Delete"}
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Modal>
    </>
  );
}

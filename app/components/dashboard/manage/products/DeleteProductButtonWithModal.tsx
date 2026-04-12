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
} from "@mui/material";
import { useState } from "react";
import { IconTrash } from "@tabler/icons-react";
import { Product } from "@/types/product";

export default function DeleteProductButtonWithModal({
  product,
}: {
  product: Product;
}) {
  const [openDeleteProductModal, setOpenDeleteProductModal] = useState(false);

  const handleDeleteProduct = () => {
    console.log(product);
    console.log("Delete product");
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
                onClick={() => {
                  setOpenDeleteProductModal(false);
                  handleDeleteProduct();
                }}
                sx={{ textTransform: "none", fontWeight: 600 }}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Modal>
    </>
  );
}
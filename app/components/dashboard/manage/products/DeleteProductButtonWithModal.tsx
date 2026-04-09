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
        }}
      >
        <Card>
          <CardHeader title="Delete Product" />
          <Divider />
          <CardContent>
            <Typography variant="h6">
              Are you sure you want to delete this product?
            </Typography>
          </CardContent>
          <Divider />
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              padding: 2,
            }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setOpenDeleteProductModal(false);
                handleDeleteProduct();
              }}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setOpenDeleteProductModal(false)}
            >
              Cancel
            </Button>
          </CardActions>
        </Card>
      </Modal>
    </>
  );
}

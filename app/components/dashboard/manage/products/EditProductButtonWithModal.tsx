"use client";

import {
  Button,
  Modal,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  FormGroup,
  FormControl,
  TextField,
  Box,
} from "@mui/material";
import { IconEdit, IconTrash, IconUpload } from "@tabler/icons-react";
import { useState } from "react";
import styled from "@emotion/styled";
import { Product } from "@/types/product";
import Image from "next/image";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function EditProductButtonWithModal({
  product,
}: {
  product: Product;
}) {
  const [openEditProductModal, setOpenEditProductModal] = useState(false);
  const [image, setImage] = useState(product.image);
  const [formValues, setFormValues] = useState({
    name: product.title,
    description: product.description,
    price: product.price,
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };
  const handleRemoveImage = () => {
    const updatedProduct = { ...product, image: "" };
    setImage(updatedProduct.image);
  };
  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
    }
  };
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<IconEdit />}
        sx={{ marginRight: 1 }}
        onClick={() => setOpenEditProductModal(true)}
      >
        Edit
      </Button>
      <Modal
        open={openEditProductModal}
        onClose={() => setOpenEditProductModal(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2000,
        }}
        aria-labelledby="add-product-modal"
        aria-describedby="add-product-modal-description"
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        }}
      >
        <form onSubmit={handleSubmit}>
          <Card sx={{ width: "500px", minHeight: "500px" }}>
            <CardHeader title="Update Product" />
            <Divider />
            <CardContent
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <FormGroup>
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                  <TextField
                    id="product-name"
                    label="Product Name"
                    required
                    value={formValues.name}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                  {(product.image || image) && (
                    <Box
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      gap={2}
                      sx={{ marginBottom: 2 }}
                    >
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={100}
                        height={100}
                        style={{ borderRadius: "8px", maxHeight: "100px" }}
                      />
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<IconTrash />}
                        onClick={handleRemoveImage}
                      >
                        Remove Image
                      </Button>
                    </Box>
                  )}
                  {!product.image && !image && (
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<IconUpload />}
                    >
                      Upload Image
                      <VisuallyHiddenInput
                        type="file"
                        onChange={handleUploadImage}
                      />
                    </Button>
                  )}
                </FormControl>
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                  <TextField
                    id="product-description"
                    label="Product Description"
                    required
                    multiline
                    rows={4}
                    value={formValues.description}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                  <TextField
                    id="product-price"
                    label="Product Price"
                    required
                    type="number"
                    value={formValues.price}
                    onChange={handleChange}
                  />
                </FormControl>
              </FormGroup>
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
                variant="outlined"
                color="secondary"
                onClick={() => setOpenEditProductModal(false)}
              >
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Update Product
              </Button>
            </CardActions>
          </Card>
        </form>
      </Modal>
    </>
  );
}

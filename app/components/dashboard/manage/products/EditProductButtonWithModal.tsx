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
    description: product.description ?? "",
    price: product.price,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleRemoveImage = () => {
    setImage("");
  };

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<IconEdit />}
        sx={{ mr: 1, textTransform: "none", fontWeight: 600 }}
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
          px: 2,
        }}
        aria-labelledby="edit-product-modal"
        aria-describedby="edit-product-modal-description"
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ width: "100%", maxWidth: 520 }}
        >
          <Card
            sx={{
              width: "100%",
              backgroundColor: "background.paper",
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <CardHeader
              title="Update Product"
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

            <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              <FormGroup>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <TextField
                    id="product-name"
                    name="name"
                    label="Product Name"
                    required
                    value={formValues.name}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                  {image ? (
                    <Box
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      gap={2}
                      sx={{ mb: 2 }}
                    >
                      <Image
                        src={image}
                        alt={formValues.name}
                        width={100}
                        height={100}
                        style={{
                          borderRadius: "8px",
                          objectFit: "cover",
                          maxHeight: "100px",
                        }}
                      />
                      <Button
                        type="button"
                        variant="outlined"
                        color="secondary"
                        startIcon={<IconTrash />}
                        onClick={handleRemoveImage}
                        sx={{ textTransform: "none", fontWeight: 600 }}
                      >
                        Remove Image
                      </Button>
                    </Box>
                  ) : (
                    <Button
                      component="label"
                      role={undefined}
                      variant="outlined"
                      color="primary"
                      tabIndex={-1}
                      startIcon={<IconUpload />}
                      sx={{
                        justifyContent: "flex-start",
                        textTransform: "none",
                        fontWeight: 500,
                      }}
                    >
                      Upload Image
                      <VisuallyHiddenInput
                        type="file"
                        onChange={handleUploadImage}
                      />
                    </Button>
                  )}
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <TextField
                    id="product-description"
                    name="description"
                    label="Product Description"
                    required
                    multiline
                    rows={4}
                    value={formValues.description}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <TextField
                    id="product-price"
                    name="price"
                    label="Product Price"
                    required
                    type="number"
                    value={formValues.price}
                    onChange={handleChange}
                    inputProps={{ step: "0.01", min: 0 }}
                  />
                </FormControl>
              </FormGroup>
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
                onClick={() => setOpenEditProductModal(false)}
                sx={{ textTransform: "none", fontWeight: 600 }}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ textTransform: "none", fontWeight: 600 }}
              >
                Update Product
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Modal>
    </>
  );
}
"use client";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormGroup,
  Modal,
  TextField,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { IconPlus, IconUpload, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";
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

export default function AddProductButtonWithModal({
  sellerId,
}: {
  sellerId: string;
}) {
  const router = useRouter();
  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [error, setError] = useState("");

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadImage = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError("");
    setIsUploadingImage(true);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to upload image.");
      }

      setFormValues((prev) => ({
        ...prev,
        image: data.data.imageUrl,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload image.");
    } finally {
      setIsUploadingImage(false);
      event.target.value = "";
    }
  };

  const handleRemoveImage = () => {
    setFormValues((prev) => ({
      ...prev,
      image: "",
    }));
  };

  const resetForm = () => {
    setFormValues({
      title: "",
      description: "",
      price: "",
      image: "",
    });
    setError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/sellers/${sellerId}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formValues.title,
          description: formValues.description,
          price: Number(formValues.price),
          image: formValues.image || "/placeholder.svg",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create product.");
      }

      resetForm();
      setOpenAddProductModal(false);
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
        color="primary"
        startIcon={<IconPlus />}
        onClick={() => setOpenAddProductModal(true)}
        sx={{ textTransform: "none", fontWeight: 600 }}
      >
        Add Product
      </Button>

      <Modal
        open={openAddProductModal}
        onClose={() => setOpenAddProductModal(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          zIndex: 2000,
          px: 2,
          pt: "88px",
          pb: 3,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "100%",
            maxWidth: 520,
            maxHeight: "calc(100vh - 112px)",
          }}
        >
          <Card
            sx={{
              width: "100%",
              maxHeight: "calc(100vh - 112px)",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "background.paper",
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <CardHeader
              title="Add Product"
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

            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2.5,
                overflowY: "auto",
                flex: 1,
              }}
            >
              {error && <Alert severity="error">{error}</Alert>}

              <FormGroup>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <TextField
                    id="product-name"
                    name="title"
                    label="Product Name"
                    required
                    value={formValues.title}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                  {formValues.image ? (
                    <Box display="flex" alignItems="center" gap={2} sx={{ mb: 2 }}>
                      <Image
                        src={formValues.image}
                        alt={formValues.title || "Uploaded product image"}
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
                      startIcon={
                        isUploadingImage ? undefined : <IconUpload />
                      }
                      sx={{
                        justifyContent: "flex-start",
                        textTransform: "none",
                        fontWeight: 500,
                      }}
                      disabled={isUploadingImage}
                    >
                      {isUploadingImage ? (
                        <>
                          <CircularProgress size={18} sx={{ mr: 1 }} />
                          Uploading Image...
                        </>
                      ) : (
                        "Upload Image"
                      )}
                      <VisuallyHiddenInput
                        type="file"
                        accept="image/*"
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
                onClick={() => setOpenAddProductModal(false)}
                sx={{ textTransform: "none", fontWeight: 600 }}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitting || isUploadingImage}
                sx={{ textTransform: "none", fontWeight: 600 }}
              >
                {isSubmitting ? "Adding..." : "Add Product"}
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Modal>
    </>
  );
}

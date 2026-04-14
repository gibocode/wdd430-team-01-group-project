"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { IconDeviceFloppy, IconTrash, IconUpload } from "@tabler/icons-react";
import { styled } from "@mui/material/styles";

type SellerFormData = {
  sellerId: string;
  sellerName: string;
  shopName: string;
  tagline: string;
  story: string;
  profileUrl: string;
};

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

export default function ManageProfileForm({
  initialSeller,
}: {
  initialSeller: SellerFormData;
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formValues, setFormValues] = useState({
    sellerName: initialSeller.sellerName,
    shopName: initialSeller.shopName,
    tagline: initialSeller.tagline,
    story: initialSeller.story,
    profileUrl: initialSeller.profileUrl,
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
    setSuccess("");
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
        profileUrl: data.data.imageUrl,
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
      profileUrl: "/placeholder.svg",
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/sellers/${initialSeller.sellerId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update seller information.");
      }

      setSuccess("Seller profile updated successfully.");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update seller information.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={0} sx={{ width: "100%" }}>
        <Grid
          size={{ xs: 12, md: 3 }}
          sx={{
            p: 4,
            pt: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            borderRight: { xs: "none", md: "1px solid" },
            borderBottom: { xs: "1px solid", md: "none" },
            borderColor: "divider",
          }}
        >
          <Avatar
            src={formValues.profileUrl}
            alt={formValues.sellerName}
            sx={{ width: 150, height: 150 }}
          />
          <Typography
            variant="h6"
            sx={{ fontSize: 26, fontWeight: 600, mt: 2, textAlign: "center" }}
          >
            {formValues.sellerName}
          </Typography>
          <Typography
            sx={{ mt: 1, color: "text.secondary", textAlign: "center" }}
          >
            {formValues.shopName}
          </Typography>

          <Box sx={{ mt: 3, width: "100%" }}>
            <Button
              component="label"
              role={undefined}
              variant="outlined"
              color="primary"
              fullWidth
              disabled={isUploadingImage}
              startIcon={isUploadingImage ? undefined : <IconUpload />}
              sx={{
                textTransform: "none",
                fontWeight: 500,
                mb: 1,
              }}
            >
              {isUploadingImage ? (
                <>
                  <CircularProgress size={18} sx={{ mr: 1 }} />
                  Uploading...
                </>
              ) : (
                "Upload Profile Image"
              )}
              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                onChange={handleUploadImage}
              />
            </Button>

            <Button
              type="button"
              variant="outlined"
              color="secondary"
              fullWidth
              startIcon={<IconTrash />}
              onClick={handleRemoveImage}
              disabled={formValues.profileUrl === "/placeholder.svg"}
              sx={{ textTransform: "none", fontWeight: 500 }}
            >
              Remove Image
            </Button>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 9 }} sx={{ p: 4 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <FormControl fullWidth sx={{ mb: 2 }}>
            <FormLabel sx={{ color: "text.secondary", mb: 0.5 }}>
              Seller Name
            </FormLabel>
            <TextField
              id="seller-name"
              name="sellerName"
              variant="outlined"
              value={formValues.sellerName}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <FormLabel sx={{ color: "text.secondary", mb: 0.5 }}>
              Shop Name
            </FormLabel>
            <TextField
              id="shop-name"
              name="shopName"
              variant="outlined"
              value={formValues.shopName}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <FormLabel sx={{ color: "text.secondary", mb: 0.5 }}>
              Tag Line
            </FormLabel>
            <TextField
              id="tagline"
              name="tagline"
              variant="outlined"
              value={formValues.tagline}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <FormLabel sx={{ color: "text.secondary", mb: 0.5 }}>
              Story
            </FormLabel>
            <TextField
              id="story"
              name="story"
              variant="outlined"
              value={formValues.story}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, textTransform: "none", fontWeight: 600 }}
            startIcon={<IconDeviceFloppy />}
            size="large"
            type="submit"
            disabled={isSubmitting || isUploadingImage}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

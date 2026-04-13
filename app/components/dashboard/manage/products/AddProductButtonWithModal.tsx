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
} from "@mui/material";
import { IconPlus, IconUpload } from "@tabler/icons-react";
import { useState } from "react";
import { styled } from "@mui/material/styles";

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

export default function AddProductButtonWithModal() {
  const [openAddProductModal, setOpenAddProductModal] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
          alignItems: "center",
          zIndex: 2000,
          px: 2,
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
              sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
            >
              <FormGroup>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <TextField id="product-name" label="Product Name" required />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
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
                      onChange={(event) => console.log(event.target.files)}
                    />
                  </Button>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <TextField
                    id="product-description"
                    label="Product Description"
                    required
                    multiline
                    rows={4}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <TextField
                    id="product-price"
                    name="price"
                    label="Product Price"
                    required
                    type="number"
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
                sx={{ textTransform: "none", fontWeight: 600 }}
              >
                Add Product
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Modal>
    </>
  );
}

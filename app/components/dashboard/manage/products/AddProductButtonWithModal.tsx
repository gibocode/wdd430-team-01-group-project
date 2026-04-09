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
} from "@mui/material";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { IconUpload } from "@tabler/icons-react";
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
            <CardHeader title="Add Product" />
            <Divider />
            <CardContent
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <FormGroup>
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                  <TextField id="product-name" label="Product Name" required />
                </FormControl>
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
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
                      onChange={(event) => console.log(event.target.files)}
                    />
                  </Button>
                </FormControl>
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                  <TextField
                    id="product-description"
                    label="Product Description"
                    required
                    multiline
                    rows={4}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                  <TextField
                    id="product-price"
                    label="Product Price"
                    required
                    type="number"
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
                onClick={() => setOpenAddProductModal(false)}
              >
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Add Product
              </Button>
            </CardActions>
          </Card>
        </form>
      </Modal>
    </>
  );
}

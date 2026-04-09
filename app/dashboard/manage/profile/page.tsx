import {
  Box,
  Card,
  Typography,
  CardContent,
  Avatar,
  Grid,
  TextField,
  FormLabel,
  FormControl,
  Button,
} from "@mui/material";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { getCurrentUser } from "@/lib/auth";

export default async function ManageProfilePage() {
  const user = await getCurrentUser();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sellers/${user?.userId}`,
  );
  const responseJson = await response.json();
  const seller = responseJson.data;

  return (
    <>
      <Card sx={{ marginBottom: 2 }}>
        <CardContent sx={{ padding: "16px !important" }}>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h4" sx={{ fontSize: 24 }}>
              Seller Profile
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <Card>
        <CardContent sx={{ padding: "0 !important" }}>
          <Grid container spacing={2} sx={{ width: "100%" }}>
            <Grid
              size={3}
              padding={4}
              paddingTop={6}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="start"
              borderRight="1px solid #e0e0e0"
            >
              <Avatar
                src={seller.profileImage}
                alt={seller.sellerName}
                sx={{ width: 150, height: 150 }}
              />
              <Typography
                variant="h6"
                sx={{ fontSize: 26, fontWeight: 500, marginTop: 2 }}
              >
                {seller.sellerName}
              </Typography>
            </Grid>
            <Grid size={9} padding={4}>
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <FormLabel>Seller Name</FormLabel>
                <TextField
                  id="seller-name"
                  variant="outlined"
                  value={seller.sellerName}
                />
              </FormControl>
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <FormLabel>Shop Name</FormLabel>
                <TextField
                  id="shop-name"
                  variant="outlined"
                  value={seller.shopName}
                />
              </FormControl>
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <FormLabel>Tag Line</FormLabel>
                <TextField
                  id="tagline"
                  variant="outlined"
                  value={seller.tagline}
                />
              </FormControl>
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <FormLabel>Story</FormLabel>
                <TextField
                  id="story"
                  variant="outlined"
                  value={seller.story}
                  multiline
                  rows={4}
                />
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
                startIcon={<IconDeviceFloppy />}
                size="large"
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

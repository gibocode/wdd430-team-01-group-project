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

  if (!user) {
    return (
      <Card sx={{ backgroundColor: "background.paper" }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Seller Profile
          </Typography>
          <Typography sx={{ mt: 1, color: "text.secondary" }}>
            You must be logged in to manage your profile.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sellers/${user.userId}`,
    { cache: "no-store" },
  );
  const responseJson = await response.json();
  const seller = responseJson.data;

  if (!seller) {
    return (
      <Card sx={{ backgroundColor: "background.paper" }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Seller Profile
          </Typography>
          <Typography sx={{ mt: 1, color: "text.secondary" }}>
            Seller profile not found.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card
        sx={{
          mb: 2,
          backgroundColor: "background.paper",
          borderRadius: 2,
        }}
      >
        <CardContent sx={{ p: "16px !important" }}>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h4" sx={{ fontSize: 24, fontWeight: 700 }}>
              Seller Profile
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Card
        sx={{
          backgroundColor: "background.paper",
          borderRadius: 2,
        }}
      >
        <CardContent sx={{ p: "0 !important" }}>
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
                src={seller.profileUrl}
                alt={seller.sellerName}
                sx={{ width: 150, height: 150 }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontSize: 26,
                  fontWeight: 600,
                  mt: 2,
                  textAlign: "center",
                }}
              >
                {seller.sellerName}
              </Typography>
              <Typography
                sx={{ mt: 1, color: "text.secondary", textAlign: "center" }}
              >
                {seller.shopName}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 9 }} sx={{ p: 4 }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <FormLabel sx={{ color: "text.secondary", mb: 0.5 }}>
                  Seller Name
                </FormLabel>
                <TextField
                  id="seller-name"
                  variant="outlined"
                  value={seller.sellerName}
                />
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <FormLabel sx={{ color: "text.secondary", mb: 0.5 }}>
                  Shop Name
                </FormLabel>
                <TextField
                  id="shop-name"
                  variant="outlined"
                  value={seller.shopName}
                />
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <FormLabel sx={{ color: "text.secondary", mb: 0.5 }}>
                  Tag Line
                </FormLabel>
                <TextField
                  id="tagline"
                  variant="outlined"
                  value={seller.tagline}
                />
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <FormLabel sx={{ color: "text.secondary", mb: 0.5 }}>
                  Story
                </FormLabel>
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
                sx={{ mt: 2, textTransform: "none", fontWeight: 600 }}
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

import { Box, Card, Typography, CardContent } from "@mui/material";
import { getCurrentUser } from "@/lib/auth";
import ManageProfileForm from "@/app/components/dashboard/manage/profile/ManageProfileForm";

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
          <ManageProfileForm
            initialSeller={{
              sellerId: user.userId,
              sellerName: seller.sellerName,
              shopName: seller.shopName,
              tagline: seller.tagline,
              story: seller.story,
              profileUrl: seller.profileUrl,
            }}
          />
        </CardContent>
      </Card>
    </>
  );
}

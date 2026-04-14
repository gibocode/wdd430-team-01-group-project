import { Product } from "@/types/product";
import {
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Table,
  CardContent,
  Card,
  Typography,
  Box,
  TableContainer,
  Stack,
  ButtonGroup,
} from "@mui/material";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { getCurrentUser } from "@/lib/auth";
import { getOrCreateSeller } from "@/lib/services/sellers";
import AddProductButtonWithModal from "@/app/components/dashboard/manage/products/AddProductButtonWithModal";
import EditProductButtonWithModal from "@/app/components/dashboard/manage/products/EditProductButtonWithModal";
import DeleteProductButtonWithModal from "@/app/components/dashboard/manage/products/DeleteProductButtonWithModal";

export default async function ManageProductsPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <Card sx={{ backgroundColor: "background.paper" }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Manage Products
          </Typography>
          <Typography sx={{ mt: 1, color: "text.secondary" }}>
            You must be logged in to manage products.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const seller = await getOrCreateSeller(user.userId);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sellers/${seller.sellerId.toString()}/products`,
    { cache: "no-store" },
  );
  const responseJson = await response.json();
  const products = responseJson.data ?? [];

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
            gap={2}
            flexWrap="wrap"
          >
            <Typography variant="h4" sx={{ fontSize: 24, fontWeight: 700 }}>
              Manage Products
            </Typography>
            <AddProductButtonWithModal sellerId={user.userId} />
          </Box>
        </CardContent>
      </Card>

      <Card
        sx={{
          backgroundColor: "background.paper",
          borderRadius: 2,
        }}
      >
        <CardContent>
          {products.length === 0 ? (
            <Typography sx={{ color: "text.secondary" }}>
              No products found yet.
            </Typography>
          ) : (
            <>
              {/* Mobile / small screens */}
              <Box
                sx={{
                  display: { xs: "flex", md: "none" },
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                {products.map((product: Product) => (
                  <Card
                    key={product._id?.toString()}
                    sx={{
                      backgroundColor: "background.paper",
                      borderRadius: 2,
                      boxShadow: 1,
                    }}
                  >
                    <CardContent>
                      <Stack spacing={2}>
                        <Box display="flex" gap={2} alignItems="flex-start">
                          <Image
                            src={product.image}
                            alt={product.title}
                            width={64}
                            height={64}
                            style={{
                              borderRadius: "8px",
                              objectFit: "cover",
                              flexShrink: 0,
                            }}
                            unoptimized
                          />

                          <Box sx={{ minWidth: 0 }}>
                            <Typography
                              variant="body1"
                              sx={{
                                fontWeight: 600,
                                wordBreak: "break-word",
                              }}
                            >
                              {product.title}
                            </Typography>

                            <Typography
                              variant="body2"
                              sx={{
                                mt: 0.5,
                                color: "text.secondary",
                                wordBreak: "break-word",
                              }}
                            >
                              {product.description || "-"}
                            </Typography>
                          </Box>
                        </Box>

                        <Typography
                          sx={{ fontWeight: 600, color: "primary.main" }}
                        >
                          {formatCurrency(product.price, "USD")}
                        </Typography>

                        <ButtonGroup>
                          <EditProductButtonWithModal product={product} />
                          <DeleteProductButtonWithModal product={product} />
                        </ButtonGroup>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Box>

              {/* Desktop / medium and up */}
              <TableContainer sx={{ display: { xs: "none", md: "block" } }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{ fontWeight: 700, color: "text.secondary" }}
                      >
                        Product
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: 700, color: "text.secondary" }}
                      >
                        Description
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: 700, color: "text.secondary" }}
                      >
                        Price
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: 700, color: "text.secondary" }}
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {products.map((product: Product) => (
                      <TableRow key={product._id?.toString()} hover>
                        <TableCell>
                          <Box
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                            gap={2}
                          >
                            <Image
                              src={product.image}
                              alt={product.title}
                              width={50}
                              height={50}
                              style={{
                                borderRadius: "8px",
                                maxHeight: "50px",
                                objectFit: "cover",
                              }}
                              unoptimized
                              loading="lazy"
                            />
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: 500 }}
                            >
                              {product.title}
                            </Typography>
                          </Box>
                        </TableCell>

                        <TableCell sx={{ color: "text.secondary" }}>
                          {product.description || "-"}
                        </TableCell>

                        <TableCell
                          sx={{ fontWeight: 600, color: "primary.main" }}
                        >
                          {formatCurrency(product.price, "USD")}
                        </TableCell>

                        <TableCell>
                          <EditProductButtonWithModal product={product} />
                          <DeleteProductButtonWithModal product={product} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}

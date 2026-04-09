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
} from "@mui/material";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { getCurrentUser } from "@/lib/auth";
import AddProductButtonWithModal from "@/app/components/dashboard/manage/products/AddProductButtonWithModal";
import EditProductButtonWithModal from "@/app/components/dashboard/manage/products/EditProductButtonWithModal";
import DeleteProductButtonWithModal from "@/app/components/dashboard/manage/products/DeleteProductButtonWithModal";

export default async function ManageProductsPage() {
  const user = await getCurrentUser();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sellers/${user?.userId}/products`,
  );
  const responseJson = await response.json();
  const products = responseJson.data;

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
              Manage Products
            </Typography>
            <AddProductButtonWithModal />
          </Box>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product: Product) => (
                <TableRow key={product._id?.toString()}>
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
                        style={{ borderRadius: "8px", maxHeight: "50px" }}
                      />
                      <Typography variant="body1">{product.title}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{product.description || "-"}</TableCell>
                  <TableCell>{formatCurrency(product.price, "USD")}</TableCell>
                  <TableCell>
                    <EditProductButtonWithModal product={product} />
                    <DeleteProductButtonWithModal product={product} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

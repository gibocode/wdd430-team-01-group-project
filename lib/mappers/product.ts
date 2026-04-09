import { ObjectId } from "mongodb";

export type UiProduct = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  sellerId: string;
};

type BackendProduct = {
  _id?: ObjectId;
  sellerId?: ObjectId;
  title?: string;
  description?: string;
  price?: number;
  image?: string;
};

export function mapProductToUi(product: BackendProduct): UiProduct {
  return {
    id: product._id?.toString() ?? "",
    name: product.title ?? "Untitled Product",
    description: product.description ?? "",
    price:
      typeof product.price === "number"
        ? `$${product.price.toFixed(2)}`
        : "$0.00",
    image: product.image || "/placeholder.svg",
    sellerId: product.sellerId?.toString() ?? "",
  };
}

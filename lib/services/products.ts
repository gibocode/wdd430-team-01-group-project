import { getAllProducts } from "@/models/product";
import { mapProductToUi, UiProduct } from "@/lib/mappers/product";
import { mockProducts } from "@/app/data/products";

export type FetchProductsResult = {
  products: UiProduct[];
  error: string | null;
  usingFallback: boolean;
};

export async function fetchProducts(): Promise<FetchProductsResult> {
  try {
    const dbProducts = await getAllProducts();

    return {
      products: dbProducts.map(mapProductToUi),
      error: null,
      usingFallback: false,
    };
  } catch (error) {
    console.error("Using mock products fallback:", error);

    return {
      products: mockProducts.map((product) => ({
        id: String(product.id),
        name: product.name,
        description: product.description,
        price: product.price,
        image: "/placeholder.svg",
      })),
      error: "Unable to load live product data. Showing fallback products.",
      usingFallback: true,
    };
  }
}
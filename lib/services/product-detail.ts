import { findProductById } from "@/models/product";
import { mapProductToUi, UiProduct } from "@/lib/mappers/product";
import { mockProducts } from "@/app/data/products";

export type FetchProductResult = {
  product: UiProduct | null;
  error: string | null;
  usingFallback: boolean;
};

export async function fetchProductById(
  id: string,
): Promise<FetchProductResult> {
  try {
    const product = await findProductById(id);

    if (!product) {
      return {
        product: null,
        error: "Product not found.",
        usingFallback: false,
      };
    }

    return {
      product: mapProductToUi(product),
      error: null,
      usingFallback: false,
    };
  } catch (error) {
    console.error("Using mock product fallback:", error);

    const fallbackProduct = mockProducts.find(
      (product) => String(product.id) === id,
    );

    return {
      product: fallbackProduct
        ? {
            id: String(fallbackProduct.id),
            name: fallbackProduct.name,
            description: fallbackProduct.description,
            price: fallbackProduct.price,
            image: "/placeholder.svg",
            sellerId: fallbackProduct.sellerId,
          }
        : null,
      error: fallbackProduct
        ? "Unable to load live product data. Showing fallback product."
        : "Product not found.",
      usingFallback: true,
    };
  }
}
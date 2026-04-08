import { mockProducts } from "@/app/data/products";
import { mapProductToUi, UiProduct } from "@/lib/mappers/product";

type ProductsApiResponse = {
  success: boolean;
  data?: Array<{
    _id?: string;
    title?: string;
    description?: string;
    price?: number;
    image?: string;
  }>;
};

export type FetchProductsResult = {
  products: UiProduct[];
  error: string | null;
  usingFallback: boolean;
};

export async function fetchProducts(): Promise<FetchProductsResult> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/products`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products.");
    }

    const result: ProductsApiResponse = await response.json();

    if (!result.success || !Array.isArray(result.data)) {
      throw new Error("Invalid API response.");
    }

    return {
      products: result.data.map(mapProductToUi),
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

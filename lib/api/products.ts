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

export async function fetchProducts(): Promise<UiProduct[]> {
  try {
    const response = await fetch("http://localhost:3000/api/products", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products.");
    }

    const result: ProductsApiResponse = await response.json();

    if (!result.success || !Array.isArray(result.data)) {
      throw new Error("Invalid API response.");
    }

    return result.data.map(mapProductToUi);
  } catch (error) {
    console.error("Using mock products fallback:", error);

    return mockProducts.map((product) => ({
      id: String(product.id),
      name: product.name,
      description: product.description,
      price: product.price,
      image: "https://via.placeholder.com/200",
    }));
  }
}
import { getAllSellers, findSellerById } from "@/models/seller";
import { mapSellerToUi, UiSeller } from "@/lib/mappers/seller";
import { mockSellers } from "@/app/data/sellers";

export type FetchSellersResult = {
  sellers: UiSeller[];
  error: string | null;
  usingFallback: boolean;
};

export type FetchSellerResult = {
  seller: UiSeller | null;
  error: string | null;
  usingFallback: boolean;
};

export async function fetchSellers(): Promise<FetchSellersResult> {
  try {
    const sellers = await getAllSellers();

    return {
      sellers: sellers.map(mapSellerToUi),
      error: null,
      usingFallback: false,
    };
  } catch (error) {
    console.error("Using mock sellers fallback:", error);

    return {
      sellers: mockSellers.map((seller) => ({
        id: seller.id,
        sellerName: seller.sellerName,
        shopName: seller.shopName,
        tagline: seller.tagline,
        story: seller.story,
        profileUrl: seller.profileUrl || "/placeholder.svg",
      })),
      error: "Unable to load live seller data. Showing fallback sellers.",
      usingFallback: true,
    };
  }
}

export async function fetchSellerById(id: string): Promise<FetchSellerResult> {
  try {
    const seller = await findSellerById(id);

    if (!seller) {
      return {
        seller: null,
        error: "Seller not found.",
        usingFallback: false,
      };
    }

    return {
      seller: mapSellerToUi(seller),
      error: null,
      usingFallback: false,
    };
  } catch (error) {
    console.error("Using mock seller fallback:", error);

    const fallbackSeller = mockSellers.find((seller) => seller.id === id);

    return {
      seller: fallbackSeller
        ? {
            id: fallbackSeller.id,
            sellerName: fallbackSeller.sellerName,
            shopName: fallbackSeller.shopName,
            tagline: fallbackSeller.tagline,
            story: fallbackSeller.story,
            profileUrl: fallbackSeller.profileUrl,
          }
        : null,
      error: fallbackSeller
        ? "Unable to load live seller data. Showing fallback seller."
        : "Seller not found.",
      usingFallback: true,
    };
  }
}
import { getAllSellers, findSellerById, createSeller } from "@/models/seller";
import { findUserById } from "@/models/user";
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

export async function getOrCreateSeller(userId: string) {
  let seller = await findSellerById(userId);

  if (!seller) {
    const user = await findUserById(userId);

    if (!user || !user._id) {
      throw new Error("User not found for seller creation.");
    }

    const defaultName = user.name?.trim() || user.email.split("@")[0];

    seller = await createSeller({
      sellerId: user._id,
      sellerName: defaultName,
      shopName: `${defaultName}'s Shop`,
      tagline: "Update your shop tagline",
      story: "Tell customers about your shop and your products.",
      profileUrl: "/placeholder.svg",
    });
  }

  return seller;
}
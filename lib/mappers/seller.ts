import { WithId } from "mongodb";
import { Seller } from "@/types/seller";

export type UiSeller = {
  id: string;
  sellerName: string;
  shopName: string;
  tagline: string;
  story: string;
  profileUrl: string;
};

function getSafeProfileUrl(profileUrl?: string): string {
  if (!profileUrl) return "/placeholder.svg";
  if (
    profileUrl.startsWith("/") ||
    profileUrl.includes(".mypinata.cloud") ||
    profileUrl.includes("gateway.pinata.cloud")
  ) {
    return profileUrl;
  }
  return "/placeholder.svg";
}

export function mapSellerToUi(seller: WithId<Partial<Seller>>): UiSeller {
  return {
    id: seller.sellerId?.toString() ?? seller._id.toString(),
    sellerName: seller.sellerName ?? "Unknown Seller",
    shopName: seller.shopName ?? "Untitled Shop",
    tagline: seller.tagline ?? "",
    story: seller.story ?? "",
    profileUrl: getSafeProfileUrl(seller.profileUrl),
  };
}
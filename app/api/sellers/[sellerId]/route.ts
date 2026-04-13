import { findSellerById, updateSellerInfo, createSeller } from "@/models/seller";
import { findUserById } from "@/models/user";
import { z } from "zod";

// Seller info data validation
const SellerSchema = z.object({
  sellerName: z.string().min(5, "Seller name must be at least 5 characters"),
  shopName: z.string().min(5, "Shop name must be at least 5 characters"),
  tagline: z.string().min(5, "Tagline must be at least 5 characters"),
  story: z.string().min(10, "Story must be at least 10 characters"),
  profileUrl: z.string().min(5).optional(),
});

// API to get seller info
export async function GET(
  request: Request,
  { params }: { params: Promise<{ sellerId: string }> },
): Promise<Response> {
  try {
    const { sellerId } = await params;

    let seller = await findSellerById(sellerId);

    if (!seller) {
      const user = await findUserById(sellerId);

      if (!user) {
        return Response.json(
          {
            success: false,
            message: "Seller not found.",
          },
          { status: 404 },
        );
      }

      const defaultName = user.name?.trim() || user.email.split("@")[0];

      seller = await createSeller({
        sellerId: user._id!,
        sellerName: defaultName,
        shopName: `${defaultName}'s Shop`,
        tagline: "Update your shop tagline",
        story: "Tell customers about your shop and your products.",
        profileUrl: "/placeholder.svg",
      });
    }

    return Response.json({
      success: true,
      data: seller,
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        success: false,
        message: "Failed to get seller information.",
      },
      { status: 500 },
    );
  }
}

// API to update seller info
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ sellerId: string }> },
): Promise<Response> {
  try {
    const { sellerId } = await params;
    const body = await request.json();

    const validated = SellerSchema.parse(body);

    const success = await updateSellerInfo(sellerId, validated);

    return Response.json({
      success,
      message: "Seller information updated successfully.",
      data: validated,
    });
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return Response.json(
        {
          success: false,
          message: error.issues[0]?.message || "Invalid seller information.",
        },
        { status: 400 },
      );
    }

    return Response.json(
      {
        success: false,
        message: "Failed to update seller information.",
      },
      { status: 500 },
    );
  }
}
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request): Promise<Response> {
  try {
    const pinataJwt = process.env.PINATA_JWT;
    const gatewayUrl =
      process.env.PINATA_GATEWAY_URL || "https://gateway.pinata.cloud/ipfs";

    if (!pinataJwt) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing Pinata credentials.",
        },
        { status: 500 },
      );
    }

    const incomingFormData = await request.formData();
    const file = incomingFormData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "No file uploaded.",
        },
        { status: 400 },
      );
    }

    const uploadFormData = new FormData();
    uploadFormData.append("file", file, file.name);

    const metadata = JSON.stringify({
      name: file.name,
    });
    uploadFormData.append("pinataMetadata", metadata);

    const pinataResponse = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${pinataJwt}`,
        },
        body: uploadFormData,
      },
    );

    const pinataData = await pinataResponse.json();

    if (!pinataResponse.ok) {
      console.error("Pinata upload failed:", pinataData);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to upload image.",
        },
        { status: 500 },
      );
    }

    const ipfsHash = pinataData.IpfsHash;
    const imageUrl = `${gatewayUrl}/${ipfsHash}`;

    return NextResponse.json({
      success: true,
      data: {
        ipfsHash,
        imageUrl,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to upload image.",
      },
      { status: 500 },
    );
  }
}
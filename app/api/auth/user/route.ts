import { verifyToken } from "@/lib/jwt";
import { findUserById } from "@/models/user";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  console.log(request);
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    const payload = verifyToken(token);
    if (!payload || typeof payload === "string") {
      throw new Error("Unauthorized");
    }
    const user = await findUserById(payload.userId);
    return Response.json({
      user: {
        userId: user?._id,
        email: user?.email,
        name: user?.name,
      },
    });
  } catch (error) {
    console.error(error);
    return Response.json({ user: null }, { status: 401 });
  }
}

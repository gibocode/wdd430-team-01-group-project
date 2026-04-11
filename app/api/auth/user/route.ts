import { verifyToken } from "@/lib/jwt";
import { findUserById } from "@/models/user";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return Response.json({ user: null }, { status: 401 });
  }

  try {
    const payload = verifyToken(token);

    if (!payload || typeof payload === "string" || !("userId" in payload)) {
      return Response.json({ user: null }, { status: 401 });
    }

    const user = await findUserById(payload.userId);

    if (!user) {
      return Response.json({ user: null }, { status: 401 });
    }

    return Response.json({
      user: {
        userId: user._id?.toString(),
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error(error);
    return Response.json({ user: null }, { status: 401 });
  }
}

import { z } from "zod";
import { findUserByEmail } from "@/models/user";
import bcrypt from "bcrypt";
import { signToken } from "@/lib/jwt";
import { cookies } from "next/headers";

const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export async function POST(request: Request): Promise<Response> {
  try {
    const { email, password } = await request.json();

    LoginSchema.parse({ email, password });

    const user = await findUserByEmail(email);

    if (!user) {
      throw new Error("Login failed. Invalid email or password.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Login failed. Invalid email or password.");
    }

    // Use jwt to sign a token with the user's id and email
    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
    });

    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return Response.json({
      success: true,
      user: {
        id: user._id.toString(),
        email: user.email,
      },
    });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 400 });
  }
}

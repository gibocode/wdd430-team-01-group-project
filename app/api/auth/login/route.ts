import { z } from "zod";
import { findUserByEmail } from "@/models/user";
import bcrypt from "bcrypt";
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
      return Response.json(
        { error: "Login failed. Invalid email or password." },
        { status: 400 },
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return Response.json(
        { error: "Login failed. Invalid email or password." },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();
    cookieStore.set("session", user._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return Response.json({ success: true, message: "Login successful." });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 400 });
  }
}

import bcrypt from "bcrypt";
import { findUserByEmail, createUser } from "@/models/user";
import { z } from "zod";

const UserSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  confirmPassword: z
    .string()
    .min(8, { message: "Confirm Password must be at least 8 characters long" }),
});

// Register new user
export async function POST(request: Request): Promise<Response> {
  try {
    const { name, email, password, confirmPassword } = await request.json();

    UserSchema.parse({
      name,
      email,
      password,
      confirmPassword,
    });

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match.");
    }

    const user = await findUserByEmail(email);

    // Cannot register user if user email already exists
    if (user) {
      throw new Error("User already exists.");
    }

    // Hash password for security
    const hashedPassword = await bcrypt.hash(password, 20);

    // Create new user and store to the database
    await createUser({ name, email, password: hashedPassword });

    return Response.json({ message: "User successfully created." });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 400 });
  }
}

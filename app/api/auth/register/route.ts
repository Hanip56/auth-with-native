import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const {
      // general
      username,
      email,
      password,
      role,
    } = await req.json();

    if (!username || !email || !password) {
      return new NextResponse(
        "Required field is missing; *username *email *password",
        { status: 400 }
      );
    }

    const userExist = await prisma.user.findUnique({
      where: { email: email },
    });

    if (userExist) {
      return new NextResponse("Email already in use", { status: 400 });
    }

    const hashPass = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashPass,
      },
    });

    return NextResponse.json({ ...user, password: undefined });
  } catch (error) {
    console.log("[REGISTER_USER]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

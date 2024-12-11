import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new NextResponse("Required field is missing; *email *password", {
        status: 400,
      });
    }

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!isMatchPassword) {
      throw new Error("Credentials is not valid");
    }

    const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    });

    return NextResponse.json({
      ...user,
      token,
      password: undefined,
      hidden: undefined,
    });
  } catch (error) {
    console.log("[LOGIN_USER]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

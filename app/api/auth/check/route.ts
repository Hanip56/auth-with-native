import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("id");

    if (!userId) {
      return new NextResponse("userId not found", { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    return NextResponse.json({ message: "User exist" }, { status: 200 });
  } catch (error) {
    console.error("[CHECK_USER]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

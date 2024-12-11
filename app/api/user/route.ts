import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const users = await prisma.user.findMany({});

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.log("[GET_USER]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

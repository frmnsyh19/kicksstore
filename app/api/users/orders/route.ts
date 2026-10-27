import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      {
        status: 400,
        message: "User tidak ditemukan",
      },
      {
        status: 400,
      },
    );
  }

  const filter = req.nextUrl.searchParams.get("status") ?? "";

  const userId = session.user.id;

  const data = await prisma.checkout.findMany({
    where: {
      user_id: userId,
      status: filter,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(
    {
      status: 200,
      message: "Get Data Success",
      data: data,
    },
    {
      status: 200,
    },
  );
}

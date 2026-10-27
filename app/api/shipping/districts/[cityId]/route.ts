// app/api/shipping/districts/[cityId]/route.ts
import { rajaOngkirGet } from "@/lib/rajaOngkir";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ cityId: string }> },
) {
  try {
    const { cityId } = await params;
    const data = await rajaOngkirGet(`/destination/district/${cityId}`);
    return NextResponse.json(data.data ?? []);
  } catch (error) {
    console.error("GET /api/shipping/districts error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data kecamatan" },
      { status: 500 },
    );
  }
}

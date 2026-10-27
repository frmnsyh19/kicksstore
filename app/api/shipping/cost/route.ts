// app/api/shipping/cost/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { destinationId, weight, courier } = await req.json();

    if (!destinationId || !weight) {
      return NextResponse.json(
        { error: "destinationId dan weight wajib diisi" },
        { status: 400 },
      );
    }

    const params = new URLSearchParams({
      origin: "1336", // ID KECAMATAN toko
      destination: String(destinationId), // ID KECAMATAN tujuan
      weight: String(weight),
      courier: courier ?? "jne:sicepat:jnt:anteraja:ninja", // banyak kurir dipisah titik dua
      price: "lowest",
    });

    const res = await fetch(
      "https://rajaongkir.komerce.id/api/v1/calculate/district/domestic-cost",
      {
        method: "POST",
        headers: {
          key: process.env.RAJAONGKIR_API_KEY as string,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.meta?.message ?? "Gagal menghitung ongkos kirim" },
        { status: res.status },
      );
    }

    return NextResponse.json(data.data ?? []);
  } catch (error) {
    console.error("POST /api/shipping/cost error:", error);
    return NextResponse.json(
      { error: "Gagal menghitung ongkos kirim" },
      { status: 500 },
    );
  }
}

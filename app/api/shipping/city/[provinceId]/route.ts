import { rajaOngkirGet } from "@/lib/rajaOngkir";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ provinceId: string }> },
) {
  try {
    const { provinceId } = await params;

    // return NextResponse.json(
    //   { data: provinceId },
    //   {
    //     status: 200,
    //   },s
    // );

    if (!provinceId) {
      return NextResponse.json(
        { error: "params province is not found" },
        { status: 400 },
      );
    }

    const data = await rajaOngkirGet(`/destination/city/${provinceId}`);

    return NextResponse.json(
      { status: true, data: data.data, message: "success" },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("GET /api/shipping/cities error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data kota" },
      { status: 500 },
    );
  }
}

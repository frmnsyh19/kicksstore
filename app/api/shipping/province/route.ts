import axios, { isAxiosError } from "axios";
import { NextResponse } from "next/server";

const BASE_URL = "https://rajaongkir.komerce.id/api/v1";

const rajaOngkir = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const revalidate = 86400; // 1 hari (60 * 60 * 24)

export async function GET() {
  const apikey = process.env.RAJAONGKIR_API_KEY;

  if (!apikey) {
    return NextResponse.json(
      {
        status: false,
        message: "API KEY NOT FOUND",
      },
      {
        status: 500,
      },
    );
  }

  try {
    const { data } = await rajaOngkir.get("/destination/province", {
      headers: {
        Key: apikey,
      },
    });

    return NextResponse.json(
      {
        status: false,
        data: data.data,
        message: "Success Get Province By Rajaongkir",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("RajaOngkir error:", error.response?.data ?? error.message);

      return NextResponse.json(
        {
          success: false,
          message:
            error.response?.data?.meta?.message ??
            "Gagal mengambil data provinsi",
        },
        { status: error.response?.status ?? 502 },
      );
    }

    console.error("Unexpected error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan pada server" },
      { status: 500 },
    );
  }
}

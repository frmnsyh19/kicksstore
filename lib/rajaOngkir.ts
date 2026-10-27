// lib/rajaongkir.ts
const BASE_URL = "https://rajaongkir.komerce.id/api/v1";

export async function rajaOngkirGet(path: string) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { key: process.env.RAJAONGKIR_API_KEY as string },
    next: { revalidate: 60 * 60 * 24 }, // cache 1 hari, data wilayah jarang berubah
  });

  if (!res.ok) {
    throw new Error(`RajaOngkir error ${res.status}`);
  }

  return res.json();
}

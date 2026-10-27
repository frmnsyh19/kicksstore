import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type ShippingOption = {
  name: string; // nama kurir, mis. "Jalur Nugraha Ekakurir (JNE)"
  code: string; // kode kurir, mis. "jne", "sicepat", "jnt" (dipakai untuk grouping)
  service: string; // kode layanan, mis. "REG", "YES"
  description: string; // deskripsi layanan, mis. "Layanan Reguler"
  cost: number; // ongkos kirim dalam rupiah
  etd: string; // estimasi sampai, mis. "2-3 day"
};

export function useGetShippingCost(destinationId?: number, weight?: number) {
  return useQuery({
    queryKey: ["shippingCost", destinationId, weight],
    queryFn: async () => {
      const res = await axios.post<ShippingOption[]>("/api/shipping/cost", {
        destinationId,
        weight,
      });
      return res.data;
    },
    enabled: !!destinationId && !!weight, // otomatis jalan setelah kecamatan dipilih
    staleTime: 1000 * 60 * 10,
  });
}

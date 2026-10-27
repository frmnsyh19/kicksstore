import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetCity(provinceId?: number) {
  return useQuery({
    queryKey: ["GetCity", provinceId],
    queryFn: async () => {
      const res = await axios.get(`/api/shipping/city/${provinceId}`);
      return res.data.data;
    },
    enabled: !!provinceId, // jangan fetch sebelum provinsi dipilih
    staleTime: 1000 * 60 * 60 * 24,
  });
}

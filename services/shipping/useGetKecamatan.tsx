import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Region = {
  id: number;
  name: string;
  zip_code?: string; // ada di sebagian response (kota/kecamatan), jadi dibuat opsional
};

export function useGetKecamatan(cityId?: number) {
  return useQuery<Region[]>({
    queryKey: ["GetDistrict", cityId],
    queryFn: async () =>
      (await axios.get(`/api/shipping/districts/${cityId}`)).data,
    enabled: !!cityId,
    staleTime: 1000 * 60 * 60 * 24,
  });
}

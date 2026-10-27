import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Province = {
  provinceid: string;
  province: string;
};

interface ApiResponse {
  data: {
    rajaongkir: {
      results: {
        province_id: string;
        province: string;
      }[];
    };
  };
}

export const useGetProvince = () => {
  return useQuery({
    queryKey: ["Province"],
    queryFn: async () => {
      try {
        const res = await axios.get("/api/shipping/province");

        if (res.status === 200) {
          // const resData = res.data.data.rajaongkir.results.map((province) => ({
          //   provinceid: province.province_id,
          //   province: province.province,
          // }));

          return res.data.data;
        } else {
          throw new Error("kjksekwqheqwjeqwlwkl;");
        }
      } catch (error) {
        console.error("Failed to fetch province data:", error);
        throw new Error("Unable to fetch province data.");
      }
    },
  });
};

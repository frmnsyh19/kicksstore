import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export const useGetUserOrders = (status: string) => {
  return useQuery({
    queryKey: ["GetUserOrder", status],
    queryFn: async () => {
      const res = await axios.get("/api/users/orders", {
        params: {
          status: status,
        },
      });

      return res.data.data;
    },
    placeholderData: keepPreviousData,
  });
};

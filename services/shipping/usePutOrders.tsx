import { queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

export const usePutOrders = () => {
  return useMutation({
    mutationKey: ["CancelOrder"],
    mutationFn: async (id: number) => {
      const res = await axios.put("/api/shipping/checkout", {
        id,
      });
      return res.data;
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["GetUserOrder"] });
      toast.success("success update data");
      console.log(res);
    },
  });
};

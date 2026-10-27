import { queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

interface Product {
  id: number;
  image: string;
  price: number;
  qty: number;
  name: string;
  size: string;
  brand: string;
  total: number;
}

type BodyParams = {
  point: string;
  province: string;
  city: string;
  kurir: string;
  kecamatan: string;
  phone: string;
  ongkir: number;
  totalProduct: number;
  estimasi: string;
  subtotal: number;
  items: { productId: string; image: string; size: string; quantity: number }[];
};

export const useMutateFormCheckout = () => {
  const route = useRouter();
  return useMutation({
    mutationKey: ["CheckoutMutate"],
    mutationFn: async (body: BodyParams) => {
      try {
        const res = await axios.post("/api/shipping/checkout", body);

        return res.data;
      } catch (error) {
        toast.error("Gagal membuat order");
        console.log(error);
      }
    },
    onSuccess: (data) => {
      sessionStorage.removeItem("checkoutItems");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Order berhasil dibuat");
      route.push("/");
    },
  });
};

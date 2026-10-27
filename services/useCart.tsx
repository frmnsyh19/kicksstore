import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CartItem } from "@/lib/Session";

export function useGetCart() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async (): Promise<CartItem[]> => {
      const res = await axios.get("/api/cart");
      return res.data;
    },
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["AddToCart"],
    mutationFn: async (item: CartItem) => {
      const res = await axios.post("/api/cart", item);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GetCart"] });
    },
  });
}

export function useUpdateQuantity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["UpdateQuantity"],
    mutationFn: async ({
      productId,
      size,
      quantity,
    }: {
      productId: string;
      size: string;
      quantity: number;
    }) => {
      const res = await axios.patch("/api/cart", { productId, size, quantity });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GetCart"] });
    },
  });
}

export function useRemoveFromCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["RemoveFromCart"],
    mutationFn: async ({
      productId,
      size,
    }: {
      productId: string;
      size: string;
    }) => {
      const res = await axios.delete(
        `/api/cart?productId=${productId}&size=${size}`,
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GetCart"] });
    },
  });
}

import { z } from "zod";

export const CheckoutValidation = z.object({
  phone: z.string().min(1, { message: "Phone Is Required" }),
  point: z.string().min(1, { message: "address Is Required" }),
  city: z.string().min(1, { message: "City is required" }),
  kecamatan: z.string().min(1, { message: "Kecamatan is required" }),
  province: z.string().min(1, { message: "Province is required" }),
});

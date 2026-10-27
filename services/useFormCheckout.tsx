import { CheckoutValidation } from "@/lib/validation/CheckOutValidation";
import { useAppSelector } from "@/store/hook";
import { useFormik } from "formik";

type Product = {
  productId: string;
  size: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type BodyParams = {
  point: string;
  province: string;
  city: string;
  totalProduct: number;
  subtotal: number;
  kurir: string;
  phone: string;
  kecamatan: string;
  ongkir: number;
  estimasi: string;
  items: { productId: string; image: string; size: string; quantity: number }[];
};

export const useFormCheckout = ({
  kurir,
  estimasi,
  ongkir,
  mutate,
}: {
  kurir: string | undefined;
  estimasi: string | undefined;
  ongkir: number | undefined;
  mutate: (data: BodyParams) => void;
}) => {
  const formik = useFormik({
    initialValues: {
      point: "",
      province: "",
      city: "",
      kecamatan: "",
      phone: "",
    },
    validate: (value) => {
      const validationSchema = CheckoutValidation.safeParse(value);
      if (!validationSchema.success) {
        return validationSchema.error.flatten().fieldErrors;
      }

      return {};
    },
    onSubmit: async () => {
      const { point, province, city, kecamatan, phone } = formik.values;

      // selector untuk pengiriman

      const itemsCheckout: Product[] = JSON.parse(
        sessionStorage.getItem("checkoutItems") || "[]",
      );

      console.log("coba cek ini", itemsCheckout);

      const totalQty = itemsCheckout.reduce(
        (acc, item) => acc + item.quantity,
        0,
      );

      const totalPrice = itemsCheckout.reduce((acc, product) => {
        return acc + product.price * product.quantity;
      }, 0);

      const subtotal = totalPrice + (ongkir ?? 0) + 5000;
      mutate({
        point,
        province,
        city,
        totalProduct: totalQty,
        kurir: kurir ?? "",
        kecamatan,
        phone,
        estimasi: estimasi ?? "",
        ongkir: ongkir ?? 0,
        subtotal: subtotal,
        items: itemsCheckout.map((i) => ({
          productId: i.productId,
          image: i.image,
          price: i.price,
          size: i.size,
          quantity: i.quantity,
        })),
      });
    },
  });

  return formik;
};

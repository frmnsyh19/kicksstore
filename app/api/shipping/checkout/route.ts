import { auth } from "@/auth";
import { getSession } from "@/lib/GetSession";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const bodySchema = z.object({
  point: z.string().trim().min(10, "Alamat minimal 10 karakter"),
  province: z.string().min(1, "Pilih provinsi"),
  city: z.string().min(1, "Pilih kota"),
  subtotal: z.number(),
  kecamatan: z.string().min(1, "Pilih Kecamatan"),
  phone: z.string().min(1, "Phone Not Found"),
  kurir: z.string().min(1, "Pilih pengiriman"), // kode kurir, mis. "jne"
  estimasi: z.string().min(1, "Estimasi Not Found"),
  items: z
    .array(
      z.object({
        productId: z.string().min(1, "Product ID is required"),
        size: z.string().min(1, "size number"),
        image: z.string().min(1, "image string"),
        price: z.number(),
        quantity: z.number().int().min(1).max(99),
      }),
    )
    .min(1, "Tidak ada barang untuk di-checkout"),
  totalProduct: z.number().min(0, "Total Product Is Not Found"),
  ongkir: z.number().int().min(0, "Ongkir is required"),
});

const generateInvoiceNumber = (prefix: string) => {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, ""); // 20261021

  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // tanpa O, I, 0, 1 biar tidak membingungkan
  let random = "";
  for (let i = 0; i < 6; i++) {
    random += chars[Math.floor(Math.random() * chars.length)];
  }

  return `${prefix}-${date}-${random}`;
};

export async function POST(req: NextRequest) {
  try {
    const parsed = bodySchema.safeParse(await req.json());

    if (!parsed.success) {
      return NextResponse.json({
        message: "Data Tidak Valid",
        errors: parsed.error.flatten().fieldErrors,
        status: 400,
      });
    }

    const data = parsed.data;

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        {
          message: "User Not Found",
          status: 400,
        },
        { status: 400 },
      );
    }

    const userId = session.user.id;

    const products = await prisma.product.findMany({
      where: { id: { in: data.items.map((i) => i.productId) } },
    });

    const items = data?.items.map((i) => {
      const p = products.find((x) => x.id === i.productId);
      if (!p) throw new Error("PRODUK_TIDAK_ADA");
      return {
        id: p.id,
        name: p.name,
        size: i.size,
        price: p.price,
        quantity: i.quantity,
        image: p.image,
      };
    });

    const noInv = generateInvoiceNumber("INV");

    const order = await prisma.checkout.create({
      data: {
        user_id: userId,
        product: items, // snapshot barang + harga saat checkout
        totalproduct: data?.totalProduct.toString(),
        point: data?.point,
        city: data?.city,
        no_inv: noInv,
        phone: data?.phone,
        kecamatan: data?.kecamatan,
        province: data?.province,
        ongkir: data?.ongkir,
        total: data?.subtotal,
        kurir: data?.kurir.toUpperCase(),
        estimasi: data?.estimasi,
      },
    });

    // Order sudah sukses -> bersihkan item cart yang di-checkout
    try {
      const cartSession = await getSession();
      const ordered = new Set(
        data.items.map((i) => `${i.productId}:${i.size}`),
      );

      cartSession.cart = cartSession.cart.filter(
        (item) => !ordered.has(`${item.productId}:${item.size}`),
      );

      await cartSession.save();
    } catch (err) {
      // gagal hapus cart jangan bikin order dianggap gagal
      console.error("[checkout] gagal bersihkan cart:", err);
    }

    return NextResponse.json({
      data: order,
      message: "Success Order",
      status: 200,
    });
  } catch (error) {
    console.error("[checkout]", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  const { id } = await req.json();

  try {
    const data = await prisma.checkout.update({
      where: { id: id },
      data: { status: "canceled" },
    });

    return NextResponse.json({
      status: 200,
      data: data,
      message: "Cancel Order Success",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

"use client";

import { useAddToCart } from "@/services/useCart";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useState } from "react";
import { toast } from "react-toastify";
type ProductSize = { id: string; size: string; stock: number };

export default function AddToCartForm({
  name,
  price,
  productId,
  image,
  description,
  sizes,
}: {
  name: string;
  productId: string;
  price: number;
  image: string;
  description: string;
  sizes: ProductSize[];
}) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const cartItemsSlice = useAppSelector((state) => state.cart.items);

  console.log(cartItemsSlice, "itemsSlice");

  const isLongDescription = description.length > 50;
  const displayedDescription =
    showFullDescription || !isLongDescription
      ? description
      : description.slice(0, 400) + "...";

  const selectedStock = sizes.find((s) => s.size === selectedSize)?.stock ?? 0;

  const dispatch = useAppDispatch();

  function increaseQty() {
    setQuantity((prev) => Math.min(prev + 1, selectedStock));
  }

  function decreaseQty() {
    setQuantity((prev) => Math.max(prev - 1, 1));
  }

  // const handleAddToCart = () => {
  //   dispatch(
  //     addToCart({
  //       name,
  //       productId,
  //       image,
  //       price,
  //       size: selectedSize,
  //       qty: quantity,
  //     }),
  //   );

  //   toast.success("success add to cart");
  // };

  // function handleAddToCart() {
  //   // TODO: dispatch(addToCart({ ...productData, size: selectedSize, quantity }))
  //   console.log("Add to cart:", { selectedSize, quantity });
  // }

  const { mutate, isPending } = useAddToCart();

  function handleAddToCart() {
    if (!selectedSize) {
      toast.error("Pilih ukuran dulu");
      return;
    }

    mutate(
      { productId, name, image, price, size: selectedSize, quantity },
      {
        onSuccess: () => toast.success("Berhasil ditambahkan ke keranjang!"),
      },
    );
  }

  function handleBuyNow() {
    // TODO: dispatch(addToCart({ ... })) lalu redirect ke /checkout
    console.log("Buy now:", { selectedSize, quantity });
  }

  return (
    <div className="space-y-5">
      {/* Info Produk */}
      <div>
        <h1 className="text-2xl font-semibold">{name}</h1>
        <p className="text-xl font-medium mt-2">
          Rp {price.toLocaleString("id-ID")}
        </p>
        <p className="text-sm text-gray-600 leading-relaxed mt-3">
          {displayedDescription}
          {isLongDescription && (
            <button
              type="button"
              onClick={() => setShowFullDescription((prev) => !prev)}
              className="text-black font-medium ml-1 hover:underline">
              {showFullDescription ? "Sembunyikan" : "Lihat selengkapnya"}
            </button>
          )}
        </p>
      </div>

      {/* Pilih Ukuran */}
      <div>
        <h3 className="text-sm font-medium mb-2">Pilih Ukuran</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => {
            const isOutOfStock = s.stock === 0;
            return (
              <button
                key={s.id}
                type="button"
                disabled={isOutOfStock}
                onClick={() => {
                  setSelectedSize(s.size);
                  setQuantity(1);
                }}
                className={`px-4 py-2 text-sm rounded-md border transition-colors ${
                  isOutOfStock
                    ? "border-gray-200 text-gray-300 cursor-not-allowed line-through"
                    : selectedSize === s.size
                      ? "bg-black text-white border-black"
                      : "border-gray-300 hover:border-black"
                }`}>
                {s.size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Jumlah */}
      {selectedSize && (
        <div>
          <h3 className="text-sm font-medium mb-2">Jumlah</h3>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={decreaseQty}
              className="w-9 h-9 border border-gray-300 rounded-md hover:bg-gray-50">
              −
            </button>
            <span className="w-8 text-center text-sm">{quantity}</span>
            <button
              type="button"
              onClick={increaseQty}
              disabled={quantity >= selectedStock}
              className="w-9 h-9 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-40">
              +
            </button>
            <span className="text-xs text-gray-400 ml-1">
              Stok: {selectedStock}
            </span>
          </div>
        </div>
      )}

      {/* Tombol Aksi */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!selectedSize}
          className="flex-1 border cursor-pointer border-black text-black py-3 rounded-md text-sm font-medium hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed">
          Tambah ke Keranjang
        </button>
        <button
          type="button"
          onClick={handleBuyNow}
          disabled={!selectedSize}
          className="flex-1 bg-black  cursor-pointer text-white py-3 rounded-md text-sm font-medium hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed">
          Beli Sekarang
        </button>
      </div>
    </div>
  );
}

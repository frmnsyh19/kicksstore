"use client";

import {
  useGetCart,
  useRemoveFromCart,
  useUpdateQuantity,
} from "@/services/useCart";
import { useState } from "react";
import CartItemCard from "./CartItemCard";

export const Cart = () => {
  const { data: cart } = useGetCart();
  const { mutate: updateQuantityMutate } = useUpdateQuantity();
  const { mutate: removeItemMutate } = useRemoveFromCart();

  // Nyimpen kombinasi "productId-size" mana aja yang lagi dicentang
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  function toggleSelect(productId: string, size: string) {
    const key = `${productId}-${size}`;
    setSelectedItems((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  }

  function updateQuantity(productId: string, size: string, quantity: number) {
    if (quantity < 1) return; // jangan biarin quantity turun ke 0/negatif
    updateQuantityMutate({ productId, size, quantity });
  }

  function removeItem({
    productId,
    size,
  }: {
    productId: string;
    size: string;
  }) {
    removeItemMutate({ productId, size });
    // sekalian bersihin dari selectedItems kalau item itu lagi dicentang
    setSelectedItems((prev) =>
      prev.filter((k) => k !== `${productId}-${size}`),
    );
  }

  // const handleCheckout = (data: any) => {

  // };

  const safeCart = cart ?? [];

  const handleCheckout = () => {
    const itemsToCheckout = safeCart.filter((item) =>
      selectedItems.includes(`${item.productId}-${item.size}`),
    );

    if (itemsToCheckout.length === 0) return;

    sessionStorage.setItem("checkoutItems", JSON.stringify(itemsToCheckout));
    window.location.href = "/checkout";
  };

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer-5"
          className="drawer-button btn btn-ghost btn-sm">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />{" "}
            </svg>
            <span className="badge badge-sm indicator-item">
              {cart?.length || 0}
            </span>
          </div>
        </label>
      </div>

      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer-5"
          aria-label="close sidebar"
          className="drawer-overlay"></label>

        <div className="bg-base-100 min-h-full w-80 p-4 flex flex-col">
          <h2 className="text-lg font-semibold mb-2">Keranjang Belanja</h2>

          {cart && cart.length > 0 ? (
            <>
              {/* Select all */}
              <label className="flex items-center justify-end w-full gap-2 mb-3 cursor-pointer text-sm">
                Pilih Semua
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  checked={selectedItems.length === cart.length}
                  onChange={() => {
                    if (selectedItems.length === cart.length) {
                      setSelectedItems([]); // uncheck semua
                    } else {
                      setSelectedItems(
                        cart.map((item) => `${item.productId}-${item.size}`),
                      );
                    }
                  }}
                />
              </label>

              <div className="flex-1 overflow-y-auto">
                {cart.map((item) => (
                  <CartItemCard
                    key={`${item.productId}-${item.size}`}
                    name={item.name}
                    image={item.image}
                    size={item.size}
                    price={item.price}
                    quantity={item.quantity}
                    checked={selectedItems.includes(
                      `${item.productId}-${item.size}`,
                    )}
                    onCheckChange={() =>
                      toggleSelect(item.productId, item.size)
                    }
                    onIncrease={() =>
                      updateQuantity(
                        item.productId,
                        item.size,
                        item.quantity + 1,
                      )
                    }
                    onDecrease={() =>
                      updateQuantity(
                        item.productId,
                        item.size,
                        item.quantity - 1,
                      )
                    }
                    onRemove={() =>
                      removeItem({ productId: item.productId, size: item.size })
                    }
                  />
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-400 text-center py-10">
              Keranjang kamu masih kosong.
            </p>
          )}

          {cart && cart.length > 0 && (
            <div className="w-full p-4 border-t bg-base-100">
              <div className="flex justify-between text-sm mb-2">
                <span>{selectedItems.length} item dipilih</span>
                <span className="font-semibold">
                  Rp{" "}
                  {cart
                    .filter((item) =>
                      selectedItems.includes(`${item.productId}-${item.size}`),
                    )
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0,
                    )
                    .toLocaleString("id-ID")}
                </span>
              </div>
              <button
                className="btn btn-primary w-full"
                disabled={selectedItems.length === 0}
                onClick={handleCheckout}>
                Checkout ({selectedItems.length})
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

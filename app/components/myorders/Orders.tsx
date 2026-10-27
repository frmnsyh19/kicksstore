"use client";

import { useGetUserOrders } from "@/services/useGetUserOrders";
import React, { useState } from "react";
import { OrderTimeline } from "./TimelineStatus";
import { formatPrice } from "@/lib/FormatPrice";
import { usePutOrders } from "@/services/shipping/usePutOrders";
import { ConfirmModal } from "../ConfirmModal";
import SneakerLoader from "../LoadingPage";

const filters = [
  { label: "Proces", value: "pending" },
  { label: "Delivery", value: "delivery" },
  { label: "Done", value: "done" },
  { label: "Canceled", value: "canceled" },
];

type Product = {
  id: string; // id produk di DB string
  name: string;
  size: string;
  image: string;
  price: number;
  quantity: number;
};

interface Orders {
  totalproduct: string;
  point: string;
  kecamatan: string;
  ongkir: number;
  city: string;
  phone: string;
  province: string;
  no_inv: string;
  total: number;
  id: number;
  status: string;
  kurir: string;
  estimasi: string;
  createdAt: string;
  updatedAt: string;
  product: Product[];
}

export const Orders = () => {
  const [activeFilter, setActiveFilter] = useState<string>("pending");
  const [cancelId, setCancelId] = useState<number | null>(null);

  const { data: orders, isPending } = useGetUserOrders(activeFilter);
  const { mutate, isPending: cancelling } = usePutOrders(); // ← nama beda dari isPending di atas

  if (isPending) {
    return (
      <SneakerLoader messages={["Loading your orders..."]} fullScreen={true} />
    );
  }

  return (
    <div className={`w-full flex flex-col gap-4 lg:pr-16 lg:pl-16 `}>
      <div className="w-full flex flex-col">
        <p className="font-extrabold text-5xl">My Orders</p>
        <span className="mt-1">
          Track the products you have ordered and their shipping status.
        </span>
        <div className="w-full flex flex-row gap-2 mt-4 lg:overflow-hidden overflow-x-scroll">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`shrink-0 px-4 py-2 text-sm rounded-full border transition-colors ${
                activeFilter === filter.value
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:border-black"
              }`}>
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* card product orders */}
      <div className="w-full flex flex-col gap-3 p-2">
        {orders.length > 0 ? (
          orders.map((order: Orders) => (
            // tanpa fragment: div ini langsung jadi elemen terluar, key di sini
            <div
              key={order.id}
              className="w-full bg-white flex flex-col gap-2 p-3 rounded-xl shadow">
              <div className="w-full flex justify-between items-center">
                <div className="w-full flex flex-col">
                  <p className="font-bold">{order.no_inv}</p>
                  <span className="text-sm text-gray-500">
                    {order.createdAt}
                  </span>
                </div>
                <div className="badge badge-soft badge-error">Menunggu</div>
              </div>

              {order.product.map((items) => (
                <div
                  key={`${items.id}-${items.size}`}
                  className="w-full p-3 flex justify-between items-center border border-r-white border-l-white border-t-gray-300 border-b-white">
                  <div className="flex gap-1">
                    <div className="flex gap-1 w-20 h-20">
                      <img
                        src={items.image}
                        className="object-cover"
                        alt={items.name}
                      />
                    </div>
                    <div className="flex flex-col gap-1 justify-center">
                      <span className="font-bold">{items.name}</span>
                      <span className="text-sm text-gray-500">
                        size {items.size}
                      </span>
                    </div>
                  </div>
                  <p className="font-bold">{formatPrice(items.price)}</p>
                </div>
              ))}

              <OrderTimeline status={order.status} />

              <div className="w-full flex justify-between items-center">
                <p className="font-bold">{formatPrice(order.total)}</p>
                <div className="flex gap-1">
                  {order.status === "pending" && (
                    <button
                      onClick={() => setCancelId(order.id)}
                      className="btn bg-red-600 text-white">
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full h-80 flex items-center justify-center">
            <p className="text-gray-500">Tidak ada pesanan yang ditemukan.</p>
          </div>
        )}
      </div>

      {/* modal dipasang sekali, di dalam return */}
      <ConfirmModal
        open={cancelId !== null}
        title="Batalkan pesanan ini?"
        description="Tindakan ini tidak bisa diurungkan."
        confirmText="Ya, batalkan"
        cancelText="Tidak"
        loading={cancelling}
        onClose={() => setCancelId(null)}
        onConfirm={() => {
          if (cancelId === null) return;
          mutate(cancelId, {
            onSuccess: () => setCancelId(null),
          });
        }}
      />
    </div>
  );
};

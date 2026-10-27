"use client";

import { useGetShippingCost } from "@/services/shipping/useGetShippingCost";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setShipping } from "@/store/shippingSlice";
import React, { useRef, useState } from "react";

type ShippingOption = {
  name: string; // nama kurir, mis. "Jalur Nugraha Ekakurir (JNE)"
  code: string; // kode kurir, mis. "jne", "sicepat", "jnt" (dipakai untuk grouping)
  service: string; // kode layanan, mis. "REG", "YES"
  description: string; // deskripsi layanan, mis. "Layanan Reguler"
  cost: number; // ongkos kirim dalam rupiah
  etd: string; // estimasi sampai, mis. "2-3 day"
};

export const ModalDelivery = ({
  kecamatanId,
  totalWeight,
}: {
  kecamatanId: number | "";
  totalWeight: number;
}) => {
  const [selectedShipping, setSelectedShipping] =
    useState<ShippingOption | null>(null);
  const modalRef = useRef<HTMLDialogElement>(null);

  const { data: options, isPending: loadingShipping } = useGetShippingCost(
    kecamatanId === "" ? undefined : kecamatanId,
    totalWeight,
  );

  const shipping = useAppSelector((state) => state.deliverySelected.selected);
  const dispatch = useAppDispatch();

  const groupedOptions = Object.entries(
    (options ?? []).reduce<Record<string, ShippingOption[]>>((acc, opt) => {
      (acc[opt.code] ??= []).push(opt);
      return acc;
    }, {}),
  );

  const openModal = () => {
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  const handleSelecedDeliery = () => {
    if (!selectedShipping) return;
    dispatch(setShipping(selectedShipping));
    closeModal();
  };

  const isDisabled = kecamatanId === "";

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <div className="w-full flex flex-col gap-1 mt-2">
        <div
          role="button"
          tabIndex={isDisabled ? -1 : 0}
          aria-disabled={isDisabled}
          className={`btn w-full text-start p-2 rounded-lg ${
            isDisabled
              ? "btn-disabled opacity-50 cursor-not-allowed pointer-events-none"
              : ""
          }`}
          onClick={() => {
            if (!isDisabled) openModal();
          }}
          onKeyDown={(e) => {
            if (!isDisabled && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              openModal();
            }
          }}>
          Pilih Pengiriman
        </div>
        {shipping ? (
          <div className="w-full border-2 border-blue-500 p-1">
            <span className="text-left">
              {shipping.code.toUpperCase()} — {shipping.service}
              <span className="block text-xs font-normal text-gray-500">
                Estimasi {shipping.etd} · Rp{" "}
                {shipping.cost.toLocaleString("id-ID")}
              </span>
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
      <dialog id="my_modal_1" ref={modalRef} className="modal">
        <div className="modal-box">
          <div className="w-full flex flex-col gap-2">
            <p className="font-bold text-lg">Pilih Pengiriman</p>
            <div className="w-full">
              {loadingShipping && (
                <p className="text-sm text-gray-400">Menghitung ongkir...</p>
              )}

              {groupedOptions.map(([code, services]) => (
                <div key={code}>
                  <p className="text-sm font-semibold uppercase mb-1">{code}</p>
                  <div className="space-y-2">
                    {services.map((opt) => {
                      const key = `${opt.code}-${opt.service}`;
                      const active =
                        selectedShipping &&
                        `${selectedShipping.code}-${selectedShipping.service}` ===
                          key;
                      return (
                        <label
                          key={key}
                          className={`flex items-center justify-between border rounded-lg px-4 py-3 text-sm cursor-pointer ${
                            active
                              ? "border-black bg-gray-50"
                              : "border-gray-200"
                          }`}>
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              checked={!!active}
                              onChange={() => setSelectedShipping(opt)}
                              className="accent-black"
                            />
                            <div>
                              <p className="font-medium">{opt.service}</p>
                              <p className="text-xs text-gray-500">
                                Estimasi {opt.etd}
                              </p>
                            </div>
                          </div>
                          <span className="font-medium">
                            Rp {opt.cost.toLocaleString("id-ID")}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full flex justify-end items-center mt-2">
              <div
                className="btn btn-primary w-full"
                onClick={handleSelecedDeliery}>
                Submit
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

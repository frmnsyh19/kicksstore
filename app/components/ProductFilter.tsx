"use client";

import { useGetBrand } from "@/services/product/useGetBrand";
import React from "react";

interface brandTypes {
  brand: string;
}

const genderOptions = [
  { label: "Men", value: "men" },
  { label: "Women", value: "women" },
];

type selectedFilter = {
  value: string;
};

export const ProductFilter = ({
  selectFilter,
  setSelectFilter,
}: {
  selectFilter: selectedFilter[];
  setSelectFilter: React.Dispatch<React.SetStateAction<selectedFilter[]>>;
}) => {
  const { data: brand } = useGetBrand();

  const isChecked = (value: string) =>
    selectFilter.some((f) => f.value === value);

  const handleSelectedFilter = (valueFilter: string) => {
    setSelectFilter((prev) => {
      const exists = prev.some((x) => x.value === valueFilter);

      if (exists) {
        return prev.filter((x) => x.value !== valueFilter);
      }

      return [...prev, { value: valueFilter }];
    });
  };

  return (
    <>
      {/* ===== DESKTOP: checkbox vertikal ===== */}
      <div className="hidden lg:flex w-full bg-base-100 p-6 flex-col shadow-lg gap-2">
        <div className="w-full flex flex-col gap-3">
          <p className="text-lg capitalize font-bold">Filter</p>
          <div className="flex flex-col gap-3">
            {genderOptions.map((opt) => (
              <div key={opt.value} className="flex flex-row gap-2">
                <input
                  type="checkbox"
                  checked={isChecked(opt.value)}
                  onChange={() => handleSelectedFilter(opt.value)}
                  className="checkbox"
                />
                <span>{opt.label}</span>
              </div>
            ))}
            <div className="flex flex-row gap-2">
              <input type="checkbox" className="checkbox" />
              <span>Terlaris</span>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-3">
          <p className="text-lg capitalize font-bold">Brand</p>
          <div className="flex flex-col gap-3">
            {brand?.map((item: brandTypes, i: number) => (
              <div key={i} className="flex flex-row gap-2">
                <input
                  type="checkbox"
                  checked={isChecked(item.brand)}
                  onChange={() => handleSelectedFilter(item.brand)}
                  className="checkbox"
                />
                <span>{item.brand}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== MOBILE: pill horizontal, bisa di-scroll ===== */}
      <div className="flex lg:hidden w-full flex-col gap-3 overflow-x-auto pb-1">
        <div className="flex flex-row gap-2 flex-nowrap">
          {genderOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleSelectedFilter(opt.value)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm border transition-colors ${
                isChecked(opt.value)
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300"
              }`}>
              {opt.label}
            </button>
          ))}

          {brand?.map((item: brandTypes, i: number) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSelectedFilter(item.brand)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm border transition-colors ${
                isChecked(item.brand)
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300"
              }`}>
              {item.brand}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

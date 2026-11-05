"use client";

import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { SortFilter } from "./SortFilter";
import ProductFilterSort from "./FilterProductSearch";
import { ProductFilter } from "./ProductFilter";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  kategori: string;
  brand: string;
  createdAt: string;

  gender: string;
}

export const DiscoverResult = ({ product }: { product: Product[] }) => {
  const [sort, setSort] = useState<string>("");
  const [selectFilter, setSelectFilter] = useState<{ value: string }[]>([]);

  const router = useRouter();

  const handleDirectDetailProduct = (id: string) => {
    router.push(`/belanja/detail/${id}`);
  };

  const filteredProduct = useMemo(() => {
    let result = [...product]; // salinan baru, biar gak mutate array asli/props

    if (selectFilter.length > 0) {
      result = result.filter((item) =>
        selectFilter.some(
          (f) =>
            f.value === item.kategori ||
            f.value === item.gender ||
            f.value === item.brand,
        ),
      );
    }

    if (sort) {
      result.sort((a, b) => {
        switch (sort) {
          case "newlest":
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          case "oldlest":
            return (
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
          case "highprice":
            return b.price - a.price;
          case "lowprice":
            return a.price - b.price;
          default:
            return 0;
        }
      });
    }

    return result;
  }, [product, selectFilter, sort]); // "sort" wajib masuk dependency, biar useMemo ke-trigger tiap sort berubah

  console.log(filteredProduct, "dksaldsal");

  return (
    <div className="w-full flex flex-col gap-1">
      {/* <ProductFilterSort /> */}
      <SortFilter setSort={setSort} sort={sort} />
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="lg:w-80 w-full bg-base-300 flex flex-col gap-2">
          <ProductFilter
            setSelectFilter={setSelectFilter}
            selectFilter={selectFilter}
          />
        </div>
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2">
          {filteredProduct.map((item) => (
            <div
              key={item.id}
              onClick={() => handleDirectDetailProduct(item.id)}
              className="w-full border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-black transition-shadow shadow-xl">
              <div className="w-full h-48 lg:h-60 bg-gray-50">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{item.kategori}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Rp {item.price.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

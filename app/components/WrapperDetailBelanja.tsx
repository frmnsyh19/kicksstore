"use client";

import React from "react";
import { DetailProductImage } from "./DetailProductImage";
import { useGetDetailProduct } from "@/services/useGetDetailProduct";
import AddToCartForm from "./AddToCartForm";
import SneakerLoader from "./LoadingPage";

export const WrapperDetailBelanja = ({ id }: { id: string }) => {
  const { data, isPending } = useGetDetailProduct(id);

  if (isPending) {
    return (
      <>
        <SneakerLoader />
      </>
    );
  }

  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-2">
      <DetailProductImage image={data.image} gallery={data.images} />
      <div className="w-full lg:w-2/5 p-3 lg:h-full border border-gray-200 shadow">
        <AddToCartForm
          name={data.name}
          image={data.image}
          productId={data.id}
          price={data.price}
          description={data.description}
          sizes={data.sizes}
        />
      </div>
    </div>
  );
};

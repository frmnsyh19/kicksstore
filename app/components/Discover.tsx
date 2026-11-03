"use client";

import { useSearchProducts } from "@/services/useSearchProduct";
import React, { useEffect, useState } from "react";
import { DiscoverFilter } from "./DiscoverFilter";
import { BsArrow90DegLeft } from "react-icons/bs";
import { DiscoverResult } from "./DiscoverResult";

export const Discover = ({ query }: { query: string }) => {
  // const [isProduct, setIsProduct] = useState<boolean>(false);

  const { data: product } = useSearchProducts(query);

  // console.log(product, "product");

  const isProduct = Boolean(product?.length);

  return (
    <div className="w-full flex flex-col gap-3 pl-2 pr-2 lg:pl-8 lg:pr-8">
      {/* <div className="w-full flex flex-row gap-1">
        <div className="flex cursor-pointer flex-row gap-1 p-2 justify-center items-center">
          <BsArrow90DegLeft />
          <span className="font-bold">Back</span>
        </div>
        <div className="flex p-2 cursor-pointer">Home</div>
      </div> */}
      <DiscoverFilter isProduct={isProduct} query={query} />
      <DiscoverResult product={product ?? []} />
    </div>
  );
};

"use client";

import React from "react";
import { DiscoverSearchProduct } from "./DiscoverSearchProduct";
import ProductFilterSort from "./FilterProductSearch";

export const DiscoverFilter = ({
  isProduct,
  query,
}: {
  isProduct: boolean;
  query: string;
}) => {
  if (!isProduct) {
    return <DiscoverSearchProduct query={query} />;
  }

  return (
    <div className="w-full flex flex-col gap-1 mt-2">
      <div className="w-full flex flex-col lg:flex-row gap-1">
        <span className="text-lg">Your Search Result For :</span>
        <p className="text-2xl capitalize font-bold">{query}</p>
      </div>
      {/* <ProductFilterSort /> */}
    </div>
  );
};

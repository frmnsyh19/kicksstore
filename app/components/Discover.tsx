"use client";

import { useSearchProducts } from "@/services/useSearchProduct";
import { DiscoverFilter } from "./DiscoverFilter";
import { DiscoverResult } from "./DiscoverResult";
import SneakerLoader from "./LoadingPage";

export const Discover = ({ query }: { query: string }) => {
  const { data: product, isPending: loadingProduct } = useSearchProducts(query);

  if (loadingProduct) {
    return <SneakerLoader fullScreen={true} />;
  }

  const isProduct = Boolean(product?.length);

  return (
    <div className="w-full flex flex-col gap-3 pl-2 pr-2 lg:pl-8 lg:pr-8">
      <DiscoverFilter isProduct={isProduct} query={query} />
      <DiscoverResult product={product ?? []} />
    </div>
  );
};

import { NavbarSneckers } from "@/app/components/NavbarSneckers";
import { WrapperDetailBelanja } from "@/app/components/WrapperDetailBelanja";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="w-full h-full lg:h-dvh flex flex-col gap-2">
      <NavbarSneckers />
      <WrapperDetailBelanja id={id} />
    </div>
  );
}

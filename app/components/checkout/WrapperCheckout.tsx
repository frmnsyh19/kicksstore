"use client";

import React from "react";
import { Biling } from "./Biling";
import DetailCheckout from "./DetailCheckout";

export const WrapperCheckout = () => {
  // const sessioon = JSON.parse(sessionStorage.getItem("checkoutItems") || "[]");

  // console.log(sessioon, "ini cart ku");

  // console.log(JSON.parse(sessionStorage.getItem("checkoutItems") || "[]"), "session");

  return (
    <div className="w-full flex lg:flex-row flex-col-reverse gap-2 lg:p-4">
      <Biling />
      <DetailCheckout />
    </div>
  );
};

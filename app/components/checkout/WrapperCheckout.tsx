"use client";

import React from "react";
import { Biling } from "./Biling";
import DetailCheckout from "./DetailCheckout";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export const WrapperCheckout = () => {
  // const sessioon = JSON.parse(sessionStorage.getItem("checkoutItems") || "[]");

  // console.log(sessioon, "ini cart ku");

  const { data: user,  } = useSession();

  const router = useRouter();

  if (!user) {
    router.push("/login");
  }

  // console.log(JSON.parse(sessionStorage.getItem("checkoutItems") || "[]"), "session");

  return (
    <div className="w-full flex lg:flex-row flex-col-reverse gap-2 lg:p-4">
      {user && <Biling user={user} />}

      <DetailCheckout />
    </div>
  );
};

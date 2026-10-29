"use client";

import React from "react";
import TextField from "@mui/material/TextField";
// import { FormBilling } from "./FormBilling";
import { useSession } from "next-auth/react";
import { FormBiling } from "./FormBiling";

declare global {
  interface Window {
    snap: {
      pay: (token: string) => void;
    };
  }
}

export const Biling = () => {
  const { data: user } = useSession();

  return (
    <>
      <div className="w-full flex flex-col p-2 gap-3 border border-gray-200 shadow-lg">
        <div className=" w-full hidden lg:flex justify-between p-2 items-center">
          <p className=" text-2xl uppercase font-bold">Kick`s Store</p>
          <p className=" text-2xl uppercase font-bold">Checkout</p>
        </div>
        <div className="w-full flex p-1 gap-1">
          <TextField
            label="Name"
            value={user?.user.name}
            fullWidth
            aria-readonly
            variant="outlined"
          />
        </div>
        <div className="w-full flex p-1 gap-1">
          <TextField
            label="email"
            variant="outlined"
            className="w-full"
            aria-readonly
            value={user?.user.email}
          />
        </div>
        <FormBiling />
        {/* <FormBilling profileid={user?.user.id} /> */}
      </div>
    </>
  );
};

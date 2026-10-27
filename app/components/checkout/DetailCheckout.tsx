"use client";

import React from "react";
import Image from "next/image";
import { formatPrice } from "@/lib/FormatPrice";
import { useAppSelector } from "@/store/hook";
// import { useAppSelector } from "@/Store/Store";

type Product = {
  id: number;
  size: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

// type CartProps = {
//   cart: Product[];
// };

const DetailCheckout = () => {
  // const deliveryProps = useAppSelector((state) => state.DeliveryPropsData);

  const products: Product[] = JSON.parse(
    sessionStorage.getItem("checkoutItems") || "[]",
  );

  const total = products.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  const shipping = useAppSelector((state) => state.deliverySelected.selected);

  return (
    <>
      <div className=" w-full flex  gap-7 flex-col ">
        <div className="w-full flex flex-col gap-1 p-1 border border-gray-300 shadow-lg">
          <div className=" w-full h-10 p-1 border-b border-b-gray-300">
            <p className=" text-lg font-bold">Summry</p>
          </div>
          <div className="w-full p-1 flex flex-col gap-1 justify-start">
            <div className=" w-full flex justify-between items-center">
              <p className=" text-base font-bold">Subtotal</p>
              <span className=" text-base">{formatPrice(total)}</span>
            </div>
            {shipping ? (
              <>
                <div className=" w-full flex justify-between items-center">
                  <p className=" text-base font-bold">Shipping</p>
                  <span className=" text-base">
                    {formatPrice(shipping.cost)}
                  </span>
                </div>
              </>
            ) : (
              ""
            )}
            <div className=" w-full flex justify-between items-center">
              <p className=" text-base font-bold">Tax</p>
              <span className=" text-base">{formatPrice(12000)}</span>
            </div>
          </div>

          <div className="w-full border border-gray-200"></div>
          <div className=" w-full mt-1 p-1 flex justify-between items-center">
            <p className=" text-base font-bold">Order Total</p>
            <span className=" text-base">
              {shipping
                ? formatPrice(total + 12000 + shipping.cost)
                : formatPrice(total + 12000)}
            </span>
          </div>
        </div>

        <div className=" w-full p-1 border border-gray-300 shadow-lg">
          <div className=" w-full flex justify-start h-9 p-1">
            <p className=" text-lg capitalize font-bold">Order Details</p>
          </div>
          <div className=" w-full flex flex-col justify-between gap-2">
            <div className=" w-full flex flex-col p-1 gap-2">
              {products
                ? products.map((items, i) => {
                    return (
                      <div
                        key={i}
                        className="w-full border-b border-b-gray-300 rounded p-1 justify-between items-center flex flex-row gap-3">
                        <div className="flex flex-row gap-4 w-64">
                          {/* <Image
                            src={items.image}
                            width={100}
                            height={80}
                            alt=""
                          /> */}
                          <img
                            src={items.image}
                            className=" w-12 h-12"
                            alt=""
                          />

                          <div className="flex flex-col gap-1 p-1">
                            <div className="w-20 p-1 text-base flex items-center justify-start h-9 border border-gray-500 rounded-md">
                              Size : {items.size}
                            </div>

                            <span className="text-sm font-bold">
                              {items.name}
                            </span>

                            <span className="text-sm text-gray-400">
                              {items.quantity}
                            </span>
                          </div>
                        </div>

                        <div className="h-full flex justify-center items-center">
                          <span className="text-base">
                            {formatPrice(items.price)}
                          </span>
                        </div>
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailCheckout;

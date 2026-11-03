// "use client";

import React from "react";

import { WrapperCoba } from "./WrapperCoba";

// interface Product {
//   name: string;
//   price: number;
//   qty: number;
// }

export default function Page() {
  // const [items, setItems] = useState<Product[]>([]);

  // const products: Product[] = [
  //   {
  //     name: "daging slice",
  //     price: 40000,
  //     qty: 1,
  //   },
  //   {
  //     name: "Sayap Frozen",
  //     price: 22000,
  //     qty: 1,
  //   },
  //   {
  //     name: "paha pentung",
  //     price: 25000,
  //     qty: 1,
  //   },
  // ];

  // function handleThisItems(product: Product) {
  //   setItems([...items, product]);
  // }

  // console.log(items, "ini items");

  return (
    <>
      <div className="w-full h-full flex flex-col gap-2">
        <WrapperCoba />
        {/* {products
          ? products.map((items, i) => {
            return (
                <div
                  key={i}
                  className="flex flex-col w-40 bg-white shadow"
                  onClick={() => handleThisItems(items)}>
                  <p className="font-bold">{items.name}</p>
                  <span className="">{items.price}</span>
                  <span className="">{items.qty} kg</span>
                </div>
              );
            })
          : ""} */}
      </div>
    </>
  );
}

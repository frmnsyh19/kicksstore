import React from "react";
import { SortTitle } from "../components/myorders/SortTitle";
import { Orders } from "../components/myorders/Orders";
import { NavbarSneckers } from "../components/NavbarSneckers";

export default function page() {
  return (
    <div
      style={{
        backgroundColor: "#F4F1EA",
      }}
      className="w-full flex flex-col h-full gap-3 ">
      <NavbarSneckers />
      <Orders />
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MdOutlineSort } from "react-icons/md";

type Props = {
  setSort: React.Dispatch<React.SetStateAction<string>>;
  sort: string;
};

export const SortFilter = ({ setSort, sort }: Props) => {
  // const [filter, setFilter] = useState<string>("");

  // const dispacth = useDispatch();

  // useEffect(() => {
  //   if (filter) {
  //     dispacth(addSetDiscoverProduct({ sort: filter }));
  //   }
  // }, [filter, dispacth]);
  return (
    <div className="p-1 w-full flex justify-end items-end lg:w-full">
      {/* <select className="select w-40">
        <option disabled={true}>Sort</option>
        <option value="new">Newlest</option>
        <option value="old">Oldlest</option>
        <option value="high">High Price</option>
        <option value="low">Low Price</option>
      </select> */}
      {/* change popover-1 and --anchor-1 names. Use unique names for each dropdown */}
      {/* For TSX uncomment the commented types below */}
      <button
        className="btn"
        popoverTarget="popover-1"
        style={{ anchorName: "--anchor-1" } /* as React.CSSProperties */}>
        {sort || sort.length > 0 ? sort : "Sort"}
        <MdOutlineSort />
      </button>

      <ul
        className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
        popover="auto"
        id="popover-1"
        style={{ positionAnchor: "--anchor-1" } /* as React.CSSProperties */}>
        <li onClick={() => setSort("newlest")}>
          <a>Newlest</a>
        </li>
        <li onClick={() => setSort("oldlest")}>
          <a>Oldlest</a>
        </li>
        <li onClick={() => setSort("highprice")}>
          <a>High Price</a>
        </li>
        <li onClick={() => setSort("lowprice")}>
          <a>Low Price</a>
        </li>
      </ul>
    </div>
  );
};

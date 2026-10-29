"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchProducts } from "@/services/useSearchProduct";

export const SearchNavbar = ({
  setActiveSearch,
}: {
  setActiveSearch: (active: boolean) => void;
}) => {
  const router = useRouter();
  const [isSearch, setIsSearch] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { data: results, isFetching } = useSearchProducts(query);

  useEffect(() => {
    if (isSearch) {
      inputRef.current?.focus();
    }
  }, [isSearch]);

  // Klik di luar wrapper -> tutup search + dropdown
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsSearch(false);
        setActiveSearch(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEnterSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const category = query;

    if (e.key === "Enter") {
      // Handle search submission
      router.push(`/discover/${category}`);
    }
  };

  function handleSelectProduct(id: string) {
    setIsSearch(false);
    setActiveSearch(false);
    setQuery("");
    router.push(`/belanja/detail/${id}`);
  }

  const showDropdown = isSearch && query.trim().length > 0;

  return (
    <div ref={wrapperRef} className="relative flex items-center">
      {/* Icon search */}
      <button
        aria-label="Search"
        onClick={() => {
          setIsSearch(true);
          setActiveSearch(true);
        }}
        className={`p-1 hover:opacity-70 transition-opacity duration-200 ${
          isSearch ? "opacity-0 w-0 pointer-events-none" : "opacity-100"
        }`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
          />
        </svg>
      </button>

      {/* Search box */}
      <label
        className={`input flex items-center gap-2 overflow-hidden transition-all duration-300 ease-in-out ${
          isSearch
            ? "lg:w-64 w-36 opacity-100 px-3"
            : "w-0 opacity-0 px-0 border-none"
        }`}>
        <svg
          className="h-[1em] opacity-50 shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24">
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          ref={inputRef}
          type="search"
          placeholder="Cari sepatu..."
          value={query}
          onKeyDown={handleEnterSearch}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent outline-none"
        />
      </label>

      {/* Dropdown hasil, muncul di bawah navbar */}
      {showDropdown && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-100 rounded-lg shadow-xl max-h-96 overflow-y-auto z-50">
          {isFetching && (
            <p className="text-sm text-gray-400 text-center py-6">Mencari...</p>
          )}

          {!isFetching && results && results.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-6">
              Tidak ada produk ditemukan untuk &quot;{query}&quot;
            </p>
          )}

          {!isFetching &&
            results &&
            results.map((product) => (
              <button
                key={product.id}
                onClick={() => handleSelectProduct(product.id)}
                className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 text-left border-b border-gray-50 last:border-none">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded-md shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-sm text-gray-800 truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-500">{product.brand}</p>
                  <p className="text-sm font-medium mt-0.5">
                    Rp {product.price.toLocaleString("id-ID")}
                  </p>
                </div>
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

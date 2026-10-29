"use client";

import React, { useEffect, useState } from "react";
import { Cart } from "./Cart";
import { SearchNavbar } from "./SearchNavbar";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Logo } from "./Navbar/Logo";
import Link from "next/link";

export const NavbarSneckers = () => {
  const [category, setCategory] = useState<string | null>();
  const [activeSearch, setActiveSearch] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (category) {
      router.push(`/discover/${category}`);
    }
  }, [category, router]);

  const { data: session } = useSession();

  console.log(session, "session");

  return (
    <>
      <div className="w-full bg-white flex justify-center items-center">
        <div className="w-full">
          <div className="drawer">
            <input
              id="my-drawer-2"
              type="checkbox"
              className="drawer-toggle lg:hidden"
            />
            <div className="drawer-content flex flex-col">
              {/* Navbar */}
              {/* Navbar */}
              <div className="navbar w-full">
                {/* Kiri: hamburger (mobile) + logo */}
                <div className="navbar-start">
                  <div className="flex-none lg:hidden">
                    <label
                      htmlFor="my-drawer-2"
                      aria-label="open sidebar"
                      className="btn btn-square btn-ghost drawer-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-6 w-6 stroke-current">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h16"></path>
                      </svg>
                    </label>
                  </div>
                  <div className="mx-2 px-2">
                    <Logo />
                  </div>
                </div>

                {/* Tengah: menu (desktop saja) */}
                <div className="navbar-center hidden lg:flex">
                  <ul className="menu menu-horizontal">
                    <li>
                      <a className="text-lg">Home</a>
                    </li>
                    <li>
                      <a
                        className="text-lg"
                        onClick={() => setCategory("running")}>
                        Running
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-lg"
                        onClick={() => setCategory("sneckers")}>
                        Sneckers
                      </a>
                    </li>
                    {session && (
                      <Link className="text-lg ml-1" href={"/myorders"}>
                        My Orders
                      </Link>
                    )}
                  </ul>
                </div>

                {/* Kanan: search, cart, user */}
                <div className="navbar-end">
                  <div className="flex flex-row justify-center items-center">
                    <SearchNavbar setActiveSearch={setActiveSearch} />
                    <div className={activeSearch ? "hidden md:block" : "block"}>
                      <Cart />
                    </div>
                    <div className={activeSearch ? "hidden md:block" : "block"}>
                      {/* isi session ? (...) : (...) tetap sama seperti sebelumnya */}
                      {session ? (
                        <>
                          <div className="dropdown dropdown-end">
                            <div
                              tabIndex={0}
                              role="button"
                              className="btn btn-ghost btn-circle avatar">
                              <div className="w-10 rounded-full">
                                <img
                                  alt="Tailwind CSS Navbar component"
                                  src={`${session.user.image}`}
                                />
                              </div>
                            </div>
                            <ul
                              tabIndex={-1}
                              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                              <li>
                                <a>Settings</a>
                              </li>
                              <li>
                                <a onClick={() => signOut()}>Logout</a>
                              </li>
                            </ul>
                          </div>
                        </>
                      ) : (
                        <>
                          <Link
                            style={{
                              backgroundColor: "#FF5A3C",
                            }}
                            href="/signin"
                            className="btn btn-sm rounded-2xl text-white ">
                            Sign In
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* Page content here */}
              {/* Content */}
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer-2"
                aria-label="close sidebar"
                className="drawer-overlay"></label>
              <ul className="menu bg-base-200 min-h-full w-80 p-4">
                {/* Sidebar content here */}
                <li>
                  <a className="text-lg">Home</a>
                </li>
                <li>
                  <a className="text-lg" onClick={() => setCategory("running")}>
                    Running
                  </a>
                </li>
                <li>
                  <a
                    className="text-lg"
                    onClick={() => setCategory("sneckers")}>
                    Sneckers
                  </a>
                </li>
                {session && (
                  <li>
                    <a
                      href="/myorders"
                      className="text-lg"
                      onClick={() => setCategory("sneckers")}>
                      Sneckers
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

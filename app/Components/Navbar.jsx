"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky backdrop-blur-sm top-0 flex justify-around items-center bg-white/80 font-bold text-gray-500 p-3 z-50 border-b border-gray-200 dark:border-neutral-700 shadow-lg">
      <Link href={"/"} className="text-2xl text-blue-600">
        Shopify
      </Link>

      <div className="flex items-center gap-2">
        <Link href={"/cart"}>
          <div className="flex items-center border text-white border-blue-600 rounded-lg bg-blue-600 hover:bg-blue-800 gap-1 p-3 transition-all duration-30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="8" cy="21" r="1" fill="currentColor" />
              <circle cx="19" cy="21" r="1" fill="currentColor" />

              <path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H5.5" />
            </svg>
            Cart
          </div>
        </Link>

        <Link href={"/signup"}>
          <div className="flex items-center border text-blue-600 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white gap-1 p-3 transition-all duration-30">
            Sign up
          </div>
        </Link>
      </div>
    </nav>
  );
}

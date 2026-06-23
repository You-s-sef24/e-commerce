"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/search/${encodeURIComponent(search)}`);
  }

  return (
    <nav className="sticky backdrop-blur-sm top-0 flex justify-between items-center bg-white/80 font-bold text-gray-500 p-3 z-50 border-b border-gray-200 dark:border-neutral-700 shadow-lg">
      <Link href={"/"} className="text-2xl text-blue-600">
        Shopify
      </Link>

      <form onSubmit={handleSearch}>
        <Field className="w-64 md:w-80 lg:w-150">
          <InputGroup>
            <InputGroupInput
              id="inline-start-input"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputGroupAddon align="inline-start">
              <SearchIcon className="text-muted-foreground" />
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </form>

      <>
        <div className="flex items-center gap-2">
          <Link href={"/cart"}>
            <div className="flex items-center border text-white border-blue-600 rounded-lg bg-blue-600 hover:bg-blue-800 gap-1 p-3 transition-all duration-30">
              <ShoppingCart />
            </div>
          </Link>

          {pathname !== "/signin" && (
            <Link href={"/signin"}>
              <div className="flex items-center border text-blue-600 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white gap-1 p-3 transition-all duration-30">
                Sign in
              </div>
            </Link>
          )}

          {pathname == "/signin" && (
            <Link href={"/signup"}>
              <div className="flex items-center border text-blue-600 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white gap-1 p-3 transition-all duration-30">
                Sign up
              </div>
            </Link>
          )}
        </div>
      </>
    </nav>
  );
}

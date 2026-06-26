"use client";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon, ShoppingCart, UserIcon } from "lucide-react";
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
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b shadow-lg">
      <div className="flex justify-between items-center px-4 py-3">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Shopify
        </Link>

        <div className="flex items-center gap-2">
          <Link href="/cart">
            <Button className="bg-blue-600 hover:bg-blue-800 cursor-pointer">
              <ShoppingCart />
            </Button>
          </Link>
          {pathname !== "/signin" && pathname !== "/signup" && (
            <Link href="/signin">
              <Button className="bg-blue-600 hover:bg-blue-800 cursor-pointer">
                <UserIcon />
                <span className="hidden sm:inline">Sign in</span>
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className="px-4 pb-3">
        <form onSubmit={handleSearch}>
          <InputGroup className="focus-within:!border-blue-400 focus-within:!ring-blue-400">
            <InputGroupInput
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                type="submit"
                className="bg-blue-600 text-white hover:bg-blue-800 hover:text-white cursor-pointer"
              >
                Search
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </form>
      </div>
    </nav>
  );
}

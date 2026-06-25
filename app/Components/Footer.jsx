import { ShoppingCartIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-blue-600 text-white">
      <div className="flex flex-col md:flex-row justify-around items-center p-3">
        <h3 className="flex items-center justify-center gap-2 font-bold text-3xl mb-3">
          <ShoppingCartIcon />
          Shopify
        </h3>
        <p>© 2026 Shopify, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}

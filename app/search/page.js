"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!q) return;
    fetch(`https://dummyjson.com/products/search?q=${q}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, [q]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-blue-600 mb-4">
        Results for &quot;{q}&quot;
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-4">
        {products.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}

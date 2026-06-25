"use client";

import { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import axios from "axios";
import ProductCardSkeleton from "../Components/ProductCardSkeleton";
import BreadcrumbBasic from "../Components/BreadcrumbLinks";


export default function AllProductsPage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 20;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    setLoading(true);
    const skip = (currentPage - 1) * limit;
    axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
      .then((res) => {
        setProducts(res.data.products);
        setTotal(res.data.total);
        setLoading(false);
      });
  }, [currentPage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-4 my-8 px-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="my-8 px-4">
      <BreadcrumbBasic links={[{ name: "Home", url: "/" }]} currentPage={"All Products"}/>
      <h3 className="text-2xl font-bold ms-3">All Products</h3>
      <p className="text-neutral-500 ms-3 mb-5">{total} products found</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex justify-center items-center gap-2 my-6">
        <button
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-md border disabled:opacity-50 cursor-pointer"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((page) => {
            if (page === 1 || page === totalPages) return true;
            if (page >= currentPage - 1 && page <= currentPage + 1) return true;
            return false;
          })
          .reduce((acc, page, idx, arr) => {
            if (idx > 0 && page - arr[idx - 1] > 1) {
              acc.push("...");
            }
            acc.push(page);
            return acc;
          }, [])
          .map((page, idx) =>
            page === "..." ? (
              <span key={`ellipsis-${idx}`} className="px-2 py-2 text-neutral-400">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-md border cursor-pointer ${currentPage === page
                  ? "bg-blue-600 text-white"
                  : "hover:bg-neutral-100"
                  }`}
              >
                {page}
              </button>
            )
          )}

        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-md border disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}
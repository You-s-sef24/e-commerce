"use client";

import axios from "axios";
import { ShoppingBagIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import CategoriesSkeleton from "./CategoriesSkeleton";

export default function CategoriesSection() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <CategoriesSkeleton />;
  }
  
  return (
    <section className="border-t p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h4 className="text-2xl font-bold">Shop by Category</h4>
          <p className="text-neutral-500">
            Find exactly what you&apos;re looking for
          </p>
        </div>
      </div>

      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-3 pb-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="shrink-0 flex flex-col items-center justify-center gap-2 w-32 h-28 bg-blue-50 hover:bg-blue-100 border border-blue-100 hover:border-blue-300 rounded-2xl transition-all cursor-pointer"
            >
              <div className="bg-blue-200 p-3 rounded-full">
                <ShoppingBagIcon size={20} className="text-blue-600" />
              </div>
              <span className="text-xs font-semibold text-center capitalize px-2 leading-tight">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}

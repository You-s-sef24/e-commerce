"use client";

import { useEffect, useState } from "react";
import Card from "./Components/Card";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products)
      })
      .catch((err) => console.error("Fetch failed:", err));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-8 px-4">
      {products.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
}
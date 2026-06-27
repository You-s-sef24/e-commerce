"use client";

import axios from "axios";
import { StarIcon } from "lucide-react";
import Link from "next/link";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import TopRatedSkeleton from "./TopRatedSkeleton";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CartContext } from "../Contexts/CartContext";
import { toast } from "sonner";

export default function TopRatedSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cart, setCart } = useContext(CartContext);
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const topRated = useMemo(() => {
    return [...products].sort((a, b) => b.rating - a.rating).slice(0, 8);
  }, [products]);

  function handleAddToCart(e, product) {
    e.preventDefault();
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    toast.success("Item added to cart");
  }

  if (loading) {
    return <TopRatedSkeleton />;
  }

  return (
    <section className="border-t p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h4 className="text-2xl font-bold">Top Rated</h4>
          <p className="text-neutral-500">
            Customer favorites with the highest ratings
          </p>
        </div>
      </div>

      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="w-full"
        opts={{ align: "start" }}
      >
        <CarouselContent>
          {topRated.map((product) => (
            <CarouselItem key={product.id} className="basis-[240px]">
              <Link href={`/all-products/${product.id}`}>
                <figure className="relative flex flex-col hover:bg-neutral-100 rounded-2xl transition-all cursor-pointer p-2 whitespace-normal w-[220px] h-[420px]">
                  <div className="overflow-hidden rounded-md flex items-center justify-center">
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      className="aspect-[3/4] h-fit w-fit object-cover"
                      width={300}
                      height={400}
                    />
                  </div>
                  <span className="absolute top-2 end-2 bg-red-500 text-white rounded-2xl px-2 text-sm">
                    -{product.discountPercentage}%
                  </span>
                  <figcaption className="flex flex-col flex-1 pt-2">
                    <p className="text-blue-600 capitalize">
                      {product.category}
                    </p>
                    <h3 className="font-bold line-clamp-2 w-[200px]">
                      {product.title}
                    </h3>

                    <div className="flex items-center gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                          key={star}
                          size={14}
                          className={
                            star <= Math.round(product.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-yellow-400 fill-transparent"
                          }
                        />
                      ))}
                      <span className="text-sm text-neutral-500 ml-1">
                        {product.rating.toFixed(1)}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg mb-3">
                      ${product.price.toFixed(2)}{" "}
                      <span className="text-neutral-500 line-through text-sm font-normal">
                        $
                        {(
                          product.price /
                          (1 - product.discountPercentage / 100)
                        ).toFixed(2)}
                      </span>
                    </h3>

                    <div className="flex justify-center mt-auto">
                      <button
                        className="bg-blue-600 hover:bg-blue-800 text-white cursor-pointer w-full rounded-md py-2 text-sm font-medium transition-colors"
                        onClick={(e) => {
                          handleAddToCart(e, product);
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </figcaption>
                </figure>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </section>
  );
}

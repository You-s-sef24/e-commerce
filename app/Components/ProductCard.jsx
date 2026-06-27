import Image from "next/image";
import { StarIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useContext } from "react";
import { CartContext } from "../Contexts/CartContext";

export default function ProductCard({ product }) {
  const { cart, setCart } = useContext(CartContext);
  const { thumbnail, title, rating, price, discountPercentage, category, id } =
    product;

  function handleAddToCart(e) {
    e.preventDefault();
    const exists = cart.find((item) => item.id === id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    toast.success("Item added to cart");
  }

  return (
    <Link href={`/all-products/${id}`}>
      <figure className="relative flex flex-col hover:bg-neutral-100 rounded-2xl transition-all cursor-pointer p-2 w-80 h-full border">
        <div className="overflow-hidden rounded-md flex items-center justify-center">
          <Image
            src={thumbnail}
            alt={title}
            className="aspect-[3/4] h-fit w-fit object-contain"
            width={300}
            height={400}
          />
        </div>
        <span className="absolute top-2 end-2 bg-red-500 text-white rounded-2xl px-2 text-sm">
          -{discountPercentage}%
        </span>
        <figcaption className="flex flex-col flex-1 pt-2">
          <p className="text-blue-600 capitalize">{category}</p>
          <h3 className="font-bold line-clamp-2 w-[200px]">{title}</h3>

          <div className="flex items-center gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                size={14}
                className={
                  star <= Math.round(rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-yellow-400 fill-transparent"
                }
              />
            ))}
            <span className="text-sm text-neutral-500 ml-1">
              {rating.toFixed(1)}
            </span>
          </div>

          <h3 className="font-bold text-lg mb-3">
            ${price.toFixed(2)}{" "}
            <span className="text-neutral-500 line-through text-sm font-normal">
              ${(price / (1 - discountPercentage / 100)).toFixed(2)}
            </span>
          </h3>

          <div className="flex justify-center mt-auto">
            <button
              className="bg-blue-600 hover:bg-blue-800 text-white cursor-pointer w-full rounded-md py-2 text-sm font-medium transition-colors"
              onClick={(e) => {
                handleAddToCart(e);
              }}
            >
              Add to Cart
            </button>
          </div>
        </figcaption>
      </figure>
    </Link>
  );
}

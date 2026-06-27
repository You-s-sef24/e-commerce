import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartItem({ item, onQtyChange, onRemove }) {
  const originalPrice = item.price / (1 - item.discountPercentage / 100);

  return (
    <div className="flex gap-4 py-4">
      <Link href={`/all-products/${item.id}`} className="shrink-0">
        <div className="w-20 h-20 rounded-xl bg-neutral-100 flex items-center justify-center overflow-hidden border border-neutral-200">
          <Image
            src={item.thumbnail}
            alt={item.title}
            width={80}
            height={80}
            className="object-contain w-full h-full p-1"
          />
        </div>
      </Link>

      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <Badge variant="secondary" className="capitalize w-fit text-xs">
          {item.category}
        </Badge>
        <Link href={`/all-products/${item.id}`}>
          <h3 className="font-semibold text-sm text-neutral-800 leading-snug line-clamp-2 hover:text-blue-600 transition-colors">
            {item.title}
          </h3>
        </Link>
        <p className="text-xs text-neutral-400">{item.brand}</p>

        <div className="flex items-center justify-between mt-auto flex-wrap gap-2">
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-neutral-900">
              ${(item.price * item.qty).toFixed(2)}
            </span>
            <span className="text-xs text-neutral-400 line-through">
              ${(originalPrice * item.qty).toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-none"
                onClick={() => onQtyChange(item.id, item.qty - 1)}
              >
                <Minus size={12} />
              </Button>
              <span className="w-7 text-center text-sm font-semibold">
                {item.qty}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-none"
                onClick={() => onQtyChange(item.id, item.qty + 1)}
              >
                <Plus size={12} />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              onClick={() => onRemove(item.id)}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

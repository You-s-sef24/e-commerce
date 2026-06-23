import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProductCard({ product }) {
  const { thumbnail, title, rating, price } = product;

  return (
    <Card className="w-80">
      <Image
        src={thumbnail}
        alt={title}
        width={320}
        height={192}
        className="object-contain w-full h-48"
      />
      <CardHeader>
        <CardTitle className={"font-semibold"}>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          {"★".repeat(Math.floor(rating))}
          {"☆".repeat(5 - Math.floor(rating))}
          <span className="text-gray-500 text-sm ml-1">({rating})</span>
        </div>
        <p className="text-blue-600 text-xl font-semibold mt-2">${price}</p>
      </CardContent>
      <CardFooter>
        <Button className="bg-blue-600 hover:bg-blue-800 w-full cursor-pointer">Add to cart</Button>
      </CardFooter>
    </Card>
  );
}

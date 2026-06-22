import Image from "next/image";

export default function Card({ product }) {
  const { thumbnail, title, rating, price } = product;
  return (
    <div className="flex flex-col border border-blue-600 p-4 rounded-lg transition-transform duration-200">
      <div className="relative w-full h-48 bg-gray-100 mb-2">
        <Image src={thumbnail} alt={title} fill className="object-cover" />
      </div>
      <h3 className="font-bold text-lg">{title}</h3>
      <div className="flex items-center my-1">
        {"★".repeat(Math.floor(rating))}
        {"☆".repeat(5 - Math.floor(rating))}
        <span className="text-gray-500 text-sm ml-1">({rating})</span>
      </div>
      <p className="text-blue-600 text-xl font-semibold mt-auto">${price}</p>

      <button className="text-blue-600 border border-blue-600 rounded-lg hover:text-white hover:bg-blue-600 p-3 mt-5 transition-all duration-40 cursor-pointer">Add to cart</button>
    </div>
  );
}

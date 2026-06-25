import { Button } from "@/components/ui/button";
import {
  ClockIcon,
  MoveRightIcon,
  RecycleIcon,
  ShieldIcon,
  TruckIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-screen items-center px-6 gap-10 bg-blue-50">
      <div className="flex flex-col gap-5">
        <h3 className="text-3xl sm:text-6xl md:text-7xl font-bold text-blue-600">
          Shopify
        </h3>
        <p className="text-xl sm:text-2xl text-neutral-500">
          Discover thousands of products at unbeatable prices. From cutting-edge
          electronics to everyday essentials — we have it all.
        </p>
        <div className="flex">
          <Link
            href={"/all-products"}
            className="flex items-center font-bold text-white bg-blue-600 hover:bg-blue-800 cursor-pointer text-2xl py-4 px-5 gap-1 transition-all rounded-2xl"
          >
            Shop Now <MoveRightIcon />
          </Link>
        </div>
        <hr />
        <div className="flex text-center gap-3">
          <div>
            <h3 className="font-bold text-2xl">50K+</h3>
            <p className="text-neutral-500">Products</p>
          </div>
          <div>
            <h3 className="font-bold text-2xl">2M+</h3>
            <p className="text-neutral-500">Customers</p>
          </div>
          <div>
            <h3 className="font-bold text-2xl">4.9★</h3>
            <p className="text-neutral-500">Avg Rating</p>
          </div>
        </div>
      </div>

      <div className="md:block relative w-full h-[400px] rounded-2xl overflow-hidden hidden">
        <Image
          src="/images/hero.avif"
          alt="Hero"
          fill
          className="object-cover"
        />
      </div>

      <div className="col-span-1 md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4 bg-blue-100 rounded-2xl p-4">
        {[
          {
            icon: <TruckIcon className="text-blue-600" />,
            title: "Free Shipping",
            sub: "Orders over $50",
          },
          {
            icon: <ShieldIcon className="text-blue-600" />,
            title: "Secure Payments",
            sub: "256-bit SSL",
          },
          {
            icon: <RecycleIcon className="text-blue-600" />,
            title: "Easy Returns",
            sub: "30-day policy",
          },
          {
            icon: <ClockIcon className="text-blue-600" />,
            title: "24/7 Support",
            sub: "Always here for you",
          },
        ].map(({ icon, title, sub }) => (
          <div key={title} className="flex items-center gap-3 p-2">
            <div className="bg-blue-200 rounded-lg p-2 shrink-0">{icon}</div>
            <div>
              <h3 className="font-semibold text-sm">{title}</h3>
              <small className="text-neutral-500">{sub}</small>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { ShoppingBag, ArrowRight, Tag } from "lucide-react";
import BreadcrumbLinks from "@/app/Components/BreadcrumbLinks";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import CartItem from "../Components/CartItemCard";
import { CartContext } from "../Contexts/CartContext";

export default function CartPage() {
  const { cart, setCart } = useContext(CartContext);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  function handleQtyChange(id, newQty) {
    if (newQty < 1) {
      handleRemove(id);
      return;
    }
    setCart((prev) => prev.map((item) => item.id === id ? { ...item, qty: newQty } : item));
  }

  function handleRemove(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.error("Item removed from cart");
  }

  function handleCoupon() {
    if (coupon.trim().toLowerCase() === "save10") {
      setCouponApplied(true);
      toast.success("Coupon applied! 10% off");
    } else {
      toast.error("Invalid coupon code");
    }
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const savings = cart.reduce((sum, item) => {
    const original = item.price / (1 - item.discountPercentage / 100);
    return sum + (original - item.price) * item.qty;
  }, 0);
  const couponDiscount = couponApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 50 ? 0 : 4.99;
  const total = subtotal - couponDiscount + shipping;

  const isEmpty = cart.length === 0;

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <BreadcrumbLinks
          links={[{ name: "Home", url: "/" }]}
          currentPage="Cart"
        />

        <h2 className="text-2xl font-bold text-neutral-900 mt-4 mb-6">
          Shopping Cart
          {!isEmpty && (
            <span className="ml-2 text-base font-normal text-neutral-400">
              ({cart.reduce((s, i) => s + i.qty, 0)} items)
            </span>
          )}
        </h2>

        {isEmpty ? (
          <Card className="flex flex-col items-center justify-center py-20 text-center">
            <ShoppingBag size={48} className="text-neutral-300 mb-4" />
            <h3 className="text-lg font-semibold text-neutral-700 mb-1">Your cart is empty</h3>
            <p className="text-sm text-neutral-400 mb-6">Looks like you haven&apos;t added anything yet.</p>
            <Button asChild className="bg-blue-600 hover:bg-blue-800">
              <Link href="/all-products">Browse Products</Link>
            </Button>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="px-6 py-0 divide-y divide-neutral-100">
                  {cart.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onQtyChange={handleQtyChange}
                      onRemove={handleRemove}
                    />
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Tag size={14} className="text-neutral-400" />
                    Coupon Code
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex gap-2">
                  <Input
                    placeholder="e.g. SAVE10"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    disabled={couponApplied}
                    className="text-sm"
                  />
                  <Button
                    variant="outline"
                    onClick={handleCoupon}
                    disabled={couponApplied || !coupon.trim()}
                    className="shrink-0 cursor-pointer"
                  >
                    {couponApplied ? "Applied" : "Apply"}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 text-sm">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-neutral-900">${subtotal.toFixed(2)}</span>
                  </div>

                  {savings > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount savings</span>
                      <span className="font-medium">-${savings.toFixed(2)}</span>
                    </div>
                  )}

                  {couponApplied && (
                    <div className="flex justify-between text-blue-600">
                      <span>Coupon (SAVE10)</span>
                      <span className="font-medium">-${couponDiscount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-neutral-600">
                    <span>Shipping</span>
                    <span className={`font-medium ${shipping === 0 ? "text-emerald-600" : "text-neutral-900"}`}>
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  {shipping > 0 && (
                    <p className="text-xs text-neutral-400">
                      Free shipping on orders over $50
                    </p>
                  )}

                  <Separator />

                  <div className="flex justify-between font-bold text-neutral-900 text-base">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <Button
                    className="w-full gap-2 mt-1 cursor-pointer bg-blue-600 hover:bg-blue-800"
                    onClick={() => toast.success("Proceeding to checkout...")}
                  >
                    Checkout
                    <ArrowRight size={16} />
                  </Button>

                  <Button variant="outline" asChild className="w-full">
                    <Link href="/all-products">Continue Shopping</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
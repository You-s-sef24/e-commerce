"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CartContext } from "../Contexts/CartContext";
import BreadcrumbLinks from "@/app/Components/BreadcrumbLinks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { z } from "zod";

const checkoutSchema = z.object({
    fullName: z.string().min(1, "Full name is required").min(2, "Full name must be at least 2 characters"),
    email: z.string().min(1, "Email is required").email("Enter a valid email address"),
    phone: z.string().min(1, "Phone number is required").min(7, "Enter a valid phone number"),
    address: z.string().min(1, "Address is required").min(5, "Enter a valid address"),
    city: z.string().min(1, "City is required").min(2, "Enter a valid city"),
    state: z.string().min(1, "State is required").min(2, "Enter a valid state"),
    zip: z.string().min(1, "Postal code is required").min(4, "Enter a valid postal code"),
    country: z.string().min(1, "Country is required").min(2, "Enter a valid country"),
    cardName: z.string().min(1, "Card name is required").min(2, "Enter the name on your card"),
    cardNumber: z
        .string()
        .min(1, "Card number is required")
        .refine((v) => v.replace(/\s/g, "").length === 16, "Enter a valid 16-digit card number"),
    expiry: z
        .string()
        .min(1, "Expiry date is required")
        .regex(/^\d{2}\/\d{2}$/, "Enter a valid expiry (MM/YY)"),
    cvv: z
        .string()
        .min(1, "CVV is required")
        .length(3, "CVV must be 3 digits"),
});

const FIELDS = {
    contact: [
        { id: "fullName", label: "Full Name", placeholder: "Youssef Ahmed", type: "text" },
        { id: "email", label: "Email", placeholder: "you@example.com", type: "email" },
        { id: "phone", label: "Phone Number", placeholder: "+20 100 000 0000", type: "tel" },
    ],
    shipping: [
        { id: "address", label: "Address", placeholder: "123 Main St", type: "text" },
        { id: "city", label: "City", placeholder: "Cairo", type: "text" },
        { id: "state", label: "State / Governorate", placeholder: "Cairo", type: "text" },
        { id: "zip", label: "Postal Code", placeholder: "11511", type: "text" },
        { id: "country", label: "Country", placeholder: "Egypt", type: "text" },
    ],
    payment: [
        { id: "cardName", label: "Name on Card", placeholder: "Youssef Ahmed", type: "text" },
        { id: "cardNumber", label: "Card Number", placeholder: "1234 5678 9012 3456", type: "text", maxLength: 19 },
        { id: "expiry", label: "Expiry Date", placeholder: "MM/YY", type: "text", maxLength: 5 },
        { id: "cvv", label: "CVV", placeholder: "123", type: "text", maxLength: 3 },
    ],
};

function formatCardNumber(value) {
    return value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value) {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
}

export default function CheckoutPage() {
    const { cart, setCart } = useContext(CartContext);
    const router = useRouter();
    const [placed, setPlaced] = useState(false);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        fullName: "", email: "", phone: "",
        address: "", city: "", state: "", zip: "", country: "",
        cardName: "", cardNumber: "", expiry: "", cvv: "",
    });

    const [errors, setErrors] = useState({});

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const shipping = subtotal > 50 ? 0 : 4.99;
    const total = subtotal + shipping;
    const isEmpty = cart.length === 0;

    function handleChange(e) {
        const { id, value } = e.target;
        let formatted = value;
        if (id === "cardNumber") formatted = formatCardNumber(value);
        if (id === "expiry") formatted = formatExpiry(value);
        setForm((prev) => ({ ...prev, [id]: formatted }));
        setErrors((prev) => ({ ...prev, [id]: "" }));
    }

    function validate() {
        const result = checkoutSchema.safeParse(form);
        if (result.success) return {};
        return result.error.issues.reduce((acc, issue) => {
            const key = issue.path[0];
            if (!acc[key]) acc[key] = issue.message;
            return acc;
        }, {});
    }

    function handlePlaceOrder() {
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            toast.error("Please fix the errors before placing your order");
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setCart([]);
            setLoading(false);
            setPlaced(true);
        }, 1500);
    }

    if (placed) {
        return (
            <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
                <Card className="max-w-md w-full text-center py-14 px-8">
                    <CheckCircle2 size={52} className="text-emerald-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-neutral-900 mb-2">Order Placed!</h2>
                    <p className="text-neutral-500 text-sm mb-8">
                        Thank you, {form.fullName.split(" ")[0]}! Your order has been received and is being processed.
                    </p>
                    <Button asChild className="w-full bg-blue-600 hover:bg-blue-800">
                        <Link href="/all-products">Continue Shopping</Link>
                    </Button>
                </Card>
            </div>
        );
    }

    if (isEmpty) {
        return (
            <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
                <Card className="max-w-md w-full text-center py-14 px-8">
                    <ShoppingBag size={48} className="text-neutral-300 mx-auto mb-4" />
                    <h2 className="text-lg font-semibold text-neutral-700 mb-2">Your cart is empty</h2>
                    <p className="text-sm text-neutral-400 mb-6">Add items before checking out.</p>
                    <Button asChild className="bg-blue-600 hover:bg-blue-800">
                        <Link href="/all-products">Browse Products</Link>
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50">
            <div className="max-w-5xl mx-auto px-4 py-8">
                <BreadcrumbLinks
                    links={[{ name: "Home", url: "/" }, { name: "Cart", url: "/cart" }]}
                    currentPage="Checkout"
                />

                <h2 className="text-2xl font-bold text-neutral-900 mt-4 mb-6">Checkout</h2>

                <div className="grid lg:grid-cols-3 gap-6 items-start">
                    <div className="lg:col-span-2 flex flex-col gap-5">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base">Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {FIELDS.contact.map(({ id, label, placeholder, type, maxLength }) => (
                                        <div key={id}>
                                            <Label htmlFor={id} className="text-xs text-neutral-500 mb-1 block">{label}</Label>
                                            <Input
                                                id={id}
                                                type={type}
                                                placeholder={placeholder}
                                                value={form[id]}
                                                onChange={handleChange}
                                                maxLength={maxLength}
                                                className={`text-sm ${errors[id] ? "border-red-400 focus-visible:ring-red-400" : ""}`}
                                            />
                                            {errors[id] && <p className="text-xs text-red-500 mt-1">{errors[id]}</p>}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base">Shipping Address</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {FIELDS.shipping.map(({ id, label, placeholder, type, maxLength }) => (
                                        <div key={id} className={id === "address" ? "sm:col-span-2" : ""}>
                                            <Label htmlFor={id} className="text-xs text-neutral-500 mb-1 block">{label}</Label>
                                            <Input
                                                id={id}
                                                type={type}
                                                placeholder={placeholder}
                                                value={form[id]}
                                                onChange={handleChange}
                                                maxLength={maxLength}
                                                className={`text-sm ${errors[id] ? "border-red-400 focus-visible:ring-red-400" : ""}`}
                                            />
                                            {errors[id] && <p className="text-xs text-red-500 mt-1">{errors[id]}</p>}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base">Payment Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {FIELDS.payment.map(({ id, label, placeholder, type, maxLength }) => (
                                        <div key={id} className={id === "cardNumber" ? "sm:col-span-2" : ""}>
                                            <Label htmlFor={id} className="text-xs text-neutral-500 mb-1 block">{label}</Label>
                                            <Input
                                                id={id}
                                                type={type}
                                                placeholder={placeholder}
                                                value={form[id]}
                                                onChange={handleChange}
                                                maxLength={maxLength}
                                                className={`text-sm ${errors[id] ? "border-red-400 focus-visible:ring-red-400" : ""}`}
                                            />
                                            {errors[id] && <p className="text-xs text-red-500 mt-1">{errors[id]}</p>}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base">Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-3">
                                <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-1">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0 overflow-hidden">
                                                <Image
                                                    src={item.thumbnail}
                                                    alt={item.title}
                                                    width={48}
                                                    height={48}
                                                    className="object-contain w-full h-full p-0.5"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-semibold text-neutral-800 line-clamp-1">{item.title}</p>
                                                <p className="text-xs text-neutral-400">Qty: {item.qty}</p>
                                            </div>
                                            <span className="text-xs font-bold text-neutral-900 shrink-0">
                                                ${(item.price * item.qty).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <Separator />

                                <div className="flex justify-between text-sm text-neutral-600">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-neutral-900">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-neutral-600">
                                    <span>Shipping</span>
                                    <span className={`font-medium ${shipping === 0 ? "text-emerald-600" : "text-neutral-900"}`}>
                                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                                    </span>
                                </div>

                                <Separator />

                                <div className="flex justify-between font-bold text-neutral-900">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>

                                <Button
                                    className="w-full mt-1 bg-blue-600 hover:bg-blue-800 cursor-pointer"
                                    onClick={handlePlaceOrder}
                                    disabled={loading}
                                >
                                    {loading ? "Placing Order..." : "Place Order"}
                                </Button>

                                <Button variant="outline" asChild className="w-full">
                                    <Link href="/cart">Back to Cart</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
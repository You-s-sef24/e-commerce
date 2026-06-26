"use client";

import { useEffect, useState } from "react";
import { Star, ShoppingCart, Package, RotateCcw, Truck, Shield, Tag, Minus, Plus, BarChart2 } from "lucide-react";
import BreadcrumbLinks from "@/app/Components/BreadcrumbLinks";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useParams } from "next/navigation";
import axios from "axios";
import ProductDetailSkeleton from "@/app/Components/ProductDetailsSkeleton";

function StarRow({ rating, size = 16 }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <Star
                    key={s}
                    size={size}
                    className={
                        s <= Math.round(rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-neutral-300 fill-neutral-300"
                    }
                />
            ))}
        </div>
    );
}

export default function ProductDetailPage() {
    const { productId } = useParams();
    const [qty, setQty] = useState(1);
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get(`https://dummyjson.com/products/${productId}`)
            .then((res) => {
                setProduct(res.data);
                setLoading(false);
            });
    }, [productId]);

    if (loading || !product) {
        return <ProductDetailSkeleton />
    }

    const originalPrice = product.price / (1 - product.discountPercentage / 100);
    const avgRating = product.reviews.reduce((a, r) => a + r.rating, 0) / product.reviews.length;

    return (
        <div className="min-h-screen bg-neutral-50">
            <div className="max-w-5xl mx-auto px-4 py-8">
                <BreadcrumbLinks
                    links={[{ name: "Home", url: "/" }, { name: "Products", url: "/all-products" }]}
                    currentPage={product.title}
                />

                <Card className="mt-4 overflow-hidden py-0 gap-0">
                    <div className="grid md:grid-cols-2">
                        <div className="relative bg-neutral-50 flex items-center justify-center p-8 min-h-72 border-b md:border-b-0 md:border-r border-neutral-100">
                            <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                                -{product.discountPercentage}%
                            </span>
                            <Image
                                src={product.thumbnail}
                                alt={product.title}
                                width={300}
                                height={300}
                                className="max-h-64 w-auto object-contain drop-shadow-md"
                            />
                        </div>

                        <CardContent className="p-7 flex flex-col gap-4">
                            <div className="flex items-center gap-2 flex-wrap">
                                <Badge variant="secondary" className="capitalize">{product.category}</Badge>
                                <Badge variant="secondary">{product.brand}</Badge>
                                {product.availabilityStatus === "In Stock" && (
                                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                                        In Stock
                                    </Badge>
                                )}
                            </div>

                            <h1 className="text-2xl font-bold text-neutral-900 leading-tight">
                                {product.title}
                            </h1>

                            <div className="flex items-center gap-2">
                                <StarRow rating={product.rating} size={15} />
                                <span className="text-sm font-semibold text-neutral-700">
                                    {product.rating.toFixed(1)}
                                </span>
                                <span className="text-sm text-neutral-400">
                                    ({product.reviews.length} reviews)
                                </span>
                            </div>

                            <p className="text-neutral-500 text-sm leading-relaxed">
                                {product.description}
                            </p>

                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-neutral-900">
                                    ${product.price.toFixed(2)}
                                </span>
                                <span className="text-base text-neutral-400 line-through">
                                    ${originalPrice.toFixed(2)}
                                </span>
                                <span className="text-sm font-semibold text-red-500">
                                    Save {product.discountPercentage}%
                                </span>
                            </div>

                            <div className="flex items-center gap-3 pt-1">
                                <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-9 w-9 rounded-none"
                                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                                    >
                                        <Minus size={14} />
                                    </Button>
                                    <span className="px-4 text-sm font-semibold min-w-8 text-center">
                                        {qty}
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-9 w-9 rounded-none"
                                        onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                                    >
                                        <Plus size={14} />
                                    </Button>
                                </div>
                                <Button
                                    className="flex-1 gap-2 cursor-pointer"
                                    onClick={() =>
                                        toast.success(`${qty} item${qty > 1 ? "s" : ""} added to cart`)
                                    }
                                >
                                    <ShoppingCart size={16} />
                                    Add to Cart
                                </Button>
                            </div>

                            <div className="flex items-center gap-2 flex-wrap">
                                <Tag size={13} className="text-neutral-400" />
                                {product.tags.map((t) => (
                                    <Badge key={t} variant="outline" className="capitalize text-neutral-500">
                                        #{t}
                                    </Badge>
                                ))}
                            </div>

                            <Separator />

                            <div className="flex flex-col gap-2">
                                {[
                                    { icon: <Truck size={14} />, text: product.shippingInformation },
                                    { icon: <RotateCcw size={14} />, text: product.returnPolicy },
                                    { icon: <Shield size={14} />, text: product.warrantyInformation },
                                    { icon: <Package size={14} />, text: `Min. order: ${product.minimumOrderQuantity} units` },
                                ].map(({ icon, text }, i) => (
                                    <div key={i} className="flex items-center gap-2 text-xs text-neutral-500">
                                        <span className="text-neutral-400">{icon}</span>
                                        {text}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </div>
                </Card>

                <div className="grid md:grid-cols-2 gap-5 mt-5">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Product Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <table className="w-full text-sm">
                                <tbody>
                                    {[
                                        ["SKU", product.sku],
                                        ["Brand", product.brand],
                                        ["Weight", `${product.weight}g`],
                                        ["Width", `${product.dimensions.width} cm`],
                                        ["Height", `${product.dimensions.height} cm`],
                                        ["Depth", `${product.dimensions.depth} cm`],
                                        ["Barcode", product.meta.barcode],
                                        ["Stock", `${product.stock} units`],
                                    ].map(([label, value], i, arr) => (
                                        <tr key={label} className={i !== arr.length - 1 ? "border-b border-neutral-100" : ""}>
                                            <td className="py-2 text-neutral-400 w-28">{label}</td>
                                            <td className="py-2 font-medium text-neutral-700">{value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="mt-5 flex items-center gap-3">
                                <Image
                                    src={product.meta.qrCode}
                                    alt="QR Code"
                                    width={56}
                                    height={56}
                                    className="rounded-lg border border-neutral-200"
                                />
                                <p className="text-xs text-neutral-400 leading-relaxed">
                                    Scan to view this product on any device
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base">Customer Reviews</CardTitle>
                                <div className="flex items-center gap-1.5 text-neutral-500">
                                    <BarChart2 size={14} />
                                    <span className="text-sm font-semibold">{avgRating.toFixed(1)} avg</span>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-3">
                            {product.reviews.map((review, i) => (
                                <Card key={i} className="shadow-none bg-neutral-50 gap-2">
                                    <CardContent className="p-3.5">
                                        <div className="flex items-start justify-between gap-2 mb-1.5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold uppercase">
                                                    {review.reviewerName[0]}
                                                </div>
                                                <span className="text-sm font-semibold text-neutral-700">
                                                    {review.reviewerName}
                                                </span>
                                            </div>
                                            <StarRow rating={review.rating} size={12} />
                                        </div>
                                        <p className="text-xs text-neutral-500 ml-9">{review.comment}</p>
                                        <p className="text-xs text-neutral-300 mt-1 ml-9">
                                            {new Date(review.date).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
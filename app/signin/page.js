"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { LockIcon, MailIcon, ShoppingCartIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import Link from "next/link";

const SigninSchema = z.object({
    email: z.string().min(1,"Email is required").email("Invalid email address"),
    pass: z.string().min(1,"Password is required").min(8, "Password must be at least 8 characters"),
});

export default function SigninPage() {
    const [formData, setFormData] = useState({
        email: "",
        pass: ""
    });
    const [submitted, setSubmitted] = useState(false);
    const [check, setCheck] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setCheck(true);

        const result = SigninSchema.safeParse(formData)

        if (!result.success) {
            const errors = result.error.format();
            const firstError =
                errors.email?._errors[0] ||
                errors.pass?._errors[0];
            toast.error(firstError);
            return;
        }

        setSubmitted(true);
        setCheck(false);
        setFormData({ email: "", pass: "" });
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-blue-100">
            <Card className="w-full max-w-md shadow-2xl p-8">
                <CardHeader>
                    <CardTitle className="flex items-center justify-center gap-2 font-bold text-3xl text-blue-600 mb-3">
                        <ShoppingCartIcon />
                        Shopify
                    </CardTitle>
                    <CardTitle className="text-center font-bold text-3xl">Welcome back</CardTitle>
                    <p className="text-center  text-neutral-600 mb-3">Sign in to continue shopping</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <Label className={"font-bold mb-2"}>Email Address</Label>
                        <InputGroup
                            className="focus-within:!border-blue-400 focus-within:!ring-blue-400"
                            data-invalid={check && !formData.email}
                        >
                            <InputGroupInput
                                id="email"
                                type="email"
                                placeholder="Youssef@example.com"
                                value={formData.email}
                                onChange={(e) => {
                                    setFormData({ ...formData, email: e.target.value });
                                }}
                                aria-invalid={check && !formData.email}
                            />
                            <InputGroupAddon>
                                <MailIcon className="text-blue-600" />
                            </InputGroupAddon>
                        </InputGroup>

                        <Label htmlFor="pass" className={"font-bold my-5 mb-2"}>Password</Label>
                        <InputGroup
                            className="focus-within:!border-blue-400 focus-within:!ring-blue-400"
                            data-invalid={check && !formData.pass}
                        >
                            <InputGroupInput
                                id="pass"
                                type="password"
                                placeholder="********"
                                value={formData.pass}
                                onChange={(e) => {
                                    setFormData({ ...formData, pass: e.target.value });
                                }}
                                minLength={8}
                                aria-invalid={check && !formData.pass}
                            />
                            <InputGroupAddon>
                                <LockIcon className="text-blue-600" />
                            </InputGroupAddon>
                        </InputGroup>

                        <div className="flex justify-center mt-5">
                            <Button
                                type="submit"
                                disabled={submitted}
                                className="text-2xl bg-blue-600 hover:bg-blue-800 cursor-pointer w-75 py-5 px-7"
                            >
                                Sign in
                            </Button>
                        </div>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-100"></div>
                        </div>
                        <div className="relative text-center">
                            <span className="bg-white px-3 text-xs text-gray-400">or</span>
                        </div>
                    </div>

                    <p className="text-center text-sm text-gray-500">
                        Don&apos;t have an account? {" "}
                        <Link href={"/signup"} className="text-blue-600 font-bold hover:underline">
                            Create one
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
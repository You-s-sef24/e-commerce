"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { z } from "zod";
import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";

const SignupSchema = z.object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    address: z.string().min(1, "Address Name is required"),
    email: z.string().min(1, "Email is required").email(),
    birthdate: z.string().min(1, "Birthdate is required"),
    phone: z.string().min(1, "Phone number is required").length(11, "Invalid phone number").startsWith("01", "Phone number must start with 01"),
    pass: z.string().min(1, "Password is required").min(8, "Password Must be at least 8 characters"),
    confPass: z.string().min(1, "Password is required").min(8, "Password Must be at least 8 characters"),
    terms: z.literal(true),
}).refine((data) => data.pass === data.confPass, {
    message: "Passwords don't match",
    path: ["confPass"],
})

export default function SignupPage() {
    const [formData, setFormData] = useState({
        firstName: "", lastName: "", email: "",
        address: "", birthdate: "", phone: "", pass: "", confPass: "", terms: false
    });
    const [check, setCheck] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    function update(field) {
        return (e) => setFormData({ ...formData, [field]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setCheck(true);

        const result = SignupSchema.safeParse(formData)
        if (!result.success) {
            const firstError = result.error.issues[0]?.message || "Please fix the errors";
            toast.error(firstError);
            return;
        }

        setSubmitted(true);
        toast.success("Account created Successfully!");
        setCheck(false);
        setFormData({ firstName: "", lastName: "", email: "", address: "", birthdate: "", phone: "", pass: "", confPass: "", terms: false });
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-blue-100">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader>
                    <CardTitle className="flex items-center justify-center gap-2 font-bold text-3xl text-blue-600 mb-3">
                        <ShoppingCartIcon />
                        Shopify
                    </CardTitle>
                    <CardTitle className="text-center font-bold text-3xl">Create your account</CardTitle>
                    <p className="text-center  text-neutral-600 mb-3">Join millions of happy shoppers</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                        <div className="flex gap-3">
                            <Field className="flex flex-col gap-1 flex-1" data-invalid={check && !formData.firstName}>
                                <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                                <Input
                                    className="focus:!border-blue-400 focus:!ring-blue-400"
                                    id="firstName"
                                    placeholder="Youssef"
                                    value={formData.firstName}
                                    onChange={update("firstName")}
                                    aria-invalid={check && !formData.firstName}
                                />
                            </Field>
                            <Field className="flex flex-col gap-1 flex-1" data-invalid={check && !formData.lastName}>
                                <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                                <Input
                                    className="focus:!border-blue-400 focus:!ring-blue-400"
                                    id="lastName"
                                    placeholder="Mahmoud"
                                    value={formData.lastName}
                                    onChange={update("lastName")}
                                    aria-invalid={check && !formData.lastName}
                                />
                            </Field>
                        </div>

                        <div className="flex gap-3">
                            <Field className="flex flex-col gap-1 flex-1" data-invalid={check && !formData.phone}>
                                <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                                <Input
                                    className="focus:!border-blue-400 focus:!ring-blue-400"
                                    id="phone"
                                    type="tel"
                                    placeholder="01115658096"
                                    value={formData.phone}
                                    onChange={update("phone")}
                                    minLength={11}
                                    aria-invalid={check && !formData.phone}
                                />
                            </Field>
                            <Field className="flex flex-col gap-1 flex-1" data-invalid={check && !formData.birthdate}>
                                <FieldLabel htmlFor="birthdate">Birthdate</FieldLabel>
                                <Input
                                    className="focus:!border-blue-400 focus:!ring-blue-400"
                                    id="birthdate"
                                    type="date"
                                    value={formData.birthdate}
                                    onChange={update("birthdate")}
                                    aria-invalid={check && !formData.birthdate}
                                />
                            </Field>
                        </div>

                        <Field className="flex flex-col gap-1" data-invalid={check && !formData.email}>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                className="focus:!border-blue-400 focus:!ring-blue-400"
                                id="email"
                                type="email"
                                placeholder="youssef@company.com"
                                value={formData.email}
                                onChange={update("email")}
                                aria-invalid={check && !formData.email}
                            />
                        </Field>

                        <div className="flex gap-3">
                            <Field className="flex flex-col gap-1 flex-1" data-invalid={check && !formData.pass}>
                                <FieldLabel htmlFor="pass">Password</FieldLabel>
                                <Input
                                    className="focus:!border-blue-400 focus:!ring-blue-400"
                                    id="pass"
                                    type={"password"}
                                    onChange={update("pass")}
                                    placeholder="********"
                                    minLength={8}
                                    aria-invalid={check && !formData.pass}
                                />
                            </Field>

                            <div className="flex flex-col gap-1 flex-1">
                                <Field className="flex flex-col gap-1 flex-1" data-invalid={check && !formData.confPass}>
                                    <FieldLabel htmlFor="confPass">Confirm Password</FieldLabel>
                                    <Input
                                        className="focus:!border-blue-400 focus:!ring-blue-400"
                                        id="confPass"
                                        type={"password"}
                                        onChange={update("confPass")}
                                        placeholder="********"
                                        minLength={8}
                                        aria-invalid={check && !formData.confPass}
                                    />
                                </Field>
                            </div>
                        </div>

                        <Field className="flex flex-col gap-1" data-invalid={check && !formData.address}>
                            <FieldLabel htmlFor="address">Address</FieldLabel>
                            <Input
                                className="focus:!border-blue-400 focus:!ring-blue-400"
                                id="address"
                                placeholder="El Haram - Giza"
                                value={formData.address}
                                onChange={update("address")}
                                aria-invalid={check && !formData.address}
                            />
                        </Field>

                        <Field className="flex items-center gap-2" orientation="horizontal" data-invalid={check && !formData.terms}>
                            <Checkbox
                                id="terms"
                                checked={formData.terms}
                                onCheckedChange={(checked) => setFormData({ ...formData, terms: checked })}
                                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                aria-invalid={check && !formData.terms}
                            />
                            <FieldLabel htmlFor="terms" className="cursor-pointer">
                                <span className="text-sm text-gray-500 leading-relaxed">
                                    I agree to the{" "}
                                    <Link href={"/terms"} className="text-blue-600 font-semibold hover:underline">
                                        Terms of Service
                                    </Link>
                                    {" "}and{" "}
                                    <Link href={"/privacy"} className="text-blue-600 font-semibold hover:underline">
                                        Privacy Policy
                                    </Link>
                                </span>
                            </FieldLabel>
                        </Field>

                        <Button
                            type="submit"
                            disabled={submitted}
                            className="bg-blue-600 hover:bg-blue-800 mt-2"
                        >
                            Create Account
                        </Button>

                    </form>

                    <p class="text-center text-sm text-gray-500 mt-6">
                        Already have an account?{" "}
                        <Link href={"/signin"} class="text-blue-600 font-bold hover:underline">Sign In</Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
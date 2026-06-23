"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

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

        const isEmpty = Object.values(formData).some((v) => v === "");
        if (isEmpty) {
            toast.error("Please fill empty fields");
            return;
        }

        if (!formData.terms) {
            toast.error("Please accept the terms");
            return;
        }

        if (formData.phone.length < 11 || !formData.phone.startsWith("01")) {
            toast.error("Invalid phone number");
            return;
        }
        if (formData.pass.length < 8) {
            toast.error("Password too short");
            return;
        }
        if (formData.pass !== formData.confPass) {
            toast.error("Passwords doesn't match");
            return;
        }
        setSubmitted(true);
        toast.success("Account created Successfully!");
        setCheck(false);
        setFormData({ firstName: "", lastName: "", email: "", address: "", birthdate: "", phone: "", pass: "", confPass: "", terms: false });
    }

    return (
        <div className="flex justify-center items-center mt-18">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl text-blue-600">Create Account</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                        <div className="flex gap-3">
                            <Field className="flex flex-col gap-1 flex-1" data-invalid={check && !formData.firstName}>
                                <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                                <Input
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
                                Accept terms and cookies
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
                </CardContent>
            </Card>
        </div>
    );
}
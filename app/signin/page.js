"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { toast } from "sonner";

export default function SignupPage() {
    const [formData, setFormData] = useState({
        email: "",
        pass: ""
    });
    const [submitted, setSubmitted] = useState(false);
    const [check, setCheck] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setCheck(true);

        const isEmpty = Object.values(formData).some((v) => v === "");
        if (isEmpty) {
            toast.error("Please fill empty fields");
            setCheck(true);
            return;
        }

        if (formData.pass.length < 8) {
            toast.error("Password too short");
            setCheck(true);
            return;
        }

        setSubmitted(true);
        setCheck(false);
        setFormData({ email: "", pass: "" });
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl text-blue-600">Sign in</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                        <Field className="flex flex-col gap-1" data-invalid={check && !formData.email}>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email"
                                type="email"
                                placeholder="youssef@company.com"
                                value={formData.email}
                                onChange={(e) => {
                                    setFormData({ ...formData, email: e.target.value });
                                }}
                                aria-invalid={check && !formData.email}
                            />
                        </Field>

                        <Field className="flex flex-col gap-1 flex-1" data-invalid={check && !formData.pass}>
                            <FieldLabel htmlFor="pass">Password</FieldLabel>
                            <Input
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
                        </Field>

                        <Button
                            type="submit"
                            disabled={submitted}
                            className="bg-blue-600 hover:bg-blue-800 mt-2"
                        >
                            Sign in
                        </Button>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
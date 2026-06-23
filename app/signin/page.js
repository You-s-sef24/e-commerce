"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { toast } from "sonner";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { KeyIcon, LockIcon, MailIcon } from "lucide-react";
import { Label } from "@/components/ui/label";

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
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <Label className={"mb-2"}>Email</Label>
                        <InputGroup data-invalid={check && !formData.email}>
                            <InputGroupInput
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={(e) => {
                                    setFormData({ ...formData, email: e.target.value });
                                }}
                                aria-invalid={check && !formData.email}
                            />
                            <InputGroupAddon>
                                <MailIcon />
                            </InputGroupAddon>
                        </InputGroup>

                        <Label htmlFor="pass" className={"my-5 mb-2"}>Password</Label>
                        <InputGroup data-invalid={check && !formData.pass}>
                            <InputGroupInput
                                id="pass"
                                type="password"
                                placeholder="Enter your password"
                                value={formData.pass}
                                onChange={(e) => {
                                    setFormData({ ...formData, pass: e.target.value });
                                }}
                                minLength={8}
                                aria-invalid={check && !formData.pass}
                            />
                            <InputGroupAddon>
                                <LockIcon />
                            </InputGroupAddon>
                        </InputGroup>

                        <Button
                            type="submit"
                            disabled={submitted}
                            className="bg-blue-600 hover:bg-blue-800 mt-2 cursor-pointer"
                        >
                            Sign in
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
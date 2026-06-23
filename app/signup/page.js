"use client";

import { useState } from "react";

export default function SignupPage() {
    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", address: "", birthdate: "", phone: "" });
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        if (formData.firstName === "" || formData.lastName === "" || formData.email === "" || formData.phone === "" || formData.address === "" || formData.birthdate === "") {
            alert("Please complete empty fields");
            return;
        }
        if (formData.phone.length < 11 || formData.phone.startsWith("01")) {
            alert("Invalid phone number");
            return;
        }
        setSubmitted(true);
        setFormData({ firstName: "", lastName: "", email: "", address: "", birthdate: "", phone: "" });
    }

    return (
        <div className="flex justify-center items-center mt-18">
            <form
                className="flex flex-col bg-white rounded-lg shadow-lg p-8 gap-4 mt-6"
                onSubmit={handleSubmit}
            >
                <div className="flex items-center gap-2">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <input
                            id="firstName"
                            type="text"
                            className="border border-gray-200 outline-none rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-100 p-3 placeholder:text-gray-300 transition-all duration-200"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            placeholder="Youssef"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            type="text"
                            className="border border-gray-200 outline-none rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-100 p-3 placeholder:text-gray-300 transition-all duration-200"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            placeholder="Mahmoud"
                            required
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                            Phone number
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            className="border border-gray-200 outline-none rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-100 p-3 placeholder:text-gray-300 transition-all duration-200"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="01115658096"
                            required
                        />
                    </div>
                    <div className="flex flex-col w-55 gap-1">
                        <label htmlFor="birthdate" className="text-sm font-medium text-gray-700">
                            Birthdate
                        </label>
                        <input
                            type="date"
                            id="birthdate"
                            className="border border-gray-200 outline-none rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-100 p-3 placeholder:text-gray-300 transition-all duration-200"
                            value={formData.birthdate}
                            onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="border border-gray-200 outline-none rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-100 p-3 placeholder:text-gray-300 transition-all duration-200"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="Youssef@company.com"
                        required
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="address" className="text-sm font-medium text-gray-700">
                        Address
                    </label>
                    <input
                        id="address"
                        className="border border-gray-200 outline-none rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-100 p-3 placeholder:text-gray-300 transition-all duration-200"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="El Haram - Giza"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="flex items-center gap-2 bg-blue-600 text-white rounded-lg justify-center hover:bg-blue-800 cursor-pointer p-4 transition-all duration-300 font-medium"
                    disabled={submitted}
                >
                    Create Account
                </button>
            </form>
        </div>
    );
}
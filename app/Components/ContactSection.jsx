"use client";

import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", msg: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", msg: "" });
  }

  return (
    <div
      id="contact"
      className="flex flex-col items-center bg-gray-100 py-12 px-4 gap-4 scroll-mt-16"
    >
      <p className="text-purple-600">Contact Us</p>
      <h3 className="text-3xl font-bold text-black text-center">
        Let&apos;s start a conversation
      </h3>
      <p className="text-gray-600 text-center max-w-lg">
        Whether you have a question, want a demo, or just want to say hello —
        we&apos;d love to hear from you.
      </p>

      {submitted && (
        <p className="text-green-600 bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-sm">
          Message sent! We&apos;ll get back to you soon.
        </p>
      )}

      <form
        className="flex flex-col bg-white rounded-lg shadow p-8 gap-4 w-full max-w-md mt-6"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="border border-gray-200 outline-none rounded-lg focus:border-purple-600 focus:ring-2 focus:ring-purple-100 p-3 placeholder:text-gray-300 transition-all duration-200"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Nada"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Work email
          </label>
          <input
            id="email"
            type="email"
            className="border border-gray-200 outline-none rounded-lg focus:border-purple-600 focus:ring-2 focus:ring-purple-100 p-3 placeholder:text-gray-300 transition-all duration-200"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Nada@company.com"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="msg" className="text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="msg"
            className="border border-gray-200 outline-none rounded-lg focus:border-purple-600 focus:ring-2 focus:ring-purple-100 p-3 placeholder:text-gray-300 resize-none min-h-32 transition-all duration-200"
            value={formData.msg}
            onChange={(e) => setFormData({ ...formData, msg: e.target.value })}
            placeholder="Tell us what you're working on..."
            required
          />
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 bg-purple-600 text-white rounded-lg justify-center hover:bg-purple-800 cursor-pointer p-4 transition-all duration-300 font-medium"
        >
          Send Message
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </button>
      </form>
    </div>
  );
}

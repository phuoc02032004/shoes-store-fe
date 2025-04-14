"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {  Pacifico } from "next/font/google";

const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });

export default function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign in logic here
  };

  return (
    <div className="w-full max-w-[450px] mx-auto px-6 pt-16 pb-8">
      {/* Logo */}
      <div className="flex items-center justify-center gap-1 mb-8">
        <span className={`${pacifico.className} text-[20px] text-[#1F3E97]`}>vantela</span>
        <Image src="/icons/circle-r.svg" alt="R" width={16} height={16} className="mt-1" />
      </div>

      {/* Header */}
      <div>
        <h1 className="text-[32px] font-medium text-[#464646] text-center mb-3">Sign In</h1>
        <div className="w-full border-t border-[#D9D9D9]" />
      </div>

      {/* Sign In Form */}
      <form onSubmit={handleSubmit} className="mt-10 space-y-6">
        <div className="space-y-5">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-[#1F3E97] mb-2">
              Username or Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="appearance-none rounded-lg relative block w-full px-4 py-4 bg-[#F1F1F1] text-[#858585] placeholder-[#858585] focus:outline-none focus:ring-1 focus:ring-[#1F3E97] focus:border-[#1F3E97] text-sm"
              placeholder="Inimail@mail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-[#1F3E97] mb-2">
              Password *
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="appearance-none rounded-lg relative block w-full px-4 py-4 bg-[#F1F1F1] text-[#858585] placeholder-[#858585] focus:outline-none focus:ring-1 focus:ring-[#1F3E97] focus:border-[#1F3E97] text-sm"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
        </div>

        {/* Forgot Password Link */}
        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-xs font-semibold text-[#1F3E97] hover:text-[#1F3E97]/80">
            Forgot Password ?
          </Link>
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          className="w-full bg-[#1F3E97] text-white text-xl font-semibold py-4 rounded-lg hover:bg-[#1F3E97]/90 transition-colors"
        >
          Sign In
        </button>

        {/* Social Login Section */}
        <div className="space-y-4"> {/* Removed mt-8 as space-y-6 on form handles it */}
          {/* "Or" Separator */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-[#D9D9D9]" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-xs font-semibold text-black">Or</span> {/* Use bg-white from parent if needed, or specify page background */}
            </div>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 px-6 py-[14px] border border-[#1F3E97] rounded-full hover:bg-gray-50 transition-colors"
          >
            <Image src="/icons/google.svg" alt="Google" width={24} height={24} className="shrink-0" />
            <span className="text-[15px] font-semibold text-[#1F3E97]">Sign In with Google</span>
          </button>

          {/* Facebook Sign In */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 px-6 py-[14px] border border-[#1F3E97] rounded-full hover:bg-gray-50 transition-colors"
          >
            <Image src="/icons/facebook.svg" alt="Facebook" width={24} height={24} className="shrink-0" />
            <span className="text-[15px] font-semibold text-[#1F3E97]">Sign In with Facebook</span>
          </button>

          {/* Phone Sign In */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 px-6 py-[14px] border border-[#1F3E97] rounded-full hover:bg-gray-50 transition-colors"
          >
            <Image src="/icons/phone.svg" alt="Phone" width={24} height={24} className="shrink-0" />
            <span className="text-[15px] font-semibold text-[#1F3E97]">Sign In with Number</span>
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center"> {/* Removed mt-6 as space-y-6 on form handles it */}
          <p className="text-xs font-semibold text-[#000000]">
            Don&apos;t have an account yet?{' '}
            <Link href="/signup" className="text-[#1F3E97] hover:text-[#1F3E97]/80">
              Sign Up
            </Link>
          </p>
        </div>
      </form> {/* Correctly closed form */}

    </div> /* Correctly closed main container div */
  );
}
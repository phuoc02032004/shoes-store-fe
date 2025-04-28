"use client";

import Image from "next/image";
import SignInForm from "@/components/form/SignInForm";

export default function Signin() {

  return (
    <div className="container mt-8 flex-col items-center justify-center">
      <h2 className="text-3xl font-medium mb-10 text-[#464646] self-start">Sign In </h2>
      <hr className="w-full border-t border-[#D9D9D9] mb-10" />
      
      <div className="flex justify-between w-full">

      <div className="lg:w-1/2 flex justify-center">
        <SignInForm />
      </div>


      <div className="hidden lg:flex lg:w-1/2 relative h-auto bg-[#F4F4F4] ml-10">
              <Image
                src="/images/auth/signin/signin-bg.jpg"
                alt="Fast shipping"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(57,57,57,0.4)] to-transparent" />
      
              <div className="relative w-full flex flex-col items-center justify-center px-8">
                {/* Title with text shadow */}
                <h2 className="text-[36.91px] font-extrabold text-white text-center leading-[1.21] drop-shadow-[0_2px_8px_rgba(62,62,62,0.25)]">
                  Fast shipping
                  <br />
                  best for you
                </h2>
              </div>
      
              {/* Light gradient overlay at top */}
              <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent opacity-20" />
            </div>
      </div>
    </div>
  );
}

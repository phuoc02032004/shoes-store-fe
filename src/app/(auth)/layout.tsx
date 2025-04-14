import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="w-full bg-white lg:w-1/2 flex flex-col items-center">
        {children}
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#F4F4F4]">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/auth/signin-bg.jpg)' }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(57,57,57,0.4)] to-transparent" />
        </div>
        
        <div className="relative w-full flex flex-col items-center justify-center px-8">
          {/* Title with text shadow */}
          <h2 className="text-[36.91px] font-extrabold text-white text-center leading-[1.21] drop-shadow-[0_2px_8px_rgba(62,62,62,0.25)]">
            Fast shipping
            <br /> 
            best for you
          </h2>

          {/* Dots */}
          <div className="flex gap-2 mt-6">
            <div className="w-2 h-2 rounded-full bg-[#D9D9D9] opacity-60" />
            <div className="w-2 h-2 rounded-full border-[0.5px] border-[#D9D9D9]" />
            <div className="w-2 h-2 rounded-full bg-[#D9D9D9] opacity-60" />
          </div>
        </div>

        {/* Light gradient overlay at top */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent opacity-20" />
      </div>
    </div>
  );
}

import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Background New Arrival text - Hidden on mobile */}
      <div className="hidden md:block absolute inset-0 z-0 opacity-[0.07]">
        <div className="grid grid-cols-2 h-full">
          <div className="flex flex-col justify-between py-10">
            {Array(3).fill('New Arrival').map((text, index) => (
              <div
                key={`left-${index}`}
                className="text-[80px] lg:text-[120px] xl:text-[225.79px] font-semibold text-[#C2C2C2] whitespace-nowrap transform -rotate-12 -translate-x-20"
                style={{ fontFamily: 'Inter' }}
              >
                {text}
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-between py-10">
            {Array(3).fill('New Arrival').map((text, index) => (
              <div
                key={`right-${index}`}
                className="text-[80px] lg:text-[120px] xl:text-[225.79px] font-semibold text-[#C2C2C2] whitespace-nowrap transform -rotate-12 -translate-x-20"
                style={{ fontFamily: 'Inter' }}
              >
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 h-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-0 h-full items-center">
          {/* Content */}
          <div className="space-y-4 sm:space-y-6 text-center lg:text-left mt-16 lg:mt-0">
            {/* Brand Name */}
            <h2 className="font-pacifico text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-[#1F3E97] leading-normal">
              vantela
            </h2>

            {/* Product Name */}
            <h1 className="font-inter text-xl sm:text-2xl md:text-[28px] xl:text-[32px] font-bold text-[#FFB800] leading-tight">
              PUBLIC HIGH GUM NATURAL
            </h1>

            {/* Description */}
            <p className="text-[#464646] text-sm sm:text-base max-w-[460px] leading-relaxed mx-auto lg:mx-0">
              It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
            </p>

            {/* CTA Button */}
            <Button
              className="bg-[#1F3E97] text-white hover:bg-[#1F3E97]/90 rounded-full px-6 sm:px-8 py-2 sm:py-2.5 text-sm sm:text-base font-medium"
            >
              Shop Now
            </Button>
          </div>

          {/* Image */}
          <div className="relative h-[300px] sm:h-[400px] lg:h-full flex items-center justify-center">
            <div className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] -mr-0 lg:-mr-20">
              <Image
                src="/images/hero/hero-shoe.png"
                alt="Featured Shoe"
                fill
                className="object-contain scale-100 sm:scale-110 lg:scale-125"
                priority
              />
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 sm:bottom-8 lg:bottom-16 flex gap-2 sm:gap-3">
              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#D9D9D9]" />
              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#FFB800]" />
              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#D9D9D9]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
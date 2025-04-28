'use client';

import React, { useState, useEffect, useRef } from 'react'; 
import Image from 'next/image';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react'; 

const images = [
  '/images/hero/hero-shoe.png',
  '/images/hero/hero-shoe.png',
  '/images/hero/hero-shoe.png',
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); 

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout(); 
    timeoutRef.current = setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      4000
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex]); 

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };


  return (
    <section className="relative min-h-screen bg-white overflow-hidden mt-10">
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
            {/* Image Container */}
            <div className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] -mr-0 lg:-mr-20">
              {/* Images stacked using absolute positioning */}
              {images.map((src, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <Image
                    src={src}
                    alt={`Featured Shoe ${index + 1}`}
                    fill
                    className="object-contain scale-100 sm:scale-110 lg:scale-125"
                    priority={index === 0}
                  />
                </div>
              ))}

              {/* Prev Button */}
              <button
                onClick={goToPrevious}
                className="absolute top-1/2 left-0 sm:-left-8 lg:-left-12 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-1 sm:p-2 rounded-full transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={goToNext}
                className="absolute top-1/2 right-0 sm:-right-8 lg:-right-12 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-1 sm:p-2 rounded-full transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>

              {/* Navigation Dots */}
              <div className="absolute bottom-4 sm:bottom-8 lg:bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3 z-20">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full cursor-pointer transition-colors duration-300 ${
                      currentIndex === index ? 'bg-[#FFB800]' : 'bg-[#D9D9D9] hover:bg-[#FFB800]/50'
                    }`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
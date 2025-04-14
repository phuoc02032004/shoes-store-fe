import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="relative bg-[#FAFAFA] h-[90vh] overflow-hidden">
      <div className="container mx-auto px-4 h-full">
        <div className="grid grid-cols-2 h-full items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              {/* New Arrival Tags */}
              <div className="flex gap-4 flex-wrap">
                {Array(6).fill('New Arrival').map((text, i) => (
                  <span key={i} className="text-gray-300 text-xl font-semibold">
                    {text}
                  </span>
                ))}
              </div>
              
              {/* Brand Name */}
              <h2 className="font-pacifico text-primary text-7xl">vantela</h2>
              
              {/* Product Title */}
              <h1 className="text-4xl font-bold">
                PUBLIC HIGH GUM NATURAL
              </h1>
              
              {/* Description */}
              <p className="text-gray-600 max-w-lg">
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
              </p>
            </div>

            {/* Shop Now Button */}
            <button className="px-8 py-4 bg-primary text-white font-semibold rounded-full">
              Shop Now
            </button>
          </div>

          {/* Right Content - Product Image */}
          <div className="relative h-full">
            <Image
              src="/images/hero-shoe.png"
              alt="Featured Shoe"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Slider Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          <div className="w-2 h-2 rounded-full bg-gray-800" />
          <div className="w-2 h-2 rounded-full bg-gray-300 border border-gray-800" />
          <div className="w-2 h-2 rounded-full bg-gray-800" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
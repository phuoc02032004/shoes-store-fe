import Image from 'next/image';
import ProductCard from '../ui/ProductCard';

const PopularProducts = () => {
  const products = [
    {
      image: '/images/products/popular-1.jpg',
      name: 'Vantela Republic Low Black Natural',
      price: 'Rp 159.000',
    },
    {
      image: '/images/products/popular-2.jpg',
      name: 'Vantela New Public White Low',
      price: 'Rp 299.990',
      rating: '4.5/5',
      showShopNow: true,
    },
    {
      image: '/images/products/popular-3.jpg',
      name: 'Vantela Public Low Black Natural',
      price: 'Rp 205.000',
    },
    {
      image: '/images/products/popular-4.jpg',
      name: 'Vantela Evil X Papa Gading Black Natural',
      price: 'Rp 415.000',
    },
  ];

  return (
    <section className="py-8 md:py-12 lg:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="relative h-[70px] sm:h-[80px] md:h-[100px] mb-6 md:mb-8 lg:mb-12">
          {/* Background Circle */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[100px] sm:w-[120px] md:w-[184px] h-[100px] sm:h-[120px] md:h-[184px] bg-[#F4F4F4] rounded-full transition-all duration-300" />
          
          {/* Title */}
          <h2 className="absolute left-4 sm:left-6 md:left-10 top-1/2 -translate-y-1/2 text-lg sm:text-xl md:text-2xl font-medium text-primary">
            Most Popular
          </h2>

          {/* Navigation Arrows */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-2 md:gap-4">
            <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              <Image 
                src="/icons/arrow-left.svg"
                alt="Previous"
                width={20}
                height={20}
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary"
              />
            </button>
            <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              <Image 
                src="/icons/arrow-right.svg"
                alt="Next"
                width={20}
                height={20}
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary"
              />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {products.map((product, index) => (
            <div key={index} className="transform transition-transform hover:scale-[1.02] duration-300">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
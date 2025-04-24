import React from 'react';
import Link from 'next/link'; // Import Link
import ProductCard from '../ui/ProductCard';
import { ProductListProps } from '@/types/products';
import Image from 'next/image';

const ProductList = (props: ProductListProps): React.ReactNode => {
const { products } = props;
  return (
    <div className="w-full mb-4 mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {products.map((product, index) => (
            <Link key={index} href={`/sneakers/${product.id}`} className="transform transition-transform hover:scale-[1.02] duration-300 block"> {/* Wrap with Link */}
              <ProductCard
                image={product.image}
                name={product.name}
                price={product.price}
                rating={product.rating}
                discountedPrice={product.discountedPrice}
                showShopNow={true}
                />
            </Link> // Close Link
          ))}
        </div>

       <button className="bg-[#1F3E97] flex items-center text-white rounded-full p-4 mt-6 font-semibold shadow-2xl mx-auto">
          <div>See more</div>
          <Image 
            src="/icons/keyboard_arrow_down.svg"
            alt="Next"
            width={20}
            height={20}
            className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary ml-2'
          />
       </button>

    </div>
  );
};

export default ProductList;
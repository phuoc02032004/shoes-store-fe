'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '../ui/ProductCard';
import { ProductListProps, Product } from '@/types/products';
import Image from 'next/image';

const PRODUCTS_PER_PAGE = 8; 

const ProductList = (props: ProductListProps): React.ReactNode => {
  const { products } = props;
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    setDisplayedProducts(products.slice(0, PRODUCTS_PER_PAGE));
  }, [products]);

  const handleSeeMore = () => {
    setLoadingMore(true);
    // Simulate loading delay if needed, or directly update
    const nextProducts = products.slice(0, displayedProducts.length + PRODUCTS_PER_PAGE);
    setDisplayedProducts(nextProducts);
    setLoadingMore(false);
  };

  const hasMore = displayedProducts.length < products.length;
  const isExpanded = displayedProducts.length === products.length && products.length > PRODUCTS_PER_PAGE;

  const handleToggleView = () => {
    if (isExpanded) {
      setDisplayedProducts(products.slice(0, PRODUCTS_PER_PAGE));
    } else {
      handleSeeMore();
    }
  };

  return (
    <div className="w-full mb-4 mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        {displayedProducts.map((product, index) => (
          <Link key={index} href={`/sandals/${product.id}`} className="transform transition-transform hover:scale-[1.02] duration-300 block">
            <ProductCard
              image={product.image}
              name={product.name}
              price={product.price}
              discountedPrice={product.discountedPrice}
              showShopNow={true}
            />
          </Link>
        ))}
      </div>

      {(hasMore || isExpanded) && (
        <button
          onClick={handleToggleView}
          className="bg-[#1F3E97] flex items-center text-white rounded-full p-4 mt-6 font-semibold shadow-2xl mx-auto disabled:opacity-50"
          disabled={loadingMore}
        >
          <div>
            {loadingMore ? 'Loading...' : isExpanded ? 'Show less' : 'See more'}
          </div>
          {!loadingMore && (
            <Image
              src={isExpanded ? "/icons/keyboard_arrow_down.svg" : "/icons/keyboard_arrow_down.svg"} // Use appropriate icon for show less if available
              alt={isExpanded ? "Show less" : "See more"}
              width={20}
              height={20}
              className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary ml-2 ${isExpanded ? 'rotate-180' : ''}`}
            />
          )}
        </button>
      )}
    </div>
  );
};

export default ProductList;
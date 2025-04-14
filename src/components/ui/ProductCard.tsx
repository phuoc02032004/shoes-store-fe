import Image from 'next/image';
import { Star } from 'lucide-react';
import { Button } from './button';

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  discountedPrice?: string;
  discount?: string;
  rating?: string;
  showShopNow?: boolean;
}

const ProductCard = ({
  image,
  name,
  price,
  discountedPrice,
  discount,
  rating,
  showShopNow,
}: ProductCardProps) => {
  return (
    <div className="relative group">
      {/* Card Container */}
      <div className="border border-[#F4F4F4] rounded-[6px] p-2 sm:p-[12px]">
        {/* Image Container */}
        <div className="relative aspect-square mb-3 sm:mb-6">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover rounded-[3px]"
          />
          {discount && (
            <span className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-[#FFB800] text-black text-[10px] sm:text-[11px] font-semibold px-2 sm:px-[12px] py-1 sm:py-[6px] rounded-[25px]">
              {discount}
            </span>
          )}

          {/* Hover Content - Only shows on group hover */}
          <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-[18px] bg-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {/* Rating - Top */}
            {rating && (
              <div className="flex items-center gap-1 sm:gap-1.5">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-[#FFB800] text-[#FFB800]" />
                <span className="text-[10px] sm:text-[12px] font-medium text-black">{rating}</span>
              </div>
            )}

            {/* Shop Now Button - Bottom */}
            {showShopNow && (
              <Button
                className="w-fit mx-auto bg-primary text-white rounded-[30px] text-[10px] sm:text-[10.6px] px-2 sm:px-3 py-1 sm:py-1.5"
              >
                Shop Now
              </Button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2 sm:space-y-3 px-1 sm:px-[6px]">
          <h3 className="text-[14px] sm:text-[18px] font-semibold leading-[1.21] text-black line-clamp-2">
            {name}
          </h3>
          <div className="space-y-1 sm:space-y-1.5">
            {discountedPrice ? (
              <>
                <p className="text-[10px] sm:text-[12px] text-gray-500 line-through">{price}</p>
                <p className="text-[12px] sm:text-[15px] text-black">{discountedPrice}</p>
              </>
            ) : (
              <p className="text-[10px] sm:text-[12px] text-black">{price}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
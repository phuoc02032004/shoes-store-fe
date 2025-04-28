import Image from 'next/image';
import { Star } from 'lucide-react';
import { Button } from './button';

const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  discountedPrice?: number;
  rating?: number;
  showShopNow?: boolean;
}

const ProductCard = ({
  image,
  name,
  price,
  discountedPrice,
  rating,
  showShopNow = true,
}: ProductCardProps) => {

  const hasDiscount = typeof discountedPrice === 'number' && discountedPrice < price;
  const discountPercentage = hasDiscount
    ? Math.round(((price - discountedPrice!) / price) * 100)
    : 0;

  const displayPrice = hasDiscount ? formatPrice(discountedPrice!) : formatPrice(price);
  const originalPriceDisplay = hasDiscount ? formatPrice(price) : null;

  return (
    <div className="relative group border border-gray-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image || '/placeholder-image.png'}
          alt={name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {hasDiscount && discountPercentage > 0 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full z-10">
            -{discountPercentage}%
          </span>
        )}

        <div
          className="absolute inset-0 flex flex-col justify-between p-2 sm:p-3 bg-black/60 backdrop-blur-sm
                     opacity-0 transition-opacity duration-300
                     group-hover:opacity-100 group-focus-within:opacity-100"
        >
          {rating && rating > 0 ? (
            <div className="flex items-center gap-1 self-start bg-white/80 px-1.5 py-0.5 rounded-full">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-yellow-400 text-yellow-500" />
              <span className="text-[10px] sm:text-xs font-medium text-black">{rating.toFixed(1)}</span>
            </div>
          ) : (
            <div></div>
          )}

          {showShopNow && (
            <div className="flex justify-center">
              <Button
                variant="default"
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full text-[10px] sm:text-xs px-3 py-1 h-auto"
                tabIndex={-1}
              >
                Shop Now
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="p-2 sm:p-3 space-y-1 sm:space-y-1.5">
        <h3 className="text-sm sm:text-base font-semibold leading-tight text-gray-800 line-clamp-2" title={name}>
          {name}
        </h3>
        <div className="flex flex-col items-start">
          {originalPriceDisplay && (
            <p className="text-xs sm:text-sm text-gray-500 line-through">
              {originalPriceDisplay}
            </p>
          )}
          <p className={`text-sm sm:text-base font-bold ${hasDiscount ? 'text-red-600' : 'text-gray-900'}`}>
            {displayPrice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
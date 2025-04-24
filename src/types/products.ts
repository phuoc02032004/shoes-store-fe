export interface Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    category?: string;
    image: string;
    rating?: string;
    stock?: number;
    createdAt?: string;
    updatedAt?: string;
    isNew?: boolean;
    isPopular?: boolean;
    isOnSale?: boolean;
    discount?: number;
    brand?: string;
    color?: string;
    size?: string[];
    material?: string;
    showShopNow?: boolean;
    discountedPrice?: string;
}

export interface ProductListProps {
    products: Product[];
    title?: string;
    showSeeMore?: boolean;
    seeMoreLink?: string;
    className?: string;
    showShopNow?: boolean;
    showDiscount?: boolean;
    showRating?: boolean;
    showCategory?: boolean;
    showStock?: boolean;
    showDescription?: boolean;
    showBrand?: boolean;
    showColor?: boolean;
    showSize?: boolean;
    showMaterial?: boolean;
    showCreatedAt?: boolean;
    showUpdatedAt?: boolean;
    showIsNew?: boolean;
    showIsPopular?: boolean;
    showIsOnSale?: boolean;
    showDiscountedPrice?: boolean;
    showImage?: boolean;
    showName?: boolean;
    showPrice?: boolean;
}



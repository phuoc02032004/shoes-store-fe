import { Size } from "./sizes";

export interface Product {
    _id: string;
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    imagePublicId?: string;
    stock: number;
    isNew: boolean;
    isPopular: boolean;
    isOnSale: boolean;
    discount: number;
    brand: string;
    sizes: Size[];
    updatedAt: string;
    discountedPrice: number;
  }
  
  export interface Category {
    _id: string;
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    slug?: string;
  }
  
  export interface PaginationInfo {
    totalProducts: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  }
  
  export interface ProductApiResponse {
    success: boolean;
    count: number;
    pagination: PaginationInfo;
    data: Product[];
  }
  
  export interface ProductCardProps {
    image: string;
    name: string;
    price: number;
    discountedPrice?: number;
    showShopNow?: boolean;
    // Thêm các props khác nếu cần
    // isNew?: boolean;
    // isOnSale?: boolean;
  }
  
  
  export interface ProductListProps {
    products: Product[];
    title?: string;
    className?: string;
    onSeeMore?: () => void;
    hasMore?: boolean;
    isLoadingMore?: boolean;
    // showShopNow?: boolean; // Có thể dùng trong ProductCard
  }
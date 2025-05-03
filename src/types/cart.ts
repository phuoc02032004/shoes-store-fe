import { Product } from './products'; // Import the Product type

// Interface for a single item within the cart items array from the API
export interface CartItem {
    product: Product;   // The nested product object
    quantity: number;
    size: string;       // The selected size ID (string)
    // Note: The API item itself doesn't have a unique 'id' field in the example.
    // We might need to generate a key for React lists based on product.id and size.
}

// Interface for the 'data' object within the API response
export interface CartApiResponseData {
    _id: string;
    user: string;
    items: CartItem[]; // Use the updated CartItem interface
    createdAt: string;
    updatedAt: string;
    __v: number;
    totalQuantity: number;
    id: string;
}

// Interface for the full API response structure
export interface CartApiResponse {
    success: boolean;
    data: CartApiResponseData;
}

// Original Cart interface (might be used elsewhere, keeping for now)
// If not used, it could be removed or updated based on needs.
export interface Cart {
    id: number; // Consider if this type is still accurate or needed
    user: number;
    items: CartItem[]; // Uses the updated CartItem
    createdAt: string;
    updatedAt: string;
}
export interface Cart {
    id: number;
    user: number;
    items: CartItem[];
    createdAt: string;
    updatedAt: string;
}

export interface CartItem {
    id: number;
    product: number;
    quantity: number;
    size?: number;
    createdAt: string;
    updatedAt: string;
}
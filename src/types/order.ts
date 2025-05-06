export interface Order{
    _id: string;
    user: string;
    orderItems: OrderItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
    orderStatus: string;
    isPaid: boolean;
    isDelivered: boolean;
    notes: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface OrderItem{
    product: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    size: string;
    id: string;
    _id: string;
}

export interface ShippingAddress{
    fullName: string;
    address1: string;
    address2?: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
}

export interface CreateOrderPayload {
    shippingAddress: ShippingAddress;
    paymentMethod: string;
}
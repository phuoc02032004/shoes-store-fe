"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { CartItem,  } from "@/types/cart";
import { getCart, updateCartItem, removeItemFromCart } from "@/api/cart";
import Link from "next/link";
import ModalCheckout from "@/components/home/ModalCheckout";

const MinusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" /></svg>;
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>;
const DeleteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>;

const formatPrice = (amount?: number): string => {
    if (typeof amount !== 'number') return 'N/A';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
};

export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showCheckoutModal, setShowCheckoutModal] = useState(false); 

    const fetchCartData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getCart();
            if (response.data && response.data.success && response.data.data && Array.isArray(response.data.data.items)) {
                setCartItems(response.data.data.items);
            } else {
                console.warn("Unexpected cart API response structure:", response.data);
                setCartItems([]); 
            }
        } catch (err) {
            console.error("Failed to fetch cart:", err);
            setError("Could not load your cart. Please try again later.");
            setCartItems([]);
        } finally {
            setLoading(false);
        }
    }, []); 

    useEffect(() => {
        fetchCartData(); 
    }, [fetchCartData]); 

        const { totalItems, subtotal } = useMemo(() => {
        let itemsCount = 0;
        let currentSubtotal = 0;
        cartItems.forEach(item => {
            itemsCount += item.quantity;
            const priceToUse = item.product.discountedPrice ?? item.product.price; 
            currentSubtotal += priceToUse * item.quantity;
        });
        return { totalItems: itemsCount, subtotal: currentSubtotal };
    }, [cartItems]);

    const handleRemoveItem = async (productId: string, sizeId: string) => {
        console.log("Attempting to remove item:", productId, sizeId);
        const originalCartItems = [...cartItems];
        setCartItems(prevItems =>
            prevItems.filter(item => !(item.product.id === productId && item.size === sizeId))
        );

        try {
            const response = await removeItemFromCart(productId, sizeId);
            if (!response || !response.data || !response.data.success) {
                console.error("API failed to remove item:", response?.data);
                setError("Could not remove item. Please try again.");
                setCartItems(originalCartItems);
            }
            console.log("Item removed successfully");

        } catch (err) {
            console.error("Failed to remove item via API:", err);
            setError("Could not remove item due to a network error. Please try again.");
            setCartItems(originalCartItems);
        }
    };

    const handleUpdateQuantity = async (productId: string, sizeId: string, newQuantity: number) => {
        try {
            const response = await updateCartItem(sizeId, newQuantity, productId);
            if (!response || !response.data || !response.data.success) {
                console.error("API failed to update item:", response?.data);
                setError("Could not update item. Please try again.");
            } else {
                setCartItems(prevItems =>
                    prevItems.map(item =>
                        item.product.id === productId && item.size === sizeId
                            ? { ...item, quantity: newQuantity }
                            : item
                    )
                );
                alert("Item quantity updated successfully!");
            }
        } catch (err) {
            console.error("Failed to update item via API:", err);
        }
    };

    const handleCheckout = () => {
        setShowCheckoutModal(true); 
    }

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading your cart...</div>;
    }

    if (error) {
        return <div className="text-red-600 text-center py-10">{error}</div>;
    }

    return (
        <div className="bg-white mx-auto px-4 lg:px-16 py-8">
            <div className="container">
                <h1 className="text-3xl font-medium text-gray-700 mb-8">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Cart Items Section (Left/Main Column) */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Header (Select All - Functionality not implemented) */}
                        <div className="flex items-center justify-between p-4 bg-gray-100 rounded-md">
                            <div className="flex items-center space-x-3">
                                {/* <button className="w-5 h-5 border border-gray-400 rounded flex items-center justify-center bg-white">
                                    Checkbox logic needed
                                </button> */}
                                <span className="text-sm font-medium">Cart Items ({totalItems})</span>
                            </div>
                            {/* <button className="text-sm text-blue-600 hover:underline">Delete Selected</button> */}
                        </div>

                        {/* Cart Item List */}
                        {cartItems.length === 0 ? (
                            <div className="text-center p-8 border rounded-md">
                                <p className="text-gray-600 text-lg">Your cart is empty.</p>
                                <Link href="/" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
                                    Start Shopping
                                </Link>
                            </div>
                        ) : (
                            cartItems.map((item) => (
                                // Use product ID + size ID for a unique key
                                <div key={`${item.product.id}-${item.size}`} className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 border-b border-gray-200 pb-4">
                                    {/* Checkbox (Functionality not implemented) */}
                                    {/* <button className="w-5 h-5 border border-gray-400 rounded flex items-center justify-center bg-white self-start mt-2">
                                    </button> */}

                                    {/* Image */}
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                                        <Image
                                            src={item.product.image || '/placeholder.png'} // Use placeholder if no image
                                            alt={item.product.name || 'Product Image'}
                                            width={96}
                                            height={96}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-grow">
                                        <p className="text-base font-medium text-black mb-1">{item.product.name}</p>
                                        {/* Display Size - Assuming you might want this */}
                                        {/* <p className="text-sm text-gray-500 mb-1">Size: {item.size}</p> */}
                                        {item.product.discount > 0 && (
                                            <div className="inline-block bg-red-100 text-red-700 rounded-full px-2 py-0.5 text-xs font-medium mr-2">
                                                -{item.product.discount}%
                                            </div>
                                        )}
                                        {item.product.discountedPrice ? (
                                            <div className="flex items-center space-x-2 mb-1">
                                                <span className="text-gray-500 line-through text-sm">{formatPrice(item.product.price)}</span>
                                                <span className="text-blue-900 font-semibold">{formatPrice(item.product.discountedPrice)}</span>
                                            </div>
                                        ) : (
                                            <p className="text-blue-900 font-semibold mb-1">{formatPrice(item.product.price)}</p>
                                        )}

                                        {/* Actions: Note & Delete */}
                                        <div className="flex items-center text-xs text-gray-500 space-x-2 mt-2">
                                            {/* <button className="hover:text-blue-600">Add note ...</button>
                                            <span>|</span> */}
                                            <button
                                                className="hover:text-red-600 flex items-center text-red-500"
                                                onClick={() => handleRemoveItem(item.product.id, item.size)}
                                                title="Remove item"
                                            >
                                                <DeleteIcon /> <span className="ml-1">Remove</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Quantity Selector */}
                                    <div className="flex items-center border border-gray-300 rounded-full p-1 space-x-2 self-center mt-2 sm:mt-0">
                                        <button
                                            className="text-blue-600 hover:bg-gray-100 rounded-full p-1 disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={item.quantity <= 1}
                                            onClick={() => handleUpdateQuantity(item.product.id, item.size, item.quantity - 1)}
                                            title="Decrease quantity"
                                        >
                                            <MinusIcon />
                                        </button>
                                        <span className="text-sm text-black font-medium w-6 text-center tabular-nums">{item.quantity}</span>
                                        <button
                                            className="text-blue-600 hover:bg-gray-100 rounded-full p-1"
                                            onClick={() => handleUpdateQuantity(item.product.id, item.size, item.quantity + 1)}
                                            title="Increase quantity"
                                        >
                                            <PlusIcon />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Order Summary Section (Right Column) */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-4 lg:sticky lg:top-24"> {/* Added sticky */}
                            <h2 className="text-xl font-medium text-black">Order Summary</h2>

                            {/* Promo Code (UI only) */}
                            <div>
                                <label htmlFor="promo" className="block text-sm font-semibold text-blue-900 mb-1">Promo Code</label>
                                <div className="flex">
                                    <input
                                        type="text"
                                        id="promo"
                                        placeholder="Enter promo code..."
                                        className="flex-grow p-3 border border-r-0 border-gray-200 rounded-l-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                                    />
                                    <button className="bg-blue-900 text-white px-4 rounded-r-md text-sm font-semibold hover:bg-blue-800">Apply</button>
                                </div>
                            </div>

                            {/* Subtotal & Promo */}
                            <div className="space-y-1 border-b border-gray-200 pb-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                                    <span className="font-medium text-gray-800">{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Promo Discount</span>
                                    <span className="font-medium text-gray-800">- {formatPrice(0)}</span> {/* Placeholder */}
                                </div>
                            </div>

                            {/* Total */}
                            <div className="flex justify-between items-center pt-2">
                                <span className="text-base font-medium text-gray-800">Total :</span>
                                <span className="text-xl font-semibold text-blue-900">{formatPrice(subtotal)}</span> {/* Assuming total = subtotal for now */}
                            </div>

                            {/* Checkout Button */}
                            <button
                                className="w-full bg-blue-900 text-white rounded-lg py-3 text-base font-semibold hover:bg-blue-800 transition-colors disabled:opacity-50"
                                disabled={cartItems.length === 0}
                                onClick={handleCheckout}
                            >
                                Check out ({totalItems})
                            </button>

                            <ModalCheckout
                                show={showCheckoutModal}
                                onClose={() => setShowCheckoutModal(false)}
                                onCheckout={() => {
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
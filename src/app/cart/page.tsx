"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext"; // Import useCart hook

// Placeholder icons - replace with actual icons if available
const MinusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" /></svg>;
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>;
const DeleteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>;


export default function Cart() {
    const cart = useCart(); // Use cart context
    // const cartItems = cart.cartItems; // Get cart items from context - no longer needed to declare separately
    
    // Calculate totals based on cart context
    const subtotal = cart.cartItems.reduce((sum: number, item) => sum + (Number(item.discountedPrice ?? item.price) * Number(item.quantity)), 0);
    const totalItems = cart.itemCount; // Use itemCount from context
    const total = subtotal; // Add logic for promo codes later


    return (
        <div className="bg-white mx-auto px-4 lg:px-16 py-8">
            <div className="container">
            <h1 className="text-3xl font-medium text-gray-700 mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                {/* Cart Items Section (Left/Main Column) */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Select All Header */}
                    <div className="flex items-center justify-between p-4 bg-gray-100 rounded-md">
                        <div className="flex items-center space-x-3">
                            <button className="w-5 h-5 border border-gray-400 rounded flex items-center justify-center bg-white">
                                {/* <CheckIcon /> */} {/* Checkbox logic needed */}
                            </button>
                            <span className="text-sm font-medium">Select all ({cart.itemCount} items)</span> {/* Use cart.itemCount */}
                        </div>
                        <button className="text-sm text-blue-600 hover:underline">Delete</button>
                    </div>

                    {/* Cart Item List */}
                    {cart.cartItems.length === 0 ? ( // Show empty cart message
                        <div className="text-center p-8">
                            <p className="text-gray-600">Your cart is empty.</p>
                            <p className="mt-4">Start shopping now!</p>
                        </div>
                    ) : (
                        cart.cartItems.map((item) => (
                            <div key={item.id} className="flex items-center space-x-4 border-b border-gray-200 pb-4">
                                {/* Checkbox */}
                                <button className="w-5 h-5 border border-gray-400 rounded flex items-center justify-center bg-white self-start mt-2">
                                    {/* <CheckIcon /> */} {/* Checkbox logic needed */}
                                </button>

                                {/* Image */}
                                <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={96}
                                        height={96}
                                        className="object-cover w-full h-full"
                                    />
                                </div>

                                {/* Details */}
                                <div className="flex-grow">
                                    <p className="text-base font-medium text-black mb-1">{item.name}</p>
                                    {item.discount && (
                                        <div className="inline-block bg-yellow-500 text-black rounded-full px-2 py-0.5 text-xs font-medium mr-2">
                                            Disc {item.discount}%
                                        </div>
                                    )}
                                    {item.discountedPrice ? (
                                        <div className="flex items-center space-x-2 mb-1">
                                            <span className="text-gray-400 line-through text-sm">Rp {item.price.toLocaleString()}</span>
                                            <span className="text-blue-900 font-semibold">Rp {item.discountedPrice.toLocaleString()}</span>
                                        </div>
                                    ) : (
                                        <p className="text-blue-900 font-semibold mb-1">Rp {item.price.toLocaleString()}</p>
                                    )}

                                    {/* Actions: Note & Delete */}
                                    <div className="flex items-center text-xs text-gray-500 space-x-2">
                                        <button className="hover:text-blue-600">Add note ...</button>
                                        <span>|</span>
                                        <button 
                                            className="hover:text-red-600 flex items-center"
                                            onClick={() => cart.removeFromCart(item.id)} // Remove from cart logic
                                        >
                                            <DeleteIcon />
                                        </button>
                                    </div>
                                </div>

                                {/* Quantity Selector */}
                                <div className="flex items-center border border-gray-300 rounded-full p-1 space-x-2 self-start mt-2">
                                    <button 
                                        className="text-blue-600 hover:bg-gray-100 rounded-full p-1 disabled:opacity-50" 
                                        disabled={item.quantity <= 1}
                                        onClick={() => cart.updateQuantity(item.id, item.quantity - 1)} // Update quantity - decrease
                                    >
                                        <MinusIcon />
                                    </button>
                                    <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                                    <button 
                                        className="text-blue-600 hover:bg-gray-100 rounded-full p-1"
                                        onClick={() => cart.updateQuantity(item.id, item.quantity + 1)} // Update quantity - increase
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
                    <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
                        <h2 className="text-xl font-medium text-black">Order Summary</h2>

                        {/* Promo Code */}
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
                                <span className="font-medium text-gray-800">Rp {subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Promo</span>
                                <span className="font-medium text-gray-800">-</span> {/* Placeholder */}
                            </div>
                        </div>

                        {/* Total */}
                        <div className="flex justify-between items-center pt-2">
                            <span className="text-base font-medium text-gray-800">Total :</span>
                            <span className="text-xl font-semibold text-blue-900">Rp {total.toLocaleString()}</span>
                        </div>

                        {/* Checkout Button */}
                        <button className="w-full bg-blue-900 text-white rounded-lg py-3 text-base font-semibold hover:bg-blue-800 transition-colors">
                            Check out ({totalItems})
                        </button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}
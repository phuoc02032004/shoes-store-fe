"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Product } from '@/types/products'; // Assuming Product type is defined here

interface CartItem extends Product {
  quantity: number;
  selectedSize?: string; // Add selectedSize to CartItem
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, selectedSize?: string, quantity?: number) => void; // Add selectedSize parameter
  removeFromCart: (productId: string) => void; // Change productId type to string
  updateQuantity: (productId: string, quantity: number) => void; // Change productId type to string
  clearCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Load cart from localStorage on initial render (client-side only)
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  // Save cart to localStorage whenever it changes (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (product: Product, selectedSize?: string, quantity: number = 1) => {
    setCartItems(prevItems => {
      // Find existing item with the same product ID AND selected size
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id && item.selectedSize === selectedSize);

      if (existingItemIndex > -1) {
        // Increase quantity if item with same size already exists
        const newItems = [...prevItems];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity,
        };
        return newItems;
      } else {
        // Add new item to cart with selected size
        return [...prevItems, { ...product, quantity, selectedSize }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item // Ensure quantity is at least 1
      )
    );
     // Remove item if quantity becomes 0 or less (optional, handled by Math.max(1, quantity) above)
     // if (quantity <= 0) {
     //   removeFromCart(productId);
     // }
  };

   const clearCart = () => {
    setCartItems([]);
   };

  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);


  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
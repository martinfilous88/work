import React, { createContext, useContext, useState } from 'react';
import { CartItem } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (gameId: number) => void;
  removeFromCart: (gameId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (gameId: number) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.gameId === gameId);
      if (existing) {
        return prev.map(item =>
          item.gameId === gameId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { gameId, quantity: 1 }];
    });
  };

  const removeFromCart = (gameId: number) => {
    setCartItems(prev => prev.filter(item => item.gameId !== gameId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
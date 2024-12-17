import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { games } from '../data/games';
import { Trash2 } from 'lucide-react';
import { PaymentModal } from './PaymentModal';
import { useAuth } from '../context/AuthContext';

export function Cart() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'card' | 'bank' | 'paypal' | null>(null);
  
  const cartGames = cartItems.map(item => ({
    ...games.find(game => game.id === item.gameId)!,
    quantity: item.quantity
  }));

  const total = cartGames.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePaymentSuccess = () => {
    clearCart();
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Pro zobrazení košíku se musíte přihlásit</h2>
        <Link to="/login" className="text-blue-400 hover:text-blue-300">Přihlásit se</Link>
      </div>
    );
  }

  if (cartGames.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Váš košík je prázdný</h2>
        <p className="text-gray-300">Přidejte si do košíku nějaké hry z našeho obchodu.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-white mb-8">Košík</h2>
      <div className="bg-gray-800 rounded-lg p-6">
        {cartGames.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-4 border-b border-gray-700">
            <div className="flex items-center gap-4">
              <img src={item.imageUrl} alt={item.title} className="w-20 h-20 object-cover rounded" />
              <div>
                <h3 className="text-xl text-white">{item.title}</h3>
                <p className="text-gray-400">{item.price} Kč × {item.quantity}</p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-400 transition-colors"
            >
              <Trash2 size={24} />
            </button>
          </div>
        ))}
        
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl text-white">Celkem:</span>
            <span className="text-2xl font-bold text-white">{total} Kč</span>
          </div>
          
          <div className="space-y-4">
            <button 
              onClick={() => {
                setSelectedPaymentMethod('card');
                setIsPaymentModalOpen(true);
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Platba kartou
            </button>
            <button 
              onClick={() => {
                setSelectedPaymentMethod('paypal');
                setIsPaymentModalOpen(true);
              }}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              PayPal
            </button>
            <button 
              onClick={() => {
                setSelectedPaymentMethod('bank');
                setIsPaymentModalOpen(true);
              }}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Bankovní převod
            </button>
          </div>
        </div>
      </div>

      {selectedPaymentMethod && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          total={total}
          paymentMethod={selectedPaymentMethod}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}
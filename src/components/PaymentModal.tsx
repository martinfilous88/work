import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  paymentMethod: 'card' | 'bank' | 'paypal';
  onSuccess: () => void;
}

export function PaymentModal({ isOpen, onClose, total, paymentMethod, onSuccess }: PaymentModalProps) {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!isOpen) return null;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulace úspěšné platby
    setTimeout(() => {
      onSuccess();
      onClose();
      navigate('/library');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold text-white mb-6">
          {paymentMethod === 'card' && 'Platba kartou'}
          {paymentMethod === 'bank' && 'Bankovní převod'}
          {paymentMethod === 'paypal' && 'PayPal platba'}
        </h2>

        <form onSubmit={handlePayment} className="space-y-4">
          {paymentMethod === 'card' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Číslo karty
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Platnost
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2"
                    placeholder="MM/RR"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2"
                    placeholder="123"
                    required
                  />
                </div>
              </div>
            </>
          )}

          {paymentMethod === 'bank' && (
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-white mb-2">Bankovní údaje pro převod:</p>
              <p className="text-gray-300">Číslo účtu: 123456789/0100</p>
              <p className="text-gray-300">Variabilní symbol: {user?.id}</p>
              <p className="text-gray-300">Částka: {total} Kč</p>
            </div>
          )}

          {paymentMethod === 'paypal' && (
            <div className="text-center">
              <p className="text-gray-300 mb-4">
                Budete přesměrováni na PayPal pro dokončení platby
              </p>
            </div>
          )}

          <div className="mt-6">
            <p className="text-xl text-white mb-4">
              Celková částka: <span className="font-bold">{total} Kč</span>
            </p>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors"
            >
              Zaplatit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
import React from 'react';
import { X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartItem } from '../types';
import { CURRENCY_SYMBOL } from '../constants';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onRemove,
  onUpdateQuantity,
}) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-darker border-l border-white/10 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">Your Cart</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-gray-400" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                    <X className="h-8 w-8 opacity-50" />
                  </div>
                  <p>Your cart is empty.</p>
                  <button 
                    onClick={onClose}
                    className="mt-4 text-primary hover:underline"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg bg-black/20"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-medium line-clamp-1">{item.name}</h3>
                      <p className="text-primary font-semibold mt-1">
                        {item.price.toLocaleString()} {CURRENCY_SYMBOL}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3 bg-black/20 rounded-lg p-1">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 hover:bg-white/10 rounded transition-colors"
                          >
                            <Minus className="h-4 w-4 text-gray-400" />
                          </button>
                          <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 hover:bg-white/10 rounded transition-colors"
                          >
                            <Plus className="h-4 w-4 text-gray-400" />
                          </button>
                        </div>
                        <button
                          onClick={() => onRemove(item.id)}
                          className="text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-black/20">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-xl font-bold text-white">
                    {total.toLocaleString()} {CURRENCY_SYMBOL}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-4 text-center">
                  Shipping calculated at checkout.
                </p>
                <button className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-black font-bold rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2">
                  Checkout <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
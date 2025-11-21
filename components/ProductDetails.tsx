import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingCart, User, Send, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product, Review } from '../types';
import { CURRENCY_SYMBOL } from '../constants';
import toast from 'react-hot-toast';

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onClose, onAddToCart }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
  const [hoverRating, setHoverRating] = useState(0);

  // Load reviews from local storage
  useEffect(() => {
    const stored = localStorage.getItem('rapidkeys_reviews');
    if (stored) {
      try {
        const allReviews = JSON.parse(stored);
        if (allReviews[product.id]) {
          setReviews(allReviews[product.id]);
        }
      } catch (e) {
        console.error("Failed to parse reviews", e);
      }
    }
  }, [product.id]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    const review: Review = {
      id: Date.now().toString(),
      productId: product.id,
      userName: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toLocaleDateString()
    };

    const updatedReviews = [review, ...reviews];
    setReviews(updatedReviews);

    // Save to local storage
    const stored = localStorage.getItem('rapidkeys_reviews');
    const allReviews = stored ? JSON.parse(stored) : {};
    allReviews[product.id] = updatedReviews;
    localStorage.setItem('rapidkeys_reviews', JSON.stringify(allReviews));

    setNewReview({ name: '', rating: 5, comment: '' });
    toast.success('Review posted successfully!');
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) 
    : 'New';

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-darker border border-white/10 w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden relative flex flex-col md:flex-row max-h-[90vh] md:h-[80vh]"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/40 hover:bg-white/10 text-white rounded-full transition-colors backdrop-blur-md"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Left Side: Image */}
        <div className="w-full md:w-1/2 h-64 md:h-full relative bg-white/5">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-darker via-transparent to-transparent opacity-60 md:hidden" />
          {product.badge && (
            <div className="absolute top-6 left-6 bg-accent text-black font-bold px-3 py-1 rounded-lg shadow-lg">
              {product.badge}
            </div>
          )}
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-1/2 flex flex-col bg-darker h-full overflow-hidden">
          {/* Product Info (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-primary text-sm font-semibold tracking-wider uppercase border border-primary/30 px-2 py-0.5 rounded">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-accent">
                <Star className="w-4 h-4 fill-accent" />
                <span className="text-white text-sm font-bold">{averageRating}</span>
                <span className="text-gray-500 text-xs">({reviews.length} reviews)</span>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              {product.name}
            </h2>

            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center justify-between mb-8 p-4 bg-white/5 rounded-2xl border border-white/5">
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Price</p>
                <p className="text-3xl font-bold text-white">
                  {product.price.toLocaleString()} <span className="text-primary text-lg">{CURRENCY_SYMBOL}</span>
                </p>
              </div>
              <button
                onClick={() => onAddToCart(product)}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-black px-6 py-3 rounded-xl font-bold text-lg transition-transform active:scale-95 shadow-lg shadow-primary/20"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>

            <div className="border-t border-white/10 pt-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                Reviews <span className="text-sm font-normal text-gray-500">({reviews.length})</span>
              </h3>

              {/* Review Form */}
              <form onSubmit={handleSubmitReview} className="bg-white/5 p-5 rounded-2xl mb-8 border border-white/5">
                <h4 className="text-white font-medium mb-4">Write a Review</h4>
                
                <div className="flex gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star 
                        className={`w-6 h-6 ${
                          star <= (hoverRating || newReview.rating) 
                            ? 'fill-accent text-accent' 
                            : 'text-gray-600'
                        }`} 
                      />
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors"
                  />
                  <textarea
                    placeholder="Share your thoughts..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors min-h-[100px] resize-none"
                  />
                  <button 
                    type="submit"
                    className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Post Review
                  </button>
                </div>
              </form>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.length === 0 ? (
                  <p className="text-gray-500 text-center italic py-4">No reviews yet. Be the first to review!</p>
                ) : (
                  reviews.map((review) => (
                    <div key={review.id} className="bg-black/20 p-4 rounded-xl border border-white/5">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="bg-primary/20 p-1.5 rounded-full">
                            <User className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-white font-medium">{review.userName}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500 text-xs">
                          <Calendar className="w-3 h-3" />
                          <span>{review.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${i < review.rating ? 'fill-accent text-accent' : 'text-gray-700'}`} 
                          />
                        ))}
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">{review.comment}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
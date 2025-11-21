import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS, CURRENCY_SYMBOL } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Star, SearchX, ChevronDown, SlidersHorizontal, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import { ProductDetails } from './ProductDetails';

interface ProductGridProps {
  addToCart: (product: Product) => void;
  searchQuery: string;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const categories = ['All', 'Keyboard', 'Mouse', 'Headset', 'Accessories'];

export const ProductGrid: React.FC<ProductGridProps> = ({ addToCart, searchQuery, selectedCategory, onSelectCategory }) => {
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Filter products based on category and search query
  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0; // Default order (Popularity)
    }
  });

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <section id="products" className="py-16 bg-dark relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
          <div>
             <h2 className="text-3xl font-bold text-white">Trending Gear</h2>
             {searchQuery && (
                <p className="text-gray-400 text-sm mt-1">
                  Showing results for "{searchQuery}"
                </p>
             )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto items-start sm:items-center">
            {/* Sort Dropdown */}
            <div className="relative w-full sm:w-auto">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SlidersHorizontal className="h-4 w-4 text-gray-400" />
               </div>
               <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-auto appearance-none bg-white/5 border border-white/10 text-gray-300 text-sm rounded-full pl-10 pr-10 py-2 focus:outline-none focus:border-primary cursor-pointer hover:bg-white/10 transition-colors"
               >
                  <option value="popularity">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A-Z</option>
               </select>
               <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            {/* Categories */}
            <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full sm:w-auto no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25'
                      : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {sortedProducts.length === 0 ? (
           <motion.div 
             initial={{ opacity: 0 }} 
             animate={{ opacity: 1 }}
             className="flex flex-col items-center justify-center py-20 text-gray-500"
           >
              <SearchX className="w-16 h-16 mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-gray-300">No products found</h3>
              <p>Try adjusting your search or filter to find what you're looking for.</p>
              <button 
                 onClick={() => onSelectCategory('All')}
                 className="mt-6 text-primary hover:underline"
              >
                 Clear Filters
              </button>
           </motion.div>
        ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {sortedProducts.map((product) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className="bg-darker border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 group flex flex-col h-full cursor-pointer"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {product.badge && (
                        <div className="absolute top-3 left-3 bg-accent text-black text-xs font-bold px-2 py-1 rounded-md shadow-lg z-10">
                          {product.badge}
                        </div>
                      )}
                      {/* Overlay with View Details */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                         <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 text-white text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform">
                           <Eye className="w-4 h-4" /> View Details
                         </div>
                      </div>

                      <button 
                        onClick={(e) => handleAddToCart(e, product)}
                        className="absolute bottom-3 right-3 z-20 bg-white text-black p-3 rounded-full shadow-lg translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-white"
                      >
                        <ShoppingCart className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex items-center gap-1 mb-2">
                         {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                         ))}
                         <span className="text-xs text-gray-500 ml-1">(4.8)</span>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-2 mb-4 flex-grow">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                        <span className="text-xl font-bold text-white">
                          {product.price.toLocaleString()} <span className="text-sm text-primary font-medium">{CURRENCY_SYMBOL}</span>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
        )}
      </div>

      {/* Product Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetails 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
            onAddToCart={(p) => {
               addToCart(p);
               toast.success(`${p.name} added to cart!`);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
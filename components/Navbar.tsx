import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onSearch: (query: string) => void;
  onCategorySelect: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick, onSearch, onCategorySelect }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', category: 'All' },
    { label: 'Keyboards', category: 'Keyboard' },
    { label: 'Mice', category: 'Mouse' },
    { label: 'Audio', category: 'Headset' },
    { label: 'Accessories', category: 'Accessories' }
  ];

  const handleNavClick = (category: string) => {
    onCategorySelect(category);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? 'bg-darker/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer group"
            onClick={() => handleNavClick('All')}
          >
            <div className="bg-gradient-to-tr from-primary to-secondary p-2 rounded-lg group-hover:shadow-lg group-hover:shadow-primary/50 transition-all">
               <svg className="h-6 w-6 text-white fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                 <path d="M5 3H12C15.866 3 19 6.134 19 10C19 12.447 17.753 14.608 15.868 15.805L20.653 23H16.834L12.654 16.5H8.5V23H5V3ZM8.5 6V13.5H12C13.933 13.5 15.5 11.933 15.5 10C15.5 8.067 13.933 6 12 6H8.5Z" />
               </svg>
            </div>
            <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 hidden sm:block">
              Rapidkeys
            </span>
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 sm:hidden">
              RK
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block flex-shrink-0">
            <div className="ml-10 flex items-baseline space-x-4 lg:space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.category)}
                  className="text-gray-300 hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 justify-end max-w-xs ml-auto">
            <div className="relative group w-full">
              <input
                type="text"
                placeholder="Search gear..."
                onChange={(e) => onSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:bg-white/10 focus:border-primary/50 transition-all duration-300"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" />
            </div>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-300 hover:text-white transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button & Search */}
          <div className="md:hidden flex items-center gap-2 flex-1 justify-end">
             <div className="relative w-full max-w-[140px] xs:max-w-[180px]">
               <input
                  type="text"
                  placeholder="Search..."
                  onChange={(e) => onSearch(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-full py-1.5 pl-8 pr-2 text-xs text-white focus:outline-none focus:border-primary/50"
               />
               <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400" />
            </div>
             <button
              onClick={onCartClick}
              className="relative p-2 text-gray-300 hover:text-white transition-colors flex-shrink-0"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-gradient-to-r from-primary to-secondary rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-gray-800 p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none flex-shrink-0"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-darker border-b border-white/10"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.category)}
                  className="text-gray-300 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-white/5"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
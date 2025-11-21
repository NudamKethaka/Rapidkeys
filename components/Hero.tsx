import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Monitor, Wifi } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-darker pt-20 pb-16 sm:pt-32 sm:pb-24 lg:pb-32">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
        
        {/* Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-primary text-sm font-semibold mb-6">
              Designed for Sri Lanka 🇱🇰
            </span>
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl lg:text-6xl">
              <span className="block">Level Up Your</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Tech Game
              </span>
            </h1>
            <p className="mt-3 max-w-md mx-auto lg:mx-0 text-base text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Premium gear for students, developers, and gamers. Affordable prices, island-wide delivery, and top-tier performance.
            </p>
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-black bg-primary hover:bg-primary/90 md:py-4 md:text-lg md:px-10"
              >
                Shop Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-3 sm:mt-0 w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-white/20 text-base font-medium rounded-lg text-white bg-white/5 hover:bg-white/10 md:py-4 md:text-lg md:px-10 backdrop-blur-sm"
              >
                Student Deals <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Hero Image/Graphic */}
        <div className="lg:w-1/2 mt-16 lg:mt-0 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Abstract floating elements */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-10 -left-10 bg-darker border border-white/10 p-4 rounded-2xl shadow-xl z-20"
            >
              <Cpu className="text-primary h-8 w-8" />
            </motion.div>
             <motion.div 
              animate={{ y: [10, -10, 10] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -bottom-10 -right-10 bg-darker border border-white/10 p-4 rounded-2xl shadow-xl z-20"
            >
              <Wifi className="text-secondary h-8 w-8" />
            </motion.div>

            <img
              src="https://picsum.photos/600/600?random=hero" 
              alt="Gaming Setup"
              className="rounded-3xl shadow-2xl border-2 border-white/10 w-full h-auto object-cover aspect-square"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-darker/80 via-transparent to-transparent pointer-events-none"></div>
            
            <div className="absolute bottom-6 left-6 right-6 z-20">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 flex items-center justify-between">
                 <div>
                   <p className="text-white font-bold">Ultimate Bundle</p>
                   <p className="text-gray-300 text-sm">Keyboard + Mouse + Pad</p>
                 </div>
                 <span className="text-accent font-bold">12,500 LKR</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-4">
              Rapidkeys
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering Sri Lanka's next generation with top-tier technology. We provide quality gear for students, professionals, and gamers island-wide.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-primary cursor-pointer">Keyboards</li>
              <li className="hover:text-primary cursor-pointer">Gaming Mice</li>
              <li className="hover:text-primary cursor-pointer">Headsets</li>
              <li className="hover:text-primary cursor-pointer">Student Deals</li>
            </ul>
          </div>

           {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>No. 123, Galle Road, Colombo 03</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+94 77 123 4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>hello@rapidkeys.lk</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-primary hover:text-black transition-all">
                <Facebook className="h-5 w-5" />
              </a>
               <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-primary hover:text-black transition-all">
                <Instagram className="h-5 w-5" />
              </a>
               <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-primary hover:text-black transition-all">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Rapidkeys. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-600">
             <span className="hover:text-white cursor-pointer">Privacy Policy</span>
             <span className="hover:text-white cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
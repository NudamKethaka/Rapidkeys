import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'NeonStrike Mechanical Keyboard',
    price: 8500,
    category: 'keyboard',
    description: 'RGB Blue switch mechanical keyboard perfect for coding and gaming.',
    image: 'https://picsum.photos/400/300?random=1',
    badge: 'Best Seller'
  },
  {
    id: '2',
    name: 'Viper Wireless Mouse',
    price: 3200,
    category: 'mouse',
    description: 'Ultra-lightweight wireless mouse with 16000 DPI sensor.',
    image: 'https://picsum.photos/400/300?random=2',
    badge: 'New'
  },
  {
    id: '3',
    name: 'BassPro Gaming Headset',
    price: 12000,
    category: 'headset',
    description: '7.1 Surround sound with noise-cancelling microphone.',
    image: 'https://picsum.photos/400/300?random=3'
  },
  {
    id: '4',
    name: 'Student Laptop Stand',
    price: 2500,
    category: 'accessories',
    description: 'Ergonomic aluminum stand for long study sessions.',
    image: 'https://picsum.photos/400/300?random=4'
  },
  {
    id: '5',
    name: 'ProStream Webcam 1080p',
    price: 6800,
    category: 'accessories',
    description: 'Crystal clear video for Zoom classes and streaming.',
    image: 'https://picsum.photos/400/300?random=5'
  },
  {
    id: '6',
    name: 'SilentType Membrane Keyboard',
    price: 4500,
    category: 'keyboard',
    description: 'Quiet keys, perfect for library use or late-night assignments.',
    image: 'https://picsum.photos/400/300?random=6'
  },
  {
    id: '7',
    name: 'RGB Desk Mat XL',
    price: 1800,
    category: 'accessories',
    description: 'Water-resistant extended mousepad with glowing edges.',
    image: 'https://picsum.photos/400/300?random=7'
  },
  {
    id: '8',
    name: 'SonicBuds True Wireless',
    price: 5500,
    category: 'headset',
    description: 'Budget-friendly earbuds with massive bass.',
    image: 'https://picsum.photos/400/300?random=8',
    badge: 'Student Pick'
  }
];

export const CURRENCY_SYMBOL = "LKR";

export const INITIAL_CHAT_MESSAGE = "Ayubowan! I'm your Rapidkeys AI assistant. Looking for a gaming keyboard or need budget-friendly student gear? Ask me anything!";
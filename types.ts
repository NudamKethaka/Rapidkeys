export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'keyboard' | 'mouse' | 'headset' | 'laptop' | 'accessories';
  description: string;
  image: string;
  badge?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}
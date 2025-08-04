import { User } from '@/types/user';

export interface Review {
  _id: number;
  order_id: number;
  product_id: number;
  rating: number;
  user: Pick<User, '_id' | 'name'>;
  content: string;
  createdAt: string;
  extra: {
    height: string;
    weight: string;
    size: string;
    productPrice: number;
    images?: string[];
  };
  product: { _id: number; image: { _id: number; path: string; name: string }; name: string };
}

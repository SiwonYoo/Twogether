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
    comment: [{ content: string; createdAt: string; user: { _id: number; name: string } }];
    height: string;
    weight: string;
    size: string;
    images?: string[];
  };
  product?: { _id: number; image: { path: string; name: string }; name: string };
}

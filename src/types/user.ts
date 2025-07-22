export interface User {
  _id: number;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  type: 'user';
  loginType: 'email';
  image?: string;
  token?: {
    accessToken: string;
    refreshToken: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

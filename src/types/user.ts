export interface User {
  _id?: number;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  type: 'user';
  loginType: 'email';
  image?: string | null;
  token?: {
    accessToken: string;
    refreshToken: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginDataType {
  email: string;
  password: string;
}

export interface EditProfileType {
  accessToken: string;
  _id: number;
  name: string;
  phone: string;
  password?: string;
  checkPassword?: string;
}

export interface EditProfileImageType {
  _id: number;
  imageFile: File | null;
  accessToken: string;
}

export interface VerifyEmailType {
  accepted: string[];
  rejected: [];
  ehlo: string[];
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: {
    from: string;
    to: string[];
  };
  messageId: string;
}

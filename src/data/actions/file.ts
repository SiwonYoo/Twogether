'use server';

import { ApiResPromise, FileUpload } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

export async function uploadFile(formData: FormData): ApiResPromise<FileUpload[]> {
  const fileForm = new FormData();
  fileForm.append('attach', formData.get('attach') as File);

  const res = await fetch(`${API_URL}/files`, {
    method: 'POST',
    headers: {
      'Client-Id': CLIENT_ID,
    },
    body: fileForm,
  });

  return res.json();
}

export async function uploadFiles(attaches: File[]): ApiResPromise<FileUpload[]> {
  const fileForm = new FormData();
  attaches.map((item) => fileForm.append(`attach`, item));

  const res = await fetch(`${API_URL}/files`, {
    method: 'POST',
    headers: {
      'Client-Id': CLIENT_ID,
    },
    body: fileForm,
  });

  return res.json();
}

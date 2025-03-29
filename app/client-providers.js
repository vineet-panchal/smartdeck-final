'use client';

import { ClerkProvider } from '@clerk/nextjs';

export default function ClientProviders({ children }) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
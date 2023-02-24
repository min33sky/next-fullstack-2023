'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

interface Props {
  children: React.ReactNode;
  session: Session | null;
}

/**
 * NextAuth session provider wrapper
 * @param session NextAuth session
 * @returns NextAuth session provider
 */
export default function SessionProviderWrapper({ children, session }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

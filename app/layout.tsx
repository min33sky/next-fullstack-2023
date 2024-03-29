import './globals.css';
import Nav from './common/Nav';
import ReactQueryWrapper from '../lib/QueryWrapper';
import SessionProviderWrapper from '@/components/common/SessionProviderWrapper';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import LocalFont from 'next/font/local';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next.js + TypeScript + Tailwind CSS',
  description:
    'A starter template for Next.js with TypeScript and Tailwind CSS',
  openGraph: {
    url: 'https://nextjs-typescript-tailwindcss.vercel.app/',
    title: 'Next.js + TypeScript + Tailwind CSS',
  },
};

const pretendard = LocalFont({
  variable: '--font-pretendard',
  src: [
    {
      path: './fonts/Pretendard-Light.woff2',
      weight: '300',
    },
    {
      path: './fonts/Pretendard-Regular.woff2',
      weight: '400',
    },
    {
      path: './fonts/Pretendard-Bold.woff2',
      weight: '700',
    },
  ],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="ko">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body
        className={`mx-4 bg-primary  font-pretendard text-slate-300 md:mx-48 xl:mx-96 ${pretendard.variable}`}
      >
        <SessionProviderWrapper session={session}>
          <ReactQueryWrapper>
            {/* @ts-expect-error Server Component */}
            <Nav />
            {children}
          </ReactQueryWrapper>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}

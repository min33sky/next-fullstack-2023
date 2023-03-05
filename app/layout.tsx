import './globals.css';
import Nav from './common/Nav';
import { Roboto, Nanum_Brush_Script } from '@next/font/google';
import ReactQueryWrapper from '../lib/QueryWrapper';
import SessionProviderWrapper from '@/components/common/SessionProviderWrapper';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

const nanumBrush = Nanum_Brush_Script({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-nanum-brush',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  console.log('##### [layout] session ::::::: ', session);

  return (
    <html lang="ko">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body
        className={`mx-4 bg-slate-800 text-slate-300 md:mx-48 xl:mx-96 ${roboto.variable} ${nanumBrush.variable} font-nanumBrush`}
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

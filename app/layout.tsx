import './globals.css';
import Nav from './common/Nav';
import { Roboto } from '@next/font/google';
import ReactQueryWrapper from '../lib/QueryWrapper';
import SessionProviderWrapper from '@/components/common/SessionProviderWrapper';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
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
        className={`mx-4 bg-slate-800 text-slate-300 md:mx-48 xl:mx-96 ${roboto.className}`}
      >
        {/* TODO: sessionProverder 구현 */}
        <SessionProviderWrapper session={null}>
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

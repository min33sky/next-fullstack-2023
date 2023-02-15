import './globals.css';
import Nav from './common/Nav';
import { Roboto } from '@next/font/google';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        {/* @ts-expect-error Server Component */}
        <Nav />
        {children}
      </body>
    </html>
  );
}

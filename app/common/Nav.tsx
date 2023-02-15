import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import Logged from '../auth/Logged';
import Login from '../auth/Login';

export default async function Nav() {
  const session = await getServerSession(authOptions);

  console.log('##### 로그인 세션: ', session);

  return (
    <nav className="flex items-center justify-between py-8">
      <Link href={'/'}>
        <h1>Send it.</h1>
      </Link>
      <ul className="flex items-center gap-6">
        {session?.user ? <Logged image={session.user.image} /> : <Login />}
      </ul>
    </nav>
  );
}

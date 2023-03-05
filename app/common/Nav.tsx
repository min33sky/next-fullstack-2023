import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import Logged from '../auth/Logged';
import Login from '../auth/Login';

export default async function Nav() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex items-center justify-between py-8">
      <Link href={'/'}>
        <h1 className="text-secondary">Send it.</h1>
      </Link>

      <ul className="flex items-center gap-6">
        {session?.user ? <Logged image={session.user.image} /> : <Login />}
      </ul>
    </nav>
  );
}

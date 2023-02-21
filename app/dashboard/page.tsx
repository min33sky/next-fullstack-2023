import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { User } from '../types/user';
import MyDashboard from './MyDashboard';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  const myStatus = await getMyStatus(session.user?.email!);

  return (
    <main>
      <h1 className="text-2xl font-bold">Welcome back {session.user?.name}</h1>
      <MyDashboard myStatus={myStatus} />
    </main>
  );
}

async function getMyStatus(email: string) {
  // TODO: queryString 대신 urlParams로 바꾸기
  /**
   ** SSR에서는 cache: 'no-store' 옵션을 주어야 한다.
   *? email을 query로 넘겨주는데, 왜냐하면 apiRoute에서 session을 인식하지 못해서 이런식으로 넘겨줌.
   */
  const res = await fetch(
    `http://localhost:3000/api/posts/authPosts?email=${email}`,
    {
      cache: 'no-store',
    },
  );

  const myStatus: User = await res.json();
  return myStatus;
}

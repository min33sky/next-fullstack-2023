import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Post } from '../types/posts';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  const posts = await getMyPosts(session.user?.email!);

  console.log('내 게시물::::', posts);

  return (
    <main>
      <h1 className="text-2xl font-bold">Welcome back {session.user?.name}</h1>
    </main>
  );
}

async function getMyPosts(email: string) {
  const res = await fetch(
    `http://localhost:3000/api/posts/authPosts?email=${email}`,
    {
      cache: 'no-store', //? SSR
    },
  );
  const posts: Post[] = await res.json();
  return posts;
}

import AddPost from './posts/AddPost';
import PostList from './posts/PostList';
import { Post } from '../types/posts';
import { cookies } from 'next/headers';

export default async function Home() {
  const data = await getAllPosts();

  return (
    <main className="">
      <AddPost />
      <PostList posts={data} />
    </main>
  );
}

async function getAllPosts() {
  const nextCookies = cookies();
  const cookie = nextCookies.getAll().reduce((acc, cur) => {
    return `${acc}${cur.name}=${cur.value}; `;
  }, '');

  const res = await fetch(`${process.env.BASE_URL}/api/posts/getPosts`, {
    // credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      cookie,
    },
  });
  const posts: Post[] = await res.json();

  return posts;
}

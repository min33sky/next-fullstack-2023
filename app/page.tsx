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
  //? Next-Auth의 쿠키를 가져와 API 호출할 때 헤더에 넣어준다. (API Route에서 Session을 가져오기 위해)
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

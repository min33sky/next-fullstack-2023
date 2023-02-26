import AddPost from './posts/AddPost';
import PostList from './posts/PostList';
import { Post } from '../types/posts';

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
  const res = await fetch(`${process.env.BASE_URL}/api/posts/getPosts`);
  const posts: Post[] = await res.json();

  return posts;
}

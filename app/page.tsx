import AddPost from './posts/AddPost';
import PostItem from './posts/PostItem';
import { Post } from './types/posts';

async function getAllPosts() {
  const res = await fetch('http://localhost:3000/api/posts/getPosts');
  // TODO: 타입 정의 업데이트 (댓글, 유저정보 합쳐서 가져옴)
  const posts: Post[] = await res.json();
  return posts;
}

export default async function Home() {
  const data = await getAllPosts();

  return (
    <main className="">
      <AddPost />
      {
        // TODO: 각각 게시물 카드 구현하기
        data.map((post) => (
          <PostItem key={post.id} {...post} />
        ))
      }
    </main>
  );
}

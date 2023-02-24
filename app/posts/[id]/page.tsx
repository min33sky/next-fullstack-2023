import PostDetail from '@/components/posts/PostDetail';
import { PostDetailType } from '@/types/posts';
import { Post, User } from '@prisma/client';
import React from 'react';

interface Props {
  params: { id: string };
  searchParams: Record<string, string>;
}

/**
 * 상세 페이지
 */
export default async function PageDetailPage({
  params: { id },
  searchParams,
}: Props) {
  const post = await getPostDetail(id);

  return (
    <div>
      <PostDetail post={post} />
      {/* TODO: 댓글 보여줄 뷰 만들기 */}
    </div>
  );
}

async function getPostDetail(id: string) {
  const data: PostDetailType = await fetch(
    `${process.env.BASE_URL}/api/posts/${id}`,
    {
      next: {
        revalidate: 1000 * 60 * 60 * 24, // 24시간
      },
    },
  ).then((res) => res.json());
  return data;
}

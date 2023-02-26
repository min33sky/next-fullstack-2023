import PostDetail from '@/components/posts/PostDetail';
import { PostDetailType } from '@/types/posts';
import { Post, User } from '@prisma/client';
import React from 'react';

interface Props {
  params: { id: string };
}

/**
 * 상세 페이지
 */
export default async function PageDetailPage({ params: { id } }: Props) {
  const post = await getPostDetail(id);

  return <PostDetail post={post} />;
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

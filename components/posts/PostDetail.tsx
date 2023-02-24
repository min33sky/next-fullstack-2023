'use client';

import { getPostById } from '@/api/posts';
import { PostDetailType } from '@/types/posts';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';
import AddCommentForm from './AddCommentForm';

interface Props {
  post: PostDetailType;
}

export default function PostDetail({ post }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ['getPostDetail', post.id],
    queryFn: () => getPostById(post.id),
    initialData: post,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-lg bg-slate-100 p-4">
      <div className="flex flex-col space-y-4">
        <header className="flex items-center gap-2">
          <Image
            className="rounded-full"
            width={32}
            height={32}
            src={post.author.image}
            alt="avatar"
          />
          <h3 className="font-bold text-gray-700">{post.author.name}</h3>
        </header>
        <div>
          <h1 className="text-slate-800">{data?.title}</h1>
        </div>
      </div>

      <AddCommentForm postId={post.id} />

      <div>{/* TODO: 댓글 뷰 */}</div>
    </div>
  );
}

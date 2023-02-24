'use client';

import { getPostById } from '@/api/posts';
import { PostDetailType } from '@/types/posts';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

interface Props {
  post: PostDetailType;
}

export default function PostDetail({ post }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ['getPostDetail', post.id],
    queryFn: () => getPostById(post.id),
    initialData: post,
  });

  return <div>PostDetail</div>;
}

'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import type { Post } from '../types/posts';
import { getPosts } from './api/posts';
import PostItem from './PostItem';

interface Props {
  posts: Post[];
}

export default function PostList({ posts }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ['getPosts'],
    queryFn: getPosts,
    initialData: posts,
    onSuccess(data) {
      console.log('데이터 가져오기 성공: ', data);
    },
    onError(error) {
      console.log('데이터 가져오기 실패: ', error);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.map((post) => (
        <PostItem key={post.id} {...post} />
      ))}
    </div>
  );
}

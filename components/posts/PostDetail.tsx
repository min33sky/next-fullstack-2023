'use client';

import { getPostById } from '@/api/posts';
import { PostDetailType } from '@/types/posts';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';
import AddCommentForm from './AddCommentForm';
import { motion } from 'framer-motion';

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

      {/* TODO: 댓글 목록은 따로 분리하는게 좋을듯 */}
      <div className="flex flex-col space-y-3">
        {data?.comments.map((comment) => (
          <motion.article
            key={comment.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ease: 'easeOut', duration: 0.5 }}
            className="rounded-md border bg-white p-4 shadow-lg"
          >
            <div className="flex items-center gap-2">
              <Image
                className="rounded-full"
                width={32}
                height={32}
                src={comment.author.image}
                alt="avatar"
              />
              <h3 className="font-bold text-gray-700">{comment.author.name}</h3>
              <h2 className="text-sm">
                {/* TODO: 날짜 시간 표현 */}
                {new Date(comment.createdAt).toISOString()}
              </h2>
            </div>
            <p className="py-4 text-gray-500">{comment.text}</p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

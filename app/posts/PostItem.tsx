'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { Post } from '../../types/posts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addLike, cancelLike } from '@/api/posts';
import dynamic from 'next/dynamic';

//? Dynamic import (Hydration Error때문에 )
const HeartButton = dynamic(() => import('@/components/posts/HeartButton'), {
  ssr: false,
});

interface Props extends Post {}

export default function PostItem({
  id,
  title,
  createdAt,
  author,
  comments,
  hearts,
  isHearted,
}: Props) {
  // XXX : 나중에 useSWR가 필요하나?????????????????
  const queryClient = useQueryClient();

  console.log('postID, isHearted', id, isHearted);

  const { mutate, isLoading } = useMutation({
    mutationFn: isHearted ? cancelLike : addLike,
    /**
     * Optimistic UI
     */
    async onMutate(postId) {
      await queryClient.cancelQueries(['getPosts']);

      const previousPosts = queryClient.getQueryData(['getPosts']);

      queryClient.setQueryData(['getPosts'], (old: any) => {
        return old.map((post: Post) => {
          if (post.id === id) {
            return {
              ...post,
              hearts: isHearted
                ? [...post.hearts].slice(0, -1)
                : [
                    ...post.hearts,
                    {
                      id: 'temp',
                      postId: id,
                      userId: 'temp',
                    },
                  ],
              isHearted: !isHearted,
            };
          }
          return post;
        });
      });

      return { previousPosts };
    },

    onError(error, variables, context: any) {
      queryClient.setQueryData(['getPosts'], context.previousPosts);
    },

    onSettled() {
      queryClient.invalidateQueries(['getPosts']);
    },
  });

  /**
   * 좋아요 버튼 클릭 시
   */
  const handleLike = () => {
    mutate(id);
  };

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ease: 'easeOut', duration: 0.5 }}
      className="my-8 rounded-lg bg-white p-8"
    >
      <header className="flex items-center gap-2">
        <Image
          className="rounded-full"
          width={32}
          height={32}
          src={author.image}
          alt="avatar"
        />
        <h3 className="font-bold text-gray-700">{author.name}</h3>
        <p className="text-sm text-gray-500">
          {new Date(createdAt).toISOString()}
        </p>
      </header>

      <div className="my-8">
        <p className="break-all text-gray-500">{title}</p>
      </div>

      <footer className="flex cursor-pointer items-center justify-between gap-4">
        <HeartButton
          aria-label="Like Post"
          isHearted={isHearted ?? false}
          likesCount={hearts.length}
          handleLike={handleLike}
        />

        <Link
          href={{
            pathname: `/posts/${id}`,
          }}
        >
          <p className="text-sm font-bold text-gray-700">
            {comments.length} Comments
          </p>
        </Link>
      </footer>
    </motion.article>
  );
}

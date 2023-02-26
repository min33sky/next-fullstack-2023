import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import type { Post } from '../../types/posts';
import { useMutation } from '@tanstack/react-query';
import { addLike, cancelLike } from '@/api/posts';

interface Props extends Post {}

export default function PostItem({
  id,
  title,
  createdAt,
  updatedAt,
  author,
  comments,
  hearts,
  isHearted,
}: Props) {
  // XXX : 나중에 useSWR가 필요하나?????????????????

  // TODO: 내가 좋아요한 포스트인지 확인하기

  console.log('좋아요: ', isHearted);

  const { mutate, isLoading } = useMutation({
    mutationFn: isHearted ? cancelLike : addLike, // TODO: 좋아요, 좋아요 취소를 따로 구현해야함
    onSuccess(data) {
      console.log('좋아요 성공: ', data);
    },
    onError(error) {
      console.log('좋아요 실패: ', error);
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
        {/* TODO: 좋아요 버튼과 개수 */}
        <div className="flex items-center space-x-2">
          {/* 내가 좋아요한 포스트일 땐 fill-current classname 붙이기 */}
          <HeartIcon
            aria-label="Like Post"
            title="좋아요"
            className={`h-5 w-5 text-rose-500 ${
              isHearted ? 'fill-current' : ''
            }`}
            onClick={handleLike}
          />
          <span className="text-sm font-bold text-gray-700">
            {hearts.length ?? 0}
          </span>
        </div>

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

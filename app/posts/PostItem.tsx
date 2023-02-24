import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import type { Post } from '../../types/posts';

interface Props extends Post {}

export default function PostItem({
  id,
  title,
  createdAt,
  updatedAt,
  author,
  comments,
}: Props) {
  // XXX : 나중에 useSWR가 필요하나?????????????????

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
      </header>

      <div className="my-8">
        <p className="break-all text-gray-500">{title}</p>
      </div>

      <footer className="flex cursor-pointer items-center gap-4">
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

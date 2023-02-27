'use client';

import { HeartIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface Props {
  isHearted: boolean;
  handleLike: () => void;
  likesCount: number;
}

export default function HeartButton({
  isHearted,
  handleLike,
  likesCount,
}: Props) {
  return (
    <article className="flex items-center space-x-2">
      <HeartIcon
        title="좋아요"
        className={`h-5 w-5 text-rose-500 ${isHearted ? 'fill-current' : ''}`}
        onClick={handleLike}
      />
      <span className="text-sm font-bold text-gray-700">{likesCount ?? 0}</span>
    </article>
  );
}

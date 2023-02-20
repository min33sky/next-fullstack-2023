'use client';

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React, { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { addPost } from './api/posts';

/**
 * 포스트 작성 폼
 */
export default function AddPost() {
  const [title, setTitle] = useState('');
  const toastId = useRef<string>();

  const { mutate, isLoading } = useMutation({
    mutationFn: addPost,
    onSuccess(data, variables, context) {
      toast.success('Post created!! 🔥', {
        id: toastId.current,
      });
      setTitle('');
    },
    onError(error, variables, context) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message, {
          id: toastId.current,
        });
      } else {
        toast.error('Something went wrong', {
          id: toastId.current,
        });
      }
    },
  });

  const submitPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toastId.current = toast.loading('Creating post... 🚀');
    mutate(title);
  };

  return (
    <form onSubmit={submitPost} className="my-8 rounded-md bg-slate-50 p-8">
      <div className="my-4 flex flex-col">
        <textarea
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="h-24 w-full resize-none rounded-md border border-gray-300 p-4 text-gray-500 outline-none"
          placeholder="what's on your mind?"
        />
      </div>

      <footer className="flex items-center justify-between">
        <p
          className={`text-sm font-bold ${
            title.length > 300 ? 'text-red-700' : 'text-gray-500'
          }`}
        >
          {title.length} / 300
        </p>

        <button
          aria-label="Button to create a post"
          disabled={isLoading || title.length === 0}
          title={isLoading ? 'Please wait...' : 'Create Post'}
          className="rounded-xl bg-teal-600 py-2 px-6 text-sm text-white transition-colors hover:bg-teal-700 disabled:opacity-25"
        >
          {isLoading ? 'Please wait...' : 'Create Post'}
        </button>
      </footer>
    </form>
  );
}

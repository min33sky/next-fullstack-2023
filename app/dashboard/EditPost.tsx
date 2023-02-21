import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { deletePost } from '../posts/api/posts';
import { Post } from '../types/posts';

interface Props extends Post {}

export default function EditPost({
  id,
  title,
  createdAt,
  updatedAt,
  authorId,
  comments,
  author,
}: Props) {
  const [openModal, setOpenModal] = useState(false);
  const queryClient = useQueryClient();
  const deleteToastId = useRef<string>();

  const { mutate } = useMutation({
    mutationFn: deletePost,
    onSuccess() {
      toast.success('Your post has been deleted!', {
        id: deleteToastId.current,
      });
      queryClient.invalidateQueries(['getMyStatus', authorId]);
    },
    onError() {
      toast.error('Something went wrong!', {
        id: deleteToastId.current,
      });
    },
  });

  const handleDeletePost = () => {
    deleteToastId.current = toast.loading('Deleting your post...');
    mutate(id);
  };

  return (
    <>
      <article className="my-8 rounded-lg bg-white p-8">
        <header className="flex items-center gap-2">
          <Image width={32} height={32} src={author?.image} alt="avatar" />
          <h3 className="font-bold text-gray-700">{author.name}</h3>
        </header>

        <div className="py-8">
          <p className="break-all text-gray-500">{title}</p>
        </div>

        <footer className="flex items-center gap-4">
          <p className="text-sm font-bold text-gray-700">
            {comments.length} Comments
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              // TODO: 모달 띄우기
              handleDeletePost();
            }}
            className="text-sm font-bold text-red-500"
          >
            Delete
          </button>
        </footer>
      </article>
      {/* TODO: 삭제 모달 */}
    </>
  );
}

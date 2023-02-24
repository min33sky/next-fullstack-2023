import { addComment } from '@/api/posts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

interface Props {
  postId: string;
}

// TODO: 댓글 입력폼 구현
/**
 * [x]: 포스트 아이디와 댓글 작성자의 아이디가 필요
 * [ ]: 댓글 전송 후 댓글에 관한 쿼리 무효화 또는 optimistic update 필요
 * [x]: toast 띄우기
 */

/**
 * 댓글 입력폼
 */
export default function AddCommentForm({ postId }: Props) {
  const [commentText, setCommentText] = useState('');
  const commentToastId = useRef<string>(); // 댓글 등록 시 띄울 toast의 id
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: () => addComment(postId, commentText),
    onSuccess(data, variables, context) {
      console.log('댓글 등록 성공: ', data);
      toast.success('댓글이 등록되었습니다', {
        id: commentToastId.current,
      });
      setCommentText('');
    },
    onError(error, variables, context) {
      if (error instanceof Error) {
        toast.error(error.message, {
          id: commentToastId.current,
        });
      } else {
        toast.error('댓글 등록에 실패했습니다', {
          id: commentToastId.current,
        });
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (commentText.trim().length === 0 || commentText.length > 200) {
      return toast.error('댓글은 1자 이상 200자 이하로 작성해주세요');
    }
    commentToastId.current = toast.loading('댓글을 등록중입니다...');
    mutate();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="my-8 rounded-md border border-slate-300 bg-white p-2"
    >
      <div className="my-2 flex  space-x-2">
        <textarea
          name="comment"
          className="w-full resize-none rounded-md border  p-4 text-lg text-slate-500 outline-none"
          value={commentText}
          placeholder="Write a comment..."
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button
          disabled={isLoading || commentText.length === 0}
          className="rounded bg-slate-700 py-2 px-4 font-bold text-white disabled:bg-slate-300"
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </div>
      <p
        className={`font-bold  ${
          commentText.length > 300 ? 'text-red-700' : 'text-slate-300'
        } `}
      >
        {commentText.length} / 200
      </p>
    </form>
  );
}
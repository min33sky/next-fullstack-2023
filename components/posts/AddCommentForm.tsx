import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';

interface Props {
  postId: string;
}

/**
 * 댓글 입력폼
 */
export default function AddCommentForm({ postId }: Props) {
  const [commentText, setCommentText] = useState('');
  const commentToastId = useRef<string | null>(null);
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {},
    onSuccess(data, variables, context) {},
    onError(error, variables, context) {},
  });

  // TODO: 댓글 입력폼 구현
  /**
   * [x]: 포스트 아이디와 댓글 작성자의 아이디가 필요
   * [ ]: 댓글 전송 후 댓글에 관한 쿼리 무효화 또는 optimistic update 필요
   * [ ]: toast 띄우기
   */

  return (
    <form
      onSubmit={() => alert('준비중')}
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
        {commentText.length} / 300
      </p>
    </form>
  );
}

import { PostDetailType } from '@/types/posts';
import axios from 'axios';

//* POST관련 API 호출 함수

/**
 * 해당 ID의 포스트 가져오기
 * @param id 포스트 아이디
 */
export async function getPostById(id: string) {
  const { data } = await axios.get<PostDetailType>(`/api/posts/${id}`);
  return data;
}

/**
 * 댓글 작성 함수
 * @param postId 포스트 아이디
 * @param comment 댓글 내용
 */
export async function addComment(postId: string, comment: string) {
  return await axios.post<PostDetailType>('/api/posts/addComment', {
    postId,
    comment,
  });
}
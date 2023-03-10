import { Post } from '@/types/posts';
import axios from 'axios';

// TODO: 루트 api 폴더로 이사가자

/**
 * 포스트 등록 함수
 * @param title 내용
 */
export async function addPost(title: string) {
  return await axios.post<Post>('/api/posts/addPost', { title });
}

/**
 * 모든 포스트 조회 함수
 */
export async function getPosts() {
  const { data } = await axios.get<Post[]>('/api/posts/getPosts');
  return data;
}

/**
 * 포스트 삭제 함수
 * @param postId 포스트 아이디
 */
export async function deletePost(postId: string) {
  return await axios.delete<Post>(`/api/posts/deletePost?postId=${postId}`);
}

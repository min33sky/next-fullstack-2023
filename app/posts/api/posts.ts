import { Post } from '@/app/types/posts';
import axios from 'axios';

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

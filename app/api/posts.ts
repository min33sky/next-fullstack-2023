import { Post } from '@prisma/client';
import axios from 'axios';

/**
 * 포스트 등록 함수
 * @param title 내용
 */
export async function addPost(title: string) {
  return await axios.post<Post>('/api/posts/addPost', { title });
}

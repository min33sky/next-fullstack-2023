import { PostDetailType } from '@/types/posts';
import axios from 'axios';

/**
 * 해당 ID의 포스트 가져오기
 * @param id 포스트 아이디
 */
export async function getPostById(id: string) {
  const { data } = await axios.get<PostDetailType>(`/api/posts/${id}`);
  return data;
}

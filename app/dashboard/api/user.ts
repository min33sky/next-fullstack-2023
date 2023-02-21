import { User } from '@/app/types/user';
import axios from 'axios';

// TODO: api route 교체해야함 (posts -> users)
/**
 * 내 정보 가져오기 (포스트, 댓글 포함)
 */
export async function getMyStatus(id: string) {
  const { data } = await axios.get<User>('/api/posts/authPosts?id=' + id);
  return data;
}

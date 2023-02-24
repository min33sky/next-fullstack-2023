import { Post } from './posts';

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: null;
  image: string;
  posts: Post[];
}

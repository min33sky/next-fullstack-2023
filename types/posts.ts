import { Heart, User } from '@prisma/client';

// Generated by https://quicktype.io
export interface Post {
  id: string;
  title: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  author: Author;
  comments: Comment[];
  hearts: Heart[];
  isHearted?: boolean;
}

export interface PostDetailType {
  id: string;
  title: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  author: Author;
  comments: Comment[];
  hearts: Heart[];
}

export interface Author {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
}

export interface Comment {
  id: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  postId: string;
  authorId: string;
  author: Author;
}

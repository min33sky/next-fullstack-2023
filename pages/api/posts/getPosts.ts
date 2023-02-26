// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/prisma/prisma';
import { Heart, Post, Comment } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession, User } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);

  console.log('[getPosts] 세션 : ', session);

  if (req.method === 'GET') {
    try {
      let allPosts: (Post & {
        comments: Comment[];
        hearts: Heart[];
        author: User;
        isHearted?: boolean;
      })[] = await prisma.post.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          author: true,
          comments: true,
          hearts: true,
        },
      });

      // TODO: 좋아요 여부 추가
      if (session) {
        const exUser = await prisma.user.findUnique({
          where: {
            email: session?.user?.email!,
          },
        });

        if (exUser) {
          allPosts = allPosts.map((post) => {
            const isHearted = post.hearts.some(
              (heart) => heart.userId === exUser.id,
            );
            return {
              ...post,
              isHearted,
            };
          });
        }
      }

      res.status(200).json(allPosts);
    } catch (error: any) {
      res.status(403).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

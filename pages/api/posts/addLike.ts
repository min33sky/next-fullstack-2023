// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/prisma/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // TODO: 좋아요는 POST, 좋아요 취소는 DELETE로 구분

  const session = await getServerSession(req, res, authOptions);
  console.log('[addLike] 세션 : ', session);
  console.log('[addLike] 헤더 : ', req.headers);
  console.log('[addLike] postID : ', req.query);

  if (!session) {
    return res.status(401).json({ message: 'Please Log In' });
  }

  const exUser = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
  });

  if (!exUser) {
    return res.status(401).json({ message: 'No User...' });
  }

  const postId = req.query.postId as string;

  if (req.method === 'POST') {
    try {
      const result = await prisma.heart.create({
        data: {
          user: {
            connect: {
              id: exUser.id,
            },
          },
          post: {
            connect: {
              id: postId,
            },
          },
        },
      });
      res.status(200).json(result);
    } catch (error: any) {
      if (error.code === 'P2002') {
        res.status(400).json({ message: '이미 좋아요를 누른 게시물입니다.' });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  } else if (req.method === 'DELETE') {
    try {
      const result = await prisma.heart.delete({
        where: {
          postId_userId: {
            postId,
            userId: exUser.id,
          },
        },
      });
      res.status(200).json(result);
    } catch (error: any) {
      if (error.code === 'P2025') {
        res.status(400).json({ message: '좋아요를 누르지 않은 게시물입니다.' });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  } else {
    res.setHeader('Allow', ['POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

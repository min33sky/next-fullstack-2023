// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/prisma/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);

    console.log('[addComment] 쿠키 : ', req.cookies);

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

    const comment: string = req.body.comment;
    const postId: string = req.body.postId;

    console.log('[addComment] 코멘트 : ', comment);
    console.log('[addComment] 포스트 아이디 : ', postId);

    if (comment.length > 300) {
      return res
        .status(403)
        .json({ message: 'Please write a shorter comment.' });
    } else if (comment.length === 0) {
      return res
        .status(403)
        .json({ message: 'Please do not leave this empty' });
    }

    try {
      const newComment = await prisma.comment.create({
        data: {
          text: comment,
          author: {
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

      res.status(200).json(newComment);
    } catch (error) {
      res
        .status(403)
        .json({ message: 'Error has occured while making a comment' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

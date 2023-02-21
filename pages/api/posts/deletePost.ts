// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/prisma/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'DELETE') {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ message: 'You must be logged in.' });
    }

    const postId = req.query.postId as string;

    try {
      const exPost = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (!exPost) {
        return res.status(401).json({ message: 'No Post...' });
      }

      const result = await prisma.post.delete({
        where: {
          id: postId,
        },
      });

      res.status(200).json(result);
    } catch (error: any) {
      res.status(403).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

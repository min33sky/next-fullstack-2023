// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/prisma/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;

    try {
      const exPost = await prisma.post.findUnique({
        where: {
          id,
        },
        include: {
          author: true,
          comments: {
            orderBy: {
              createdAt: 'desc',
            },
            include: {
              author: true,
            },
          },
        },
      });

      if (!exPost) {
        return res.status(401).json({ message: 'No Post...' });
      }

      res.status(200).json(exPost);
    } catch (error: any) {
      res.status(403).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

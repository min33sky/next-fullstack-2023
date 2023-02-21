// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/prisma/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);

  console.log('[nextauth_url] : ', process.env.NEXTAUTH_URL);
  console.log('[getPosts] 세션 : ', session);

  if (req.method === 'GET') {
    try {
      const allPosts = await prisma.post.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          author: true,
          comments: true,
        },
      });
      res.status(200).json(allPosts);
    } catch (error: any) {
      res.status(403).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

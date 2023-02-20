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

    const title: string = req.body.title;

    if (title.length > 300) {
      return res.status(403).json({ message: 'Please write a shorter post' });
    } else if (title.length === 0) {
      return res
        .status(403)
        .json({ message: 'Please do not leave this empty' });
    }

    try {
      const result = await prisma.post.create({
        data: {
          title,
          author: {
            connect: {
              id: exUser.id,
            },
          },
        },
      });

      res.status(200).json(result);
    } catch (error) {
      res.status(403).json({ message: 'Something went wrong' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

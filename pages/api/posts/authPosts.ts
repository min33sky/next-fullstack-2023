// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/prisma/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // FIXME: 왜 session이 Null이 뜨냐?????????
  // const session = await getServerSession(req, res, authOptions);
  // console.log('세션: ', session);

  // if (!session) {
  //   return res.status(401).json({ message: 'You must be logged in.' });
  // }

  // TODO: email 대신 id로 바꾸기
  // TODO: qs 대신 params로 바꾸기
  //? session을 못찾아서 email을 쿼리스트링으로 받아오는 식으로 해결함
  const email = req.query.email as string;

  if (req.method === 'GET') {
    const exUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!exUser) {
      return res.status(401).json({ message: 'No User...' });
    }

    try {
      const result = await prisma.user.findUnique({
        where: {
          email,
        },
        include: {
          posts: {
            orderBy: {
              createdAt: 'desc',
            },
            include: {
              comments: {
                orderBy: {
                  createdAt: 'desc',
                },
              },
              author: {
                select: {
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
      });

      res.status(200).json(result);
    } catch (error) {
      res.status(403).json({ message: 'Something went wrong' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

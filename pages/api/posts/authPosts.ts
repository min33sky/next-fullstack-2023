// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/prisma/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // FIXME: 왜 session이 Null이 뜨냐?????????
  //? NextAuth의 쿠키를 못받아서 그런거 같은디????????????
  // const session = await getServerSession(req, res, authOptions);
  // console.log('##### [authPosts] 세션::::::::: ', session);

  // if (!session) {
  // return res.status(401).json({ message: 'You must be logged in.' });
  // }

  /**
   *? session을 못찾아서 email을 쿼리스트링으로 받아오는 식으로 해결함
   *? 서버에서의 호출은 email, 클라이언트에서 호출은 id로 가져옴
   */
  const email = req.query.email as string;
  const id = req.query.id as string;

  if (req.method === 'GET') {
    const exUser = await prisma.user.findUnique({
      where: {
        id,
        email,
      },
    });

    if (!exUser) {
      return res.status(401).json({ message: 'No User...' });
    }

    try {
      const result = await prisma.user.findUnique({
        where: {
          id,
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

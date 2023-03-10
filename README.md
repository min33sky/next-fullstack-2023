# Next-Fullstack

> Next.js version 13 Fire!! ๐ฅ

## Getting Started

```bash
yarn
```

## Stack

- React
- Next.js
- TypeScript
- Tailwind CSS
- NextAuth
- Prisma

## Note

1. ์๋ฒ ์ปดํฌ๋ํธ๋ฅผ layout์ ๋ฃ์ ๋ ํ์ ์๋ฌ๊ฐ ๋ฌ๋ค. ํด๊ฒฐ๋ฒ์ ๋ค์ ์ฝ๋๋ฅผ ํธ๋๋งํ  ์ปดํฌ๋ํธ ์์ ๋ฃ์ด๋ผ

```ts
{
  /* @ts-expect-error Server Component */
}
<์๋ฒ์ปดํฌ๋ํธ />;
```

2. `react-query`๋ ์๋ฒ ์ปดํฌ๋ํธ์์ ๋ถ๋ฌ์ฌ ์ ์๊ธฐ ๋๋ฌธ์ wrapper๋ฅผ ๋ง๋ค์ด์ layout์ ๋ฃ์ด์ค์ผ ํ๋ค.

3. `react-hot-toast`๋ ์๋ฒ ์ปดํฌ๋ํธ์์ ์ฌ์ฉํ  ์ ์๋ค. ์์ wrapper์ ์ถ๊ฐํ๋ ๋ฐฉ์์ผ๋ก ํด๊ฒฐํ๋ค.

4. ์๋ฒ์์ api๋ฅผ ์ง์  ํธ์ถํ๋ฉด api route์์ `getServerSession`์ ํธ์ถํ์ ๋ ์ธ์์ด **null**์ด ๋๋ค.
   ํด๊ฒฐํ๋ ค๋ฉด header์ `cookie`๋ฅผ ์ง์  ๋ฃ์ด์ค์ผ ํ๋ค.

```ts
import { cookies } from 'next/headers';

async function getAllPosts() {
  // next/headers์์ cookie๋ฅผ ๊ฐ์ ธ์จ๋ค.
  const nextCookies = cookies();

  // key/value ๋ฐฐ์ด ํํ๋ก ๋์ด ์์ผ๋ฏ๋ก reduce๋ฅผ ์ฌ์ฉํด์ ๋ฌธ์์ด๋ก ๋ง๋ ๋ค.
  const cookie = nextCookies.getAll().reduce((acc, cur) => {
    return `${acc}${cur.name}=${cur.value}; `;
  }, '');

  const res = await fetch(`${process.env.BASE_URL}/api/posts/getPosts`, {
    headers: {
      'Content-Type': 'application/json',
      cookie,
    },
  });
  const posts: Post[] = await res.json();

  return posts;
}
```

## Reference

- [Next13 + ReactQuery + SSR](https://tanstack.com/query/latest/docs/react/guides/ssr)

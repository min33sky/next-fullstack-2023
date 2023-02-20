# Next-Fullstack

> Next.js version 13 Fire!! 🔥

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

1. 서버 컴포넌트를 layout에 넣을 때 타입 에러가 뜬다. 해결법은 다음 코드를 핸더링할 컴포넌트 위에 넣어라

```ts
{
  /* @ts-expect-error Server Component */
}
<서버컴포넌트 />;
```

2. `react-query`는 서버 컴포넌트에서 불러올 수 없기 때문에 wrapper를 만들어서 layout에 넣어줘야 한다.

3. `react-hot-toast`도 서버 컴포넌트에서 사용할 수 없다. 위의 wrapper에 추가하는 방식으로 해결한다.

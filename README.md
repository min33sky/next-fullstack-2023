# Next-Fullstack

> Next.js version 13 Fire!! 🔥

## Note

1. 서버 컴포넌트를 layout에 넣을 때 타입 에러가 뜬다. 해결법은 다음 코드를 핸더링할 컴포넌트 위에 넣어라

```ts
{
  /* @ts-expect-error Server Component */
}
<서버컴포넌트 />;
```

'use client';

import { signIn } from 'next-auth/react';

/**
 * 로그인 버튼
 */
export default function Login() {
  return (
    <li>
      <button
        className="rounded-md bg-slate-400 px-4 py-2 text-sm text-slate-800"
        title="Sign in with Google"
        onClick={() => signIn()}
      >
        Sign In
      </button>
    </li>
  );
}

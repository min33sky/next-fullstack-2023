'use client';

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

interface Props {
  image?: string | null;
}

export default function Logged({ image }: Props) {
  return (
    <li className="flex items-center gap-8">
      <button
        className="rounded-md bg-gray-700 px-6 py-2 text-sm text-white"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
      <Link href={'/dashboard'}>
        {image ? (
          <Image
            width={64}
            height={64}
            src={image}
            alt="avatar"
            className="w-14 rounded-full"
            priority
          />
        ) : null}
      </Link>
    </li>
  );
}

'use client';

import React, { useState } from 'react';

/**
 * 포스트 작성 폼
 */
export default function AddPost() {
  const [title, setTitle] = useState('');
  const [disabled, setDisabled] = useState(false);

  return (
    <form
      onSubmit={() => alert('준비중....')}
      className="my-8 rounded-md bg-slate-50 p-8"
    >
      <div className="my-4 flex flex-col">
        <textarea
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="h-24 w-full resize-none rounded-md border border-gray-300 p-4 text-gray-500 outline-none"
          placeholder="what's on your mind?"
        />
      </div>

      <footer className="flex items-center justify-between">
        <p
          className={`text-sm font-bold ${
            title.length > 300 ? 'text-red-700' : 'text-gray-500'
          }`}
        >
          {title.length} / 300
        </p>
        <button
          aria-label="Button to create a post"
          disabled={disabled}
          title={disabled ? 'Please wait...' : 'Create Post'}
          className="rounded-xl bg-teal-600 py-2 px-6 text-sm text-white transition-colors hover:bg-teal-700 disabled:opacity-25"
        >
          Create Post
        </button>
      </footer>
    </form>
  );
}

import React from 'react';
import Image from 'next/image';

const TELEGRAM_LINK = 'https://t.me/+4Hga6q5-Rlk5MDE0';

export default function HoldPage() {
  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-2xl bg-white/10 text-white">
          <Image
            src="/icptokens-logo-white.svg"
            width={60}
            height={60}
            alt="ICP Tokens"
            priority
          />
        </div>

        <h1 className="text-2xl font-semibold tracking-tight sm:text-4xl">
          <span className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 align-middle">
            <span className="inline-flex items-center gap-3">
              <span>ICP Tokens</span>
            </span>
            <span>is currently on hold.</span>
          </span>
        </h1>

        <p className="mt-4 text-sm leading-6 text-gray-300 sm:text-base">
          We’re not actively developing due to team and funding limitations.
          Open to collaborations and opportunities.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-primary/30 transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg"
          >
            Reach out
          </a>
        </div>
      </div>
    </div>
  );
}

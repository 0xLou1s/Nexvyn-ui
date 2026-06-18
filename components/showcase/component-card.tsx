'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { ComponentItem } from '@/lib/components-registry'
import { getComponentHref } from '@/lib/components-registry'

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M12 2.5L13.4 10.1L21 11.5L13.4 12.9L12 20.5L10.6 12.9L3 11.5L10.6 10.1L12 2.5Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ComponentCard({ item }: { item: ComponentItem }) {
  return (
    <Link href={getComponentHref(item.id)} className="block">
      <div
        className={cn(
          'relative w-full rounded-2xl p-1',
          'shadow-[0_12px_42px_rgba(0,0,0,0.09)]',
        )}
        style={{ backgroundColor: 'var(--color-bg)' }}
      >
        <div className="relative aspect-square overflow-hidden rounded-xl bg-[#3a3a3a]">
          <SparkleIcon className="pointer-events-none absolute bottom-[26%] right-[18%] text-white/85" />
        </div>

        <div
          className="absolute left-0 top-0 z-10 px-5 py-3 text-[15px] font-medium leading-none rounded-br-2xl rounded-tl-2xl"
          style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-fg)' }}
        >
          {item.collection}
        </div>

        <div
          className="absolute bottom-0 right-0 z-10 px-5 py-3 text-[15px] font-medium leading-none rounded-br-2xl rounded-tl-2xl"
          style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-fg)' }}
        >
          {item.name}
        </div>
      </div>
    </Link>
  )
}

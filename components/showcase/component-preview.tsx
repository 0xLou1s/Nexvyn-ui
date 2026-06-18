'use client'

import { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import type { ComponentItem } from '@/lib/components-registry'

const BounceSidebar = dynamic(
  () => import('@/components/ui/bounce-sidebar').then((m) => m.BounceSidebar),
  { ssr: false },
)

function LivePreview({ item }: { item: ComponentItem }) {
  switch (item.id) {
    case 'bounce-sidebar':
      return (
        <div className="flex size-full items-center justify-center p-4">
          <BounceSidebar items={["Dashboard", "Analytics", "Projects", "Team", "Messages"]} defaultValue={0} className="w-36" />
        </div>
      )
    default:
      return null
  }
}

function MediaPreview({ thumbnail, videoSrc }: { thumbnail: string; videoSrc: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hovered, setHovered] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (hovered && videoRef.current) {
      videoRef.current.play().catch(() => {})
    } else if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [hovered])

  return (
    <div
      className="size-full relative overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {thumbnail && !loaded && (
        <img src={thumbnail} alt="" className="size-full object-cover" />
      )}
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          className="size-full object-cover"
          muted
          loop
          playsInline
          onLoadedData={() => setLoaded(true)}
        />
      )}
    </div>
  )
}

export function ComponentPreview({ item }: { item: ComponentItem }) {
  if (item.videoSrc && item.thumbnail) {
    return <MediaPreview thumbnail={item.thumbnail} videoSrc={item.videoSrc} />
  }

  if (item.preview?.endsWith('.mp4')) {
    return (
      <video
        className="size-full object-cover"
        src={item.preview}
        autoPlay
        loop
        playsInline
        muted
      />
    )
  }

  switch (item.previewType) {
    case 'icons':
      return (
        <div className="grid size-full grid-cols-5 gap-1.5 bg-neutral-100 p-3">
          {['🧑', '🌸', '☀️', '🍷', '🐤', '🐤', '🍞', '⭐', '🐟', '🐸', '🐤', '🐻', '🗑️', '🏠', '🍬', '☕', '🍬', '🍺', '🎁', '🍟'].map((icon, index) => (
            <div
              key={index}
              className="flex aspect-square items-center justify-center rounded-md bg-white text-base shadow-sm"
            >
              {icon}
            </div>
          ))}
        </div>
      )
    case 'pixels':
      return (
        <div className="relative size-full bg-neutral-950">
          {Array.from({ length: 24 }).map((_, index) => (
            <span
              key={index}
              className="absolute size-2 rounded-[1px] bg-white/70"
              style={{
                left: `${12 + (index % 6) * 14}%`,
                top: `${18 + Math.floor(index / 6) * 18}%`,
                opacity: 0.3 + (index % 5) * 0.12,
              }}
            />
          ))}
        </div>
      )
    case 'toggle':
      return (
        <div className="flex size-full items-center justify-center bg-neutral-100">
          <div className="flex h-8 w-14 items-center rounded-full bg-neutral-900 px-1">
            <div className="size-6 rounded-full bg-white shadow-sm" />
          </div>
        </div>
      )
    default:
      return (
        <div className="flex size-full flex-col items-center justify-center gap-2 bg-neutral-100 p-4">
          <LivePreview item={item} />
          {!['bounce-sidebar'].includes(item.id) && (
            <>
              <div className="h-1 w-10 rounded-full bg-sky-500" />
              <p className="text-center text-[10px] font-medium text-neutral-500">{item.name}</p>
            </>
          )}
        </div>
      )
  }
}

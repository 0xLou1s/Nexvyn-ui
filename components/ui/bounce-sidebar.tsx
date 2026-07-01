"use client"

import { useEffect, useRef, useState } from "react"
import {
  motion,
  useAnimate,
  useMotionValue,
  useReducedMotion,
  type Transition,
} from "motion/react"
import { cn } from "@/lib/utils"

const EASE_OUT = [0.23, 1, 0.32, 1] as const

export type BounceSidebarProps = {
  items: string[]
  value?: number
  defaultValue?: number
  onChange?: (index: number) => void
  dotColor?: string
  className?: string
}

const itemClass = (active: boolean) =>
  cn(
    "flex w-full cursor-pointer items-center p-1 text-left text-sm transition-colors duration-200",
    active ? "text-foreground" : "text-foreground/55",
  )

export function BounceSidebar({
  items,
  value,
  defaultValue = 0,
  onChange,
  dotColor = "var(--color-accent)",
  className,
}: BounceSidebarProps) {
  const [internalIndex, setInternalIndex] = useState(defaultValue)
  const activeIndex = value !== undefined ? value : internalIndex

  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [dot, animate] = useAnimate<HTMLSpanElement>()
  const prevY = useMotionValue(0)
  const prefersReduced = useReducedMotion()

  const handleChange = (index: number) => {
    if (value === undefined) setInternalIndex(index)
    onChange?.(index)
  }

  useEffect(() => {
    const el = itemRefs.current[activeIndex]
    if (!el || !dot.current) return

    const containerRect = containerRef.current?.getBoundingClientRect()
    const itemRect = el.getBoundingClientRect()
    if (!containerRect) return

    const toY = el.offsetTop + el.offsetHeight / 2 - 3

    if (prevY.get() === 0) {
      animate(dot.current, { x: 0, y: toY }, { duration: 0 })
      prevY.set(toY)
      return
    }

    const fromY = prevY.get()
    const delta = toY - fromY
    prevY.set(toY)

    if (delta === 0) return

    if (prefersReduced) {
      animate(dot.current, { x: 0, y: toY }, { duration: 0 })
      return
    }

    const radius = Math.min(Math.abs(delta) / 2, 8)
    const steps = 20
    const x: number[] = []
    const y: number[] = []
    for (let i = 0; i <= steps; i++) {
      const t = i / steps
      y.push(fromY + (delta * (1 - Math.cos(Math.PI * t))) / 2)
      x.push(-radius * Math.sin(Math.PI * t))
    }

    animate(dot.current, { x, y }, { duration: 0.3, ease: "easeOut" })
  }, [activeIndex, animate, dot, prefersReduced, prevY])

  return (
    <div ref={containerRef} className={cn("relative flex flex-col gap-1", className)}>
      <span
        ref={dot}
        aria-hidden
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: dotColor }}
      />
      {items.map((item, index) => {
        const isActive = index === activeIndex
        return (
          <button
            key={item}
            ref={(el) => { itemRefs.current[index] = el }}
            type="button"
            onClick={() => handleChange(index)}
            className={itemClass(isActive)}
          >
            {item}
          </button>
        )
      })}
    </div>
  )
}

export function BounceSidebarPreview() {
  return (
    <BounceSidebar
      items={["Dashboard", "Analytics", "Projects", "Team", "Messages"]}
      defaultValue={0}
      className="w-36"
    />
  )
}

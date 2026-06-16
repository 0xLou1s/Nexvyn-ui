'use client'

import { useState, useEffect } from 'react'

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

export function useScreenSize() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    setWidth(window.innerWidth)
    const handler = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return {
    width,
    lessThan: (bp: keyof typeof breakpoints) => width > 0 && width < breakpoints[bp],
    greaterThanOrEqual: (bp: keyof typeof breakpoints) => width >= breakpoints[bp],
  }
}

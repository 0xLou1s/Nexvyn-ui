'use client'

import { useState, useEffect, useCallback, RefObject } from 'react'

export function useDimensions(ref: RefObject<HTMLElement | null>) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const update = useCallback(() => {
    if (ref.current) {
      const { width, height } = ref.current.getBoundingClientRect()
      setDimensions({ width, height })
    }
  }, [ref])

  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [update])

  return dimensions
}

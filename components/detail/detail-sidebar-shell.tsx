'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { DescriptionPanel } from './description-panel'
import { PreviewControlProvider } from './preview-controls'

const INFO_SPACE = 576

export default function DetailSidebarShell({
  children,
}: {
  children: React.ReactNode
}) {
  const [infoOpen, setInfoOpen] = useState(false)

  return (
    <PreviewControlProvider>
      <div className="detail-page relative h-full font-sans">
        <DescriptionPanel open={infoOpen} setOpen={setInfoOpen} />

        <motion.div
          initial={false}
          animate={{
            paddingRight: infoOpen ? INFO_SPACE : 0,
          }}
          transition={{ type: 'spring', stiffness: 280, damping: 32 }}
          className="h-full"
        >
          <div className="detail-preview-card relative z-0 h-full rounded-[45px] p-4">
            {children}
          </div>
        </motion.div>
      </div>
    </PreviewControlProvider>
  )
}

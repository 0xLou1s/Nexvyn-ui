'use client'

import { Sidebar } from '@/components/detail/sidebar'
import { SidebarProvider } from '@/components/detail/sidebar-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar />
      {children}
    </SidebarProvider>
  )
}

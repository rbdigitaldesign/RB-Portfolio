import type { ReactNode } from 'react'

export function CaseStudyLayout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-12 md:py-20">
      {children}
    </div>
  )
}

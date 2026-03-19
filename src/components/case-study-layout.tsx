import type { ReactNode } from 'react'
import { CaseStudyEdgeNav } from './case-study-edge-nav'

/**
 * CaseStudyLayout — shared wrapper for all individual project case study pages.
 * Includes CaseStudyEdgeNav which provides subtle side-band prev/next navigation
 * on desktop (lg+) for all case studies in the canonical order.
 */
export function CaseStudyLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <CaseStudyEdgeNav />
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-12 md:py-20">
        {children}
      </div>
    </>
  )
}

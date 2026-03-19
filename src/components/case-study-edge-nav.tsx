'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { CASE_STUDY_ORDER } from '@/data/case-study-order'
import { cn } from '@/lib/utils'

/**
 * CaseStudyEdgeNav — subtle fixed side-band navigation for all case study pages.
 *
 * Reads the current URL slug, looks up the canonical case study order,
 * and renders two thin edge panels that expand on hover to reveal the
 * adjacent project title. Click navigates.
 *
 * Visible only on lg+ screens. Mobile relies on ProjectNavigation.
 */
export function CaseStudyEdgeNav() {
  const pathname = usePathname()
  const router = useRouter()

  const slug = pathname?.split('/').at(-1) ?? ''
  const idx = CASE_STUDY_ORDER.findIndex((p) => p.slug === slug)

  const prev = idx > 0 ? CASE_STUDY_ORDER[idx - 1] : null
  const next = idx < CASE_STUDY_ORDER.length - 1 ? CASE_STUDY_ORDER[idx + 1] : null

  const [leftHover, setLeftHover] = useState(false)
  const [rightHover, setRightHover] = useState(false)

  // Not a managed case study — render nothing
  if (idx === -1) return null
  // No neighbours — nothing to show
  if (!prev && !next) return null

  return (
    <>
      {/* ── LEFT PANEL (Previous) ──────────────────────────────────── */}
      {prev && (
        <div
          className="hidden lg:flex fixed left-0 z-50 items-center"
          style={{ top: '30%', height: '40vh' }}
        >
          <div
            className={cn(
              'relative h-full flex items-center overflow-hidden cursor-pointer select-none',
              'transition-[width,box-shadow,background-color] duration-300 ease-out',
              leftHover
                ? 'w-[220px] bg-card/95 backdrop-blur-md shadow-2xl border-r border-y border-border rounded-r-2xl'
                : 'w-[14px] bg-transparent'
            )}
            onMouseEnter={() => setLeftHover(true)}
            onMouseLeave={() => setLeftHover(false)}
            onClick={() => router.push(`/projects/${prev.slug}`)}
            role="button"
            aria-label={`Previous: ${prev.title}`}
          >
            {/* Accent hint strip — visible when collapsed */}
            <div
              className={cn(
                'absolute left-[5px] w-[3px] h-2/3 rounded-full',
                'bg-accent/35 transition-opacity duration-200',
                leftHover ? 'opacity-0' : 'opacity-100'
              )}
            />
            {/* Expanded content */}
            <div
              className={cn(
                'pl-5 pr-4 py-4 transition-opacity duration-[200ms]',
                leftHover ? 'opacity-100 delay-150' : 'opacity-0 pointer-events-none'
              )}
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground mb-2 whitespace-nowrap">
                ‹ Previous
              </p>
              <p className="text-sm font-headline font-semibold leading-snug text-foreground w-[170px]">
                {prev.title}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── RIGHT PANEL (Next) ────────────────────────────────────── */}
      {next && (
        <div
          className="hidden lg:flex fixed right-0 z-50 items-center justify-end"
          style={{ top: '30%', height: '40vh' }}
        >
          <div
            className={cn(
              'relative h-full flex items-center justify-end overflow-hidden cursor-pointer select-none',
              'transition-[width,box-shadow,background-color] duration-300 ease-out',
              rightHover
                ? 'w-[220px] bg-card/95 backdrop-blur-md shadow-2xl border-l border-y border-border rounded-l-2xl'
                : 'w-[14px] bg-transparent'
            )}
            onMouseEnter={() => setRightHover(true)}
            onMouseLeave={() => setRightHover(false)}
            onClick={() => router.push(`/projects/${next.slug}`)}
            role="button"
            aria-label={`Next: ${next.title}`}
          >
            {/* Accent hint strip */}
            <div
              className={cn(
                'absolute right-[5px] w-[3px] h-2/3 rounded-full',
                'bg-accent/35 transition-opacity duration-200',
                rightHover ? 'opacity-0' : 'opacity-100'
              )}
            />
            {/* Expanded content */}
            <div
              className={cn(
                'pl-4 pr-5 py-4 text-right transition-opacity duration-[200ms]',
                rightHover ? 'opacity-100 delay-150' : 'opacity-0 pointer-events-none'
              )}
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground mb-2 whitespace-nowrap">
                Next ›
              </p>
              <p className="text-sm font-headline font-semibold leading-snug text-foreground w-[170px] ml-auto">
                {next.title}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

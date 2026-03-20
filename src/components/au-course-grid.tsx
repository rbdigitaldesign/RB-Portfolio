'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Maximize2, Camera } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import {
  COURSES,
  DISCIPLINES,
  type CourseEntry,
  type Discipline,
} from '@/data/au-course-development-data'

// ---------------------------------------------------------------------------
// AU brand colour config per discipline
// Bright Blue  #1448FF  AI & Computing
// N.T. Purple  #836BFF  Sciences & Engineering
// Teal         #0D9488  Health & Life Sciences (complementary — AU palette has no green)
// Dark Blue    #140F50  Humanities, Law & Business (with purple accent)
// ---------------------------------------------------------------------------

type DiscConfig = {
  gradient: string   // CSS gradient for tile background (used when no coverImage)
  overlay: string    // Tailwind overlay class when a coverImage is present
  dot: string        // Tailwind class for the discipline dot
  badge: string      // Tailwind classes for the discipline badge on the tile
  badgeLight: string // Light badge used inside the modal header area
}

const DISC_CONFIG: Record<Discipline, DiscConfig> = {
  'AI & Computing': {
    gradient: 'linear-gradient(135deg, #1448FF 0%, #140F50 100%)',
    overlay:  'bg-[#1448FF]/65',
    dot:      'bg-[#1448FF]',
    badge:    'bg-[#1448FF]/30 text-white backdrop-blur-sm',
    badgeLight: 'bg-[#1448FF]/15 text-[#1448FF] dark:text-blue-300',
  },
  'Sciences & Engineering': {
    gradient: 'linear-gradient(135deg, #836BFF 0%, #140F50 100%)',
    overlay:  'bg-[#836BFF]/65',
    dot:      'bg-[#836BFF]',
    badge:    'bg-[#836BFF]/30 text-white backdrop-blur-sm',
    badgeLight: 'bg-[#836BFF]/15 text-[#836BFF] dark:text-violet-300',
  },
  'Health & Life Sciences': {
    gradient: 'linear-gradient(135deg, #0D9488 0%, #140F50 100%)',
    overlay:  'bg-teal-700/65',
    dot:      'bg-teal-400',
    badge:    'bg-teal-700/30 text-white backdrop-blur-sm',
    badgeLight: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
  },
  'Humanities, Law & Business': {
    gradient: 'linear-gradient(135deg, #836BFF 0%, #140F50 100%)',
    overlay:  'bg-[#140F50]/75',
    dot:      'bg-[#836BFF]',
    badge:    'bg-[#140F50]/50 text-white backdrop-blur-sm',
    badgeLight: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  },
}

const DISC_LABEL_STYLES: Record<Discipline, string> = {
  'AI & Computing':             'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  'Sciences & Engineering':     'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300',
  'Health & Life Sciences':     'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
  'Humanities, Law & Business': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
}

// ---------------------------------------------------------------------------
// Tile
// ---------------------------------------------------------------------------

function CourseTile({
  course,
  onClick,
}: {
  course: CourseEntry
  onClick: () => void
}) {
  const cfg = DISC_CONFIG[course.discipline]
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative overflow-hidden rounded-xl aspect-[16/9] flex flex-col justify-end w-full text-left
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
                 shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      {/* Background: image or brand gradient */}
      {course.coverImage ? (
        <>
          <Image
            src={course.coverImage}
            alt={course.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Colour overlay over image */}
          <div
            className={`absolute inset-0 ${cfg.overlay} transition-opacity duration-300 group-hover:opacity-80`}
          />
        </>
      ) : (
        <div
          className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]"
          style={{ background: cfg.gradient }}
        />
      )}

      {/* Subtle noise texture for depth */}
      <div className="absolute inset-0 opacity-[0.06] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />

      {/* Bottom content */}
      <div className="relative z-10 p-3 flex items-end justify-between gap-2">
        <div className="flex-1 min-w-0">
          <span
            className={`inline-flex items-center gap-1.5 text-[10px] font-semibold mb-1.5 px-2 py-0.5 rounded-full ${cfg.badge}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
            {course.discipline}
          </span>
          {course.instructors && (
            <p className="text-[10px] text-white/70 mb-0.5 truncate">{course.instructors}</p>
          )}
          <h4 className="font-bold text-white text-sm leading-snug drop-shadow-sm line-clamp-2">
            {course.name}
          </h4>
        </div>
        <Maximize2
          size={14}
          className="text-white/60 flex-shrink-0 self-end mb-0.5 group-hover:text-white transition-colors"
        />
      </div>
    </button>
  )
}

// ---------------------------------------------------------------------------
// Modal
// ---------------------------------------------------------------------------

const IMAGE_SLOTS = 4

function CourseModal({
  course,
  onClose,
}: {
  course: CourseEntry | null
  onClose: () => void
}) {
  if (!course) return null
  const cfg = DISC_CONFIG[course.discipline]

  return (
    <Dialog open={!!course} onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent className="max-w-4xl w-full max-h-[92vh] overflow-y-auto p-0 gap-0">

        {/* Gradient header */}
        <div className="px-6 pt-8 pb-6" style={{ background: cfg.gradient }}>
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-semibold mb-3 px-2.5 py-1 rounded-full ${cfg.badge}`}
          >
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${cfg.dot}`} />
            {course.discipline}
          </span>
          {course.instructors && (
            <p className="text-sm text-white/70 mb-1">{course.instructors}</p>
          )}
          <h2 className="font-headline font-bold text-2xl md:text-3xl text-white leading-snug">
            {course.name}
          </h2>
        </div>

        <div className="p-6 space-y-8">

          {/* Key Activities */}
          <section>
            <h3 className="font-headline font-semibold text-lg mb-3 flex items-center gap-2">
              Key Activities
            </h3>
            {course.notes && (
              <p className="text-sm text-muted-foreground italic mb-3 border-l-2 border-accent pl-3">
                {course.notes}
              </p>
            )}
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-foreground/80 leading-relaxed">
              {course.activities.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </section>

          {/* CLOs — placeholder */}
          <section>
            <h3 className="font-headline font-semibold text-lg mb-3">Course Learning Outcomes</h3>
            <div className="rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/30 p-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                Coming soon
              </p>
              <p className="text-sm text-muted-foreground italic">
                Course Learning Outcomes (CLOs) will be added here
              </p>
            </div>
          </section>

          {/* Assessments — placeholder */}
          <section>
            <h3 className="font-headline font-semibold text-lg mb-3">Assessments</h3>
            <div className="rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/30 p-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                Coming soon
              </p>
              <p className="text-sm text-muted-foreground italic">
                Assessment details and rubric highlights will be added here
              </p>
            </div>
          </section>

          {/* Screenshots — placeholder grid */}
          <section>
            <h3 className="font-headline font-semibold text-lg mb-3">Screenshots &amp; Media</h3>
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: IMAGE_SLOTS }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-video rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/30
                             flex flex-col items-center justify-center gap-2"
                >
                  <Camera className="w-7 h-7 text-muted-foreground/40" />
                  <p className="text-xs text-muted-foreground italic">Image {i + 1}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </DialogContent>
    </Dialog>
  )
}

// ---------------------------------------------------------------------------
// Grid (exported)
// ---------------------------------------------------------------------------

export function AuCourseGrid() {
  const [selected, setSelected] = useState<CourseEntry | null>(null)

  return (
    <>
      {/* Discipline legend */}
      <div className="flex flex-wrap gap-3 mb-6 px-3 py-3 bg-muted/50 rounded-lg">
        {(Object.keys(DISC_CONFIG) as Discipline[]).map((disc) => (
          <div key={disc} className="flex items-center gap-2 text-xs font-medium">
            <span
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ background: DISC_CONFIG[disc].gradient }}
            />
            {disc}
          </div>
        ))}
      </div>

      {/* Course groups */}
      {DISCIPLINES.map((discipline) => {
        const courses = COURSES.filter((c) => c.discipline === discipline)
        if (courses.length === 0) return null
        return (
          <div key={discipline} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="font-headline font-semibold text-xl leading-snug mb-0">{discipline}</h3>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${DISC_LABEL_STYLES[discipline]}`}>
                {courses.length} course{courses.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {courses.map((course) => (
                <CourseTile
                  key={course.name}
                  course={course}
                  onClick={() => setSelected(course)}
                />
              ))}
            </div>
          </div>
        )
      })}

      <CourseModal course={selected} onClose={() => setSelected(null)} />
    </>
  )
}

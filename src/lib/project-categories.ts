import type { ProjectCategory } from './types';

export const CATEGORY_COLORS: Record<
  ProjectCategory,
  { badge: string; border: string; bg: string; text: string; icon: string }
> = {
  'User Experience': {
    badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-800',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    text: 'text-blue-700 dark:text-blue-300',
    icon: '🎨',
  },
  'Learning Design': {
    badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
    border: 'border-emerald-200 dark:border-emerald-800',
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    text: 'text-emerald-700 dark:text-emerald-300',
    icon: '📚',
  },
  'Hackathons': {
    badge: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
    border: 'border-orange-200 dark:border-orange-800',
    bg: 'bg-orange-50 dark:bg-orange-950/30',
    text: 'text-orange-700 dark:text-orange-300',
    icon: '⚡',
  },
  'Coding Projects': {
    badge: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-800',
    bg: 'bg-purple-50 dark:bg-purple-950/30',
    text: 'text-purple-700 dark:text-purple-300',
    icon: '💻',
  },
  'Publications': {
    badge: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300',
    border: 'border-rose-200 dark:border-rose-800',
    bg: 'bg-rose-50 dark:bg-rose-950/30',
    text: 'text-rose-700 dark:text-rose-300',
    icon: '📄',
  },
};

/** Labels for the main sections on a project detail page, keyed by category. */
export const CATEGORY_SECTIONS: Record<
  ProjectCategory,
  { overview: string; problem: string; process: string; outcomes: string }
> = {
  'User Experience': {
    overview: 'Project Overview',
    problem: 'The Problem / Brief',
    process: 'Research & Process',
    outcomes: 'Outcomes & Impact',
  },
  'Learning Design': {
    overview: 'Context & Background',
    problem: 'Learning Challenge',
    process: 'Design Approach',
    outcomes: 'Learning Impact',
  },
  'Hackathons': {
    overview: 'The Brief',
    problem: 'Challenge Statement',
    process: 'Our Approach',
    outcomes: 'What We Built',
  },
  'Coding Projects': {
    overview: 'Project Overview',
    problem: 'The Problem',
    process: 'How It Works',
    outcomes: 'Results & Learnings',
  },
  'Publications': {
    overview: 'Abstract',
    problem: 'Research Question',
    process: 'Methodology',
    outcomes: 'Findings & Contributions',
  },
};

export const ALL_CATEGORIES: ProjectCategory[] = [
  'User Experience',
  'Learning Design',
  'Hackathons',
  'Coding Projects',
  'Publications',
];

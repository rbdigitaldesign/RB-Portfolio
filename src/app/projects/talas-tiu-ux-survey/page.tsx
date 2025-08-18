
import { redirect } from 'next/navigation';

// Redirect to the new, canonical URL for this case study.
export default function TalasTiuUxSurveyPage() {
  redirect('/projects/ux-survey-2025');
}

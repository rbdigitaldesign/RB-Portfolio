
import { redirect } from 'next/navigation';

// Redirect to the new, canonical URL for this case study.
export default function PersonalDevelopmentProjectPage() {
  redirect('/projects/ppd-course-design');
}

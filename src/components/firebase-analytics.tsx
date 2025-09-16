
'use client';

import { useEffect } from 'react';
import { analytics } from '@/lib/firebase/client';

export default function FirebaseAnalytics() {
  useEffect(() => {
    // This effect will run once on component mount, which is sufficient
    // to initialize analytics for the user's session.
    analytics.then(fbAnalytics => {
      if (fbAnalytics) {
        console.log('Firebase Analytics initialized');
        // You can log events here if needed, for example:
        // logEvent(fbAnalytics, 'page_view', { page_path: window.location.pathname });
      }
    });
  }, []);

  return null;
}

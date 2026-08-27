import { useEffect } from 'react';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../lib/firebase';

export function useSectionTracking() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (sectionId) {
              const analyticsInstance = await analytics;
              if (analyticsInstance) {
                logEvent(analyticsInstance, 'section_view', {
                  section_id: sectionId
                });
              }
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);
}

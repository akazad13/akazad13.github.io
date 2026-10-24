import { useEffect, useState } from 'react';

/** Returns the id of the section currently under the top third of the viewport. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-30% 0px -65% 0px' },
    );

    elements.forEach((el) => observer.observe(el));

    // Clear the highlight when scrolled back above the first section.
    const onScroll = () => {
      if (elements[0] && window.scrollY < elements[0].offsetTop - window.innerHeight * 0.3) {
        setActive('');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [ids]);

  return active;
}

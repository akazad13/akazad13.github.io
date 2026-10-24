import { useCallback, useEffect, useState } from 'react';
import { portfolio } from './data/portfolio';
import { useActiveSection } from './hooks/useActiveSection';
import { useTheme } from './hooks/useTheme';
import { Header, NavItem } from './components/Header';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Writing } from './components/Writing';
import { Background } from './components/Background';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeView } from './components/ResumeView';

const nav: NavItem[] = [
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'writing', label: 'Writing' },
  { id: 'background', label: 'Background' },
  { id: 'contact', label: 'Contact' },
];
const sectionIds = nav.map((item) => item.id);

const yearsSince = (iso: string) =>
  Math.floor((Date.now() - new Date(iso).getTime()) / (365.25 * 24 * 60 * 60 * 1000));

export default function App() {
  const { theme, toggle } = useTheme();
  const active = useActiveSection(sectionIds);
  const years = yearsSince(portfolio.profile.careerStart);

  // The resume has its own URL (#resume) so it can be linked directly.
  const [resumeOpen, setResumeOpen] = useState(() => window.location.hash === '#resume');

  const openResume = useCallback(() => {
    history.pushState(null, '', '#resume');
    setResumeOpen(true);
  }, []);

  const closeResume = useCallback(() => {
    if (window.location.hash === '#resume') {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    setResumeOpen(false);
  }, []);

  useEffect(() => {
    const onHash = () => setResumeOpen(window.location.hash === '#resume');
    window.addEventListener('popstate', onHash);
    window.addEventListener('hashchange', onHash);
    return () => {
      window.removeEventListener('popstate', onHash);
      window.removeEventListener('hashchange', onHash);
    };
  }, []);

  return (
    <>
      <div className="site">
        <a
          href="#main"
          className="sr-only z-50 rounded-lg bg-accent px-4 py-2 text-accent-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Header
          name={portfolio.profile.name}
          nav={nav}
          active={active}
          theme={theme}
          onToggleTheme={toggle}
          onOpenResume={openResume}
        />
        <main id="main">
          <Hero profile={portfolio.profile} years={years} onOpenResume={openResume} />
          <Experience employers={portfolio.experience} years={years} />
          <Projects projects={portfolio.projects} />
          <Skills groups={portfolio.skills} />
          <Writing writing={portfolio.writing} blogUrl={portfolio.profile.blogUrl} />
          <Background background={portfolio.background} />
          <Contact profile={portfolio.profile} />
        </main>
        <Footer name={portfolio.profile.name} />
      </div>

      {resumeOpen && <ResumeView portfolio={portfolio} years={years} onClose={closeResume} />}
    </>
  );
}

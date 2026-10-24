import type { IconName } from '../components/Icons';

export interface Profile {
  name: string;
  role: string;
  company: string;
  location: string;
  timezone: string;
  /** The hero statement: what you do, in one sentence. */
  headline: string;
  summary: string;
  photo: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  blogUrl: string;
  /** ISO date of your first professional role; years of experience is derived from it. */
  careerStart: string;
  /** Shows an "open to roles" line in the hero and contact section. */
  openToWork: boolean;
  openToWorkText: string;
  /** Short list shown next to the hero: what you are doing right now. */
  now: { icon: IconName; text: string }[];
}

export interface RoleGroup {
  title: string;
  highlights: string[];
}

export interface Role {
  title: string;
  /** ISO start date; drives the career path chart. */
  start: string;
  /** ISO end date; omit for the current role. */
  end?: string;
  /** Short label for the career path chart, such as "Led 5 developers". */
  scope: string;
  period: string;
  setting: string;
  current?: boolean;
  highlights: string[];
  groups?: RoleGroup[];
  tech: string[];
}

export interface Employer {
  company: string;
  url?: string;
  about: string;
  roles: Role[];
}

export type ProjectKind = 'architecture' | 'product' | 'toolkit';

export interface Project {
  name: string;
  summary: string;
  /** One line on why the project is worth a look. Shown on featured projects. */
  why?: string;
  tech: string[];
  kind: ProjectKind;
  repoUrl: string;
  liveUrl?: string;
  liveLabel?: string;
  featured?: boolean;
}

export interface SkillGroup {
  name: string;
  icon: IconName;
  items: string[];
}

export interface Publication {
  title: string;
  venue: string;
  year: number;
  authors: string;
  summary: string;
  url: string;
}

export interface Guide {
  title: string;
  summary: string;
  url: string;
  repoUrl: string;
}

export interface Post {
  title: string;
  date: string;
  summary: string;
  url: string;
}

export interface PostSeries {
  title: string;
  date: string;
  summary: string;
  posts: { title: string; url: string }[];
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  note?: string;
}

export interface JudgeProfile {
  name: string;
  solved: number;
  url: string;
}

export interface Portfolio {
  profile: Profile;
  experience: Employer[];
  projects: Project[];
  skills: SkillGroup[];
  writing: {
    publication: Publication;
    guides: Guide[];
    posts: Post[];
    series: PostSeries[];
  };
  background: {
    education: Education[];
    honors: string[];
    training: string[];
    volunteering: string[];
    judges: JudgeProfile[];
  };
}

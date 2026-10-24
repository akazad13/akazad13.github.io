// ===================================================
// NEW types (used by the new portfolio sections)
// ===================================================

// Profile
export interface ProfileInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  shortBio: string;
  location: string;
  avatarUrl?: string;
  status: string;
  statusText: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl?: string;
  websiteUrl: string;
  yearsOfExperience: number;
  completedProjects: number;
  uptimeScore: string;
  githubContributions: number;
}

// Skills
export type SkillCategory =
  | 'languages'
  | 'backend'
  | 'cloud'
  | 'databases'
  | 'frontend'
  | 'architecture';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  level: number;
  years: number;
  highlight?: boolean;
  description: string;
  keywords: string[];
}

// Projects
export interface ProjectMetric {
  label: string;
  value: string;
}

export interface CodeSnippet {
  language: string;
  filename: string;
  code: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: string;
  featured: boolean;
  description: string;
  problemSolved: string;
  architectureDetails: string[];
  techStack: string[];
  metrics: ProjectMetric[];
  githubUrl?: string;
  liveUrl?: string;
  codeSnippet?: CodeSnippet;
}

// Experience
export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  isCurrent?: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
}

// Architecture
export interface ArchNode {
  id: string;
  title: string;
  type: string;
  latency: string;
  description: string;
}

export interface FlowStep {
  step: number;
  from: string;
  to: string;
  label: string;
  protocol: string;
}

export interface ArchStat {
  label: string;
  value: string;
}

export interface ArchitectureDiagram {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  nodes: ArchNode[];
  flowSteps: FlowStep[];
  stats: ArchStat[];
}

// Articles
export interface ArticleItem {
  id: string;
  title: string;
  publication: string;
  date: string;
  readTime: string;
  summary: string;
  tags: string[];
  url: string;
}

// Testimonials
export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarText: string;
  relationship: string;
  quote: string;
}

// Root
export interface PortfolioData {
  profile: ProfileInfo;
  skills: SkillItem[];
  projects: ProjectItem[];
  experiences: ExperienceItem[];
  architectures: ArchitectureDiagram[];
  articles: ArticleItem[];
  testimonials: TestimonialItem[];
}

// ===================================================
// LEGACY types (used by old portfolio components)
// ===================================================
import type { IconName } from '../components/Icons';

export interface Profile {
  name: string;
  role: string;
  company: string;
  location: string;
  timezone: string;
  headline: string;
  summary: string;
  photo: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  blogUrl: string;
  careerStart: string;
  openToWork: boolean;
  openToWorkText: string;
  now: { icon: IconName; text: string }[];
}

export interface RoleGroup {
  title: string;
  highlights: string[];
}

export interface Role {
  title: string;
  start: string;
  end?: string;
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

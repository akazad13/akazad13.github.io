import { Portfolio } from '../types/portfolio';

/*
 * All site content lives in this file. Edit it, then rebuild.
 *
 * NAME_CLIENT: your LinkedIn notes say to confirm you may name the client and its
 * products publicly. Leave this false until you have that confirmation; the site then
 * describes the work without naming them.
 */
const NAME_CLIENT = false;

const client = NAME_CLIENT ? 'Planet DDS' : 'a US dental practice software company';
const practiceServices = NAME_CLIENT ? 'DentalOS services' : 'services for the practice management platform';
const paymentsWork = NAME_CLIENT
  ? 'Planet DDS Pay, Stripe-based embedded payments'
  : 'Stripe-based embedded payments';

const blog = 'https://akazad.dev/blog';

export const portfolio: Portfolio = {
  profile: {
    name: 'Md Abul Kalam',
    role: 'Software Technical Lead',
    company: 'Enosis Solutions',
    location: 'Dhaka, Bangladesh',
    timezone: 'UTC+6',
    headline: 'I lead teams that build healthcare and payment software on .NET, Azure, and React.',
    summary:
      `I'm a hands-on technical lead at Enosis Solutions, working remotely with ${client}. ` +
      'I own requirements, estimation, and code review for a team of seven, design services with architects, and still write a good share of the code.',
    photo: './md-abul-kalam.png',
    email: 'akazad.cse13@gmail.com',
    githubUrl: 'https://github.com/akazad13',
    linkedinUrl: 'https://www.linkedin.com/in/akazadcse13/',
    blogUrl: blog,
    careerStart: '2018-12-01',
    // Your notes say to keep "open to work" visible to recruiters only. Set to true if that changes.
    openToWork: false,
    openToWorkText: 'Open to technical lead and senior engineering roles, remote first.',
    now: [
      { icon: 'team', text: 'Leading a team of seven developers' },
      { icon: 'health', text: `Designing ${NAME_CLIENT ? 'DentalOS' : 'practice management'} services on ASP.NET Core, PostgreSQL, and Azure` },
      { icon: 'payments', text: 'Shaping Stripe embedded payments for multi-office organizations' },
      { icon: 'ai', text: 'Building AI-assisted delivery workflows where engineers own every merge' },
    ],
  },

  experience: [
    {
      company: 'Enosis Solutions',
      url: 'https://www.enosisbd.com/',
      about: `Software services company in Dhaka. Since 2018 I have worked on healthcare SaaS for ${client}, moving from engineer to technical lead.`,
      roles: [
        {
          title: 'Software Technical Lead',
          start: '2023-12-01',
          scope: 'Leads 7 developers',
          period: 'Dec 2023 to present',
          setting: 'Hybrid',
          current: true,
          highlights: [
            'Lead seven developers: requirements analysis, estimation, technical decisions, and code review. Mentor junior engineers and interns.',
            'Drive the migration of large applications from on-premises infrastructure to Azure, designing for scalability and performance.',
            'Own the team\'s code quality standards, enforcing SonarQube quality gates and coaching developers on review findings.',
          ],
          groups: [
            {
              title: 'Product work',
              highlights: [
                `Design ${practiceServices} with architects and cross-functional teams using ASP.NET Core APIs, PostgreSQL, EF Core, Redis, React, Azure, and Zitadel.`,
                `Lead requirements and estimation for ${paymentsWork} across multiple independent offices. Work directly with Stripe engineers on integration design and guide implementation through code review.`,
                'Build agent-driven delivery workflows (Claude Code with Linear and Azure DevOps) for ticket intake, implementation, test generation, and PR pre-review, measured against a delivery baseline with engineers owning every merge.',
              ],
            },
          ],
          tech: ['C#', 'ASP.NET Core', 'Azure', 'PostgreSQL', 'EF Core', 'Redis', 'React', 'Zitadel', 'Stripe'],
        },
        {
          title: 'Senior Software Engineer',
          start: '2020-12-01',
          end: '2023-12-01',
          scope: 'Led a team of 5',
          period: 'Dec 2020 to Nov 2023',
          setting: 'Hybrid',
          highlights: [
            'Led five developers to deliver an ASP.NET Core referral system, owning task planning, sprint activities, and client communication.',
            'Built email and SMS campaign management and real-time chat with SignalR and Twilio.',
            'Introduced async/await patterns across the codebase to improve application responsiveness.',
            'Built a charting data diagnostic tool that helps support responders and developers investigate data defects.',
            'Built a tool that applies multi-file DML changes to local databases, so developers can refresh their environments in one step.',
          ],
          tech: ['ASP.NET Core', 'SignalR', 'Twilio', 'SendGrid', 'SQL Server'],
        },
        {
          title: 'Software Engineer',
          start: '2018-12-01',
          end: '2020-12-01',
          scope: 'Full-stack .NET and Angular',
          period: 'Dec 2018 to Nov 2020',
          setting: 'On-site',
          highlights: [
            'Redesigned and built a hybrid iOS tablet application with Angular, Ionic 4, and .NET Web API.',
            'Migrated legacy ASP.NET Web Forms (VB.NET) features to ASP.NET MVC with onion architecture, including rich text editing.',
            'Built an ASP.NET Core MVC portal where patients review and electronically sign consent documents.',
          ],
          tech: ['ASP.NET MVC', 'Web API', 'Angular', 'Ionic', 'VB.NET'],
        },
      ],
    },
  ],

  projects: [
    {
      name: 'Keystone',
      kind: 'architecture',
      featured: true,
      summary:
        'Reference architecture for a secure web platform: a Backend for Frontend with OpenID Connect through Zitadel, internal token exchange, and Aspire orchestration, deployed to Azure Container Apps.',
      why: 'The same identity stack I design with at work, built in the open.',
      tech: ['.NET 10', 'YARP', 'Zitadel', 'Aspire', 'Redis', 'OpenTelemetry', 'React'],
      repoUrl: 'https://github.com/akazad13/keystone',
    },
    {
      name: 'Shopizy microservices',
      kind: 'architecture',
      featured: true,
      summary:
        'Headless commerce platform split into services with Clean Architecture and Domain-Driven Design, wired together with Dapr and RabbitMQ and orchestrated by .NET Aspire.',
      why: 'Shows how I draw service boundaries and handle events between them.',
      tech: ['.NET 10', 'C# 14', 'DDD', 'Dapr', 'RabbitMQ', 'Aspire'],
      repoUrl: 'https://github.com/akazad13/shopizy-microservice',
    },
    {
      name: 'Order Flow',
      kind: 'architecture',
      featured: true,
      summary:
        'Event-driven order platform built spec-first: Gherkin scenarios drive .NET microservices, contract tests with Pact, and Playwright end-to-end tests.',
      why: 'Spec-driven delivery from acceptance criteria to tested code.',
      tech: ['.NET 10', 'RabbitMQ', 'PostgreSQL', 'Keycloak', 'React', 'Testcontainers'],
      repoUrl: 'https://github.com/akazad13/order-flow',
    },
    {
      name: 'Basachai',
      kind: 'product',
      featured: true,
      summary:
        'Bangla-first rental marketplace MVP with server-rendered Next.js, internationalized routing, and an ASP.NET Core API on PostgreSQL.',
      why: 'A full product, from data model to localized UI and end-to-end tests.',
      tech: ['ASP.NET Core', 'Next.js 15', 'next-intl', 'PostgreSQL 17', 'EF Core', 'Playwright'],
      repoUrl: 'https://github.com/akazad13/basachai',
    },
    {
      name: 'Shopizy API',
      kind: 'architecture',
      summary: 'Online store management API with Clean Architecture: products, categories, carts, orders, and users.',
      tech: ['.NET 10', 'EF Core', 'SQL Server'],
      repoUrl: 'https://github.com/akazad13/shopizy-api',
      liveUrl: 'https://shopizy-api.runasp.net/swagger/index.html',
      liveLabel: 'API docs',
    },
    {
      name: 'Shopizy storefront',
      kind: 'product',
      summary: 'Customer storefront for the Shopizy API, built with standalone Angular components.',
      tech: ['Angular 21', 'TypeScript', 'Tailwind CSS'],
      repoUrl: 'https://github.com/akazad13/shopizy-spa',
      liveUrl: 'https://shopizy.netlify.app',
    },
    {
      name: 'Adda',
      kind: 'product',
      summary: 'Social networking app with real-time chat, a member directory, and role-based administration.',
      tech: ['Angular 21', 'ASP.NET Core 10', 'Identity', 'MySQL'],
      repoUrl: 'https://github.com/akazad13/adda',
      liveUrl: 'https://addaa.alwaysdata.net',
    },
    {
      name: 'Pocket',
      kind: 'product',
      summary: 'Mobile-first personal finance app for expenses and net worth, running on the edge.',
      tech: ['Cloudflare Workers', 'Cloudflare D1', 'Next.js 16', 'React 19'],
      repoUrl: 'https://github.com/akazad13/pocket',
    },
    {
      name: 'Chipai',
      kind: 'product',
      summary: 'Crowdsourced price board for Bangladeshi social commerce sellers.',
      tech: ['Next.js 15', 'React 19', 'Supabase', 'PostgreSQL'],
      repoUrl: 'https://github.com/akazad13/chipai-ashen',
    },
    {
      name: 'SDLC workflow automation',
      kind: 'toolkit',
      summary: 'Agent workflow toolkit that turns a product spec into code, unit to end-to-end tests, and a reviewed pull request.',
      tech: ['Python', 'AI agents', 'GitHub Actions'],
      repoUrl: 'https://github.com/akazad13/sdlc-workflow-automate',
    },
  ],

  skills: [
    {
      name: 'Backend and architecture',
      icon: 'backend',
      items: ['C#', 'ASP.NET Core', 'Web API', 'REST', 'EF Core', 'Dapper', 'async/await', 'Clean and onion architecture', 'Web Forms to MVC modernization'],
    },
    {
      name: 'Frontend',
      icon: 'frontend',
      items: ['TypeScript', 'JavaScript', 'React', 'Angular', 'HTML', 'CSS and SCSS'],
    },
    {
      name: 'Data',
      icon: 'data',
      items: ['SQL Server', 'PostgreSQL', 'Cosmos DB', 'Redis'],
    },
    {
      name: 'Azure',
      icon: 'cloud',
      items: ['App Service', 'Functions', 'Container Apps', 'Service Bus', 'Event Hubs', 'Blob Storage', 'Key Vault', 'Managed Identity', 'Application Insights'],
    },
    {
      name: 'Identity, payments, messaging',
      icon: 'identity',
      items: ['OAuth 2.0 and OIDC', 'Zitadel', 'Stripe', 'SignalR', 'Twilio', 'SendGrid'],
    },
    {
      name: 'Quality and delivery',
      icon: 'delivery',
      items: ['Azure DevOps CI/CD', 'GitHub', 'Docker', 'SonarQube', 'xUnit', 'Testcontainers', 'Claude Code', 'HIPAA-aware development'],
    },
    {
      name: 'Leading teams',
      icon: 'leadership',
      items: ['Requirements analysis', 'Estimation', 'Code review', 'Mentoring', 'Client communication'],
    },
  ],

  writing: {
    publication: {
      title: 'Rotation Independent Digit Recognition in Sign Language',
      venue: 'IEEE ECCE 2019, Chittagong University of Engineering & Technology',
      year: 2019,
      authors: 'Md Abul Kalam, Md Nazrul Islam Mondal, Boshir Ahmed',
      summary:
        'A 10-layer residual convolutional network that recognizes sign language digits at any hand rotation. It reached 97.28% accuracy on 7,000 rotated images, 10.57 points above the previous best result.',
      url: 'https://ieeexplore.ieee.org/document/8679172',
    },
    guides: [
      {
        title: 'System design tutorials',
        summary: 'Distributed systems concepts, architecture blueprints, and case studies.',
        url: 'https://system-design-tutorials.vercel.app',
        repoUrl: 'https://github.com/akazad13/system-design-tutorials',
      },
      {
        title: 'DevOps mastery',
        summary: 'Hands-on guide to CI/CD pipelines, Docker, Kubernetes, and infrastructure automation.',
        url: 'https://devops-mastery-tutorial-eppi.vercel.app',
        repoUrl: 'https://github.com/akazad13/devops-mastery-tutorial',
      },
      {
        title: 'Design patterns in C#',
        summary: 'Creational, structural, and behavioral patterns with runnable .NET 8 examples.',
        url: 'https://github.com/akazad13/csharp-design-patterns',
        repoUrl: 'https://github.com/akazad13/csharp-design-patterns',
      },
    ],
    posts: [],
    series: [],
  },

  background: {
    education: [
      {
        degree: 'Bachelor of Science, Computer Science and Engineering',
        school: 'Rajshahi University of Engineering and Technology (RUET)',
        period: '2014 to 2018',
        note: 'CGPA 3.84 of 4.00, ranked 6th in the department',
      },
    ],
    honors: [
      'Divisional Champion, ACM ICPC Dhaka Regional, 2015',
      'Divisional Champion, NCPC, 2016',
      'Runner-up, CSE Carnival, Varendra Inter-University Programming Contest',
      'Excellent Performance of the Year, Department of CSE, RUET, 2015 and 2016',
    ],
    training: [
      'HIPAA HITECH Privacy for Business Associates, Inspired eLearning',
      'OWASP Top 10 Security Threats (SKF100), Linux Foundation',
    ],
    volunteering: ['Problem setter and judge, Devskill programming contests'],
    judges: [
      { name: 'Codeforces', solved: 471, url: 'https://codeforces.com/profile/Mirror' },
      { name: 'UVa', solved: 295, url: 'https://uhunt.onlinejudge.org/id/549708' },
      { name: 'LightOJ', solved: 215, url: 'https://lightoj.com/user/akazad-cse13' },
      { name: 'LeetCode', solved: 137, url: 'https://leetcode.com/u/akazad13/' },
      { name: 'Toph', solved: 51, url: 'https://toph.co/u/akazad.ruet13' },
      { name: 'HackerRank', solved: 45, url: 'https://www.hackerrank.com/profile/akazad_ruet13' },
    ],
  },
};

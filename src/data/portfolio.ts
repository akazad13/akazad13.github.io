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

  impactMetrics: [
    {
      value: '7+ Devs',
      label: 'Team Leadership',
      detail: 'Mentoring, sprint estimation, code reviews, and quality gates',
      icon: 'team',
    },
    {
      value: '8+ Years',
      label: 'Production Cloud Systems',
      detail: 'Enterprise .NET, Azure microservices, and distributed architecture',
      icon: 'backend',
    },
    {
      value: '99.9%',
      label: 'Service Uptime SLA',
      detail: 'High-availability multi-tenant healthcare SaaS and mission-critical APIs',
      icon: 'zap',
    },
    {
      value: 'HIPAA',
      label: 'Compliant Delivery',
      detail: 'Audit trails, sensitive health data protection, and secure payments',
      icon: 'shield',
    },
  ],

  architectureStudies: [
    {
      id: 'stripe-payments',
      title: 'Multi-Tenant Embedded Payments & Ledgering',
      subtitle: 'Distributed payment reconciliation across independent dental practices',
      domain: 'FinTech / Dental Practice Management',
      challenge:
        'Coordinate credit card and terminal payments across hundreds of independent clinics. Required zero double-charging, strict idempotency, resilient webhook consumption during network blips, and exact ledger reconciliation.',
      solution:
        'Engineered an event-driven architecture using the Transactional Outbox pattern with ASP.NET Core and PostgreSQL. Incoming Stripe webhooks are verified and queued into Azure Service Bus, where idempotent consumers process transactions without distributed locks.',
      flowSteps: [
        {
          step: 1,
          title: 'Terminal / Web Checkout',
          description: 'Client application initiates a payment intent scoped to clinic tenant via Zitadel OIDC.',
          tech: 'React · Zitadel OIDC',
        },
        {
          step: 2,
          title: 'Transactional Outbox Write',
          description: 'ASP.NET Core API persists the pending ledger entry and outbox message in a single database transaction.',
          tech: 'ASP.NET Core · EF Core · PostgreSQL',
        },
        {
          step: 3,
          title: 'Async Event Publishing',
          description: 'A background worker relays outbox records to an Azure Service Bus topic for decoupled fan-out.',
          tech: 'Azure Service Bus · AMQP',
        },
        {
          step: 4,
          title: 'Idempotent Webhook Processing',
          description: 'Stripe webhook listener validates cryptographically signed payloads and safely reconciles the clinic balance.',
          tech: 'Stripe API · Redis Idempotency Key',
        },
      ],
      tradeoffs: [
        {
          decision: 'Transactional Outbox over Two-Phase Commit (2PC)',
          rationale:
            'Avoided distributed locking across external Stripe APIs and internal databases; guarantees at-least-once delivery with zero clinical disruption.',
        },
        {
          decision: 'Dapper for Read Reconciliation vs EF Core for Writes',
          rationale:
            'Utilized EF Core for rich domain validation during writes, while high-throughput end-of-day financial reconciliation runs on optimized Dapper queries.',
        },
      ],
      tech: ['C#', 'ASP.NET Core', 'PostgreSQL', 'EF Core', 'Stripe API', 'Azure Service Bus', 'Redis', 'Zitadel'],
    },
    {
      id: 'azure-migration',
      title: 'Healthcare SaaS Monolith to Azure Cloud Migration',
      subtitle: 'Phased modernization with zero clinical downtime',
      domain: 'Enterprise Cloud Modernization',
      challenge:
        'Modernize large monolithic dental practice management workloads running on on-premises Windows servers into a modern, scalable Azure cloud environment without interrupting daily clinic appointments or risking patient records.',
      solution:
        'Implemented the Strangler Fig migration pattern. Containerized core services into Azure Container Apps and App Services behind Azure Application Gateway, with real-time database replication and Redis distributed caching.',
      flowSteps: [
        {
          step: 1,
          title: 'Edge Routing & WAF',
          description: 'Azure Front Door and Application Gateway route traffic dynamically based on domain route rules.',
          tech: 'Azure Front Door · WAF',
        },
        {
          step: 2,
          title: 'Strangler Fig Extraction',
          description: 'Targeted subdomains (scheduling, patient messaging, billing) broken out into independent microservices.',
          tech: 'Azure Container Apps · Docker',
        },
        {
          step: 3,
          title: 'Distributed Caching Layer',
          description: 'Redis cache absorbs recurring clinic read surges, cutting database load by 60%.',
          tech: 'Azure Cache for Redis',
        },
        {
          step: 4,
          title: 'Managed PostgreSQL & Key Vault',
          description: 'Centralized secret management and automated failover database instances with point-in-time recovery.',
          tech: 'Azure Database for PostgreSQL · Key Vault',
        },
      ],
      tradeoffs: [
        {
          decision: 'Azure Container Apps over Kubernetes (AKS)',
          rationale:
            'Drastically lowered operational overhead and maintenance cost for a 7-person team while retaining microservice scaling and Dapr support.',
        },
        {
          decision: 'Phased Database Cutover with CDC',
          rationale:
            'Dual-write and continuous synchronization allowed emergency rollback with zero clinical data loss.',
        },
      ],
      tech: ['Azure Container Apps', 'App Service', 'PostgreSQL', 'Redis', 'Docker', 'Azure DevOps', 'SonarQube'],
    },
    {
      id: 'clinical-alerts',
      title: 'Real-Time Clinical Communication & Alerting Platform',
      subtitle: 'Sub-second emergency messaging with automated SMS failover',
      domain: 'Urgent Care & Clinical Collaboration',
      challenge:
        'Medical and dental staff require instant, bi-directional communication between operatories and front desk. If an emergency alert is not acknowledged on screen within 60 seconds, it must automatically escalate to SMS/voice without race conditions.',
      solution:
        'Built a real-time messaging hub using ASP.NET Core SignalR with a Redis backplane for horizontal scale. A scheduled background evaluator watches for unread urgent alerts and triggers Twilio delivery pipelines.',
      flowSteps: [
        {
          step: 1,
          title: 'WebSocket Connection',
          description: 'Desktop and tablet clients maintain persistent WebSocket channels to ASP.NET Core SignalR.',
          tech: 'React · WebSockets · SignalR',
        },
        {
          step: 2,
          title: 'Redis Backplane Fan-Out',
          description: 'Messages broadcast instantly across multi-instance App Service nodes without sticky sessions.',
          tech: 'Redis Pub/Sub Backplane',
        },
        {
          step: 3,
          title: 'Low-Latency Feed Storage',
          description: 'Conversation threads stored in Cosmos DB partitioned by clinic ID for predictable sub-10ms response.',
          tech: 'Azure Cosmos DB · Partition Keys',
        },
        {
          step: 4,
          title: 'Escalation Pipeline',
          description: 'Azure Service Bus delayed messages trigger Twilio SMS if urgent clinical notifications are not acknowledged.',
          tech: 'Azure Service Bus · Twilio API',
        },
      ],
      tradeoffs: [
        {
          decision: 'SignalR + Redis over Client Polling',
          rationale:
            'Reduced server load by 85% and achieved sub-150ms operatory notification latency.',
        },
        {
          decision: 'Cosmos DB Partitioning by Clinic',
          rationale:
            'Isolated multi-tenant traffic and guaranteed constant-time reads regardless of overall platform growth.',
        },
      ],
      tech: ['ASP.NET Core', 'SignalR', 'Redis', 'Twilio', 'Cosmos DB', 'Azure Service Bus', 'React'],
    },
  ],

  leadershipPillars: [
    {
      title: 'Pragmatic Architecture & Trade-Offs',
      summary:
        'Architecture is about managing constraints, not chasing hype. I choose battle-tested technologies for core transactional paths while selectively adopting cloud-native innovations where scale delivers real business value.',
      details: [
        'Favors proven relational databases and outbox patterns for financial and clinical records.',
        'Adopted Azure Container Apps to gain microservice flexibility without Kubernetes cluster management overhead.',
        'Structures solutions using Clean and Onion architecture to keep domain business logic decoupled from cloud frameworks.',
      ],
      icon: 'architecture',
    },
    {
      title: 'Quality as a Living Culture',
      summary:
        'Automate what machines do best so engineers can focus on creative problem-solving. I institute automated quality bars so code review discussions center on design, security, and mentorship rather than syntax.',
      details: [
        'Enforced SonarQube quality gates across CI/CD pipelines to catch vulnerabilities and technical debt before merge.',
        'Introduced Testcontainers and automated integration tests for real database & message bus verification.',
        'Set up reproducible coding standards and documentation so new team members onboard in days, not weeks.',
      ],
      icon: 'shield',
    },
    {
      title: 'Developer Velocity & Tooling',
      summary:
        'Great technical leads eliminate friction. I actively identify bottlenecks in local development and build tools that give developers hours back every week.',
      details: [
        'Built an automated single-step DML tool that updates local database environments from multi-file migrations.',
        'Engineered a charting diagnostic tool that helps developers and support staff isolate production data defects in minutes.',
        'Piloted agent-driven delivery workflows (Claude Code with Azure DevOps & Linear) where engineers retain full review ownership.',
      ],
      icon: 'workflow',
    },
    {
      title: 'Empathetic Mentorship & Growth',
      summary:
        'Leading seven developers means growing engineers into confident problem solvers. I cultivate psychological safety where technical questions are welcomed and blameless post-mortems drive improvement.',
      details: [
        'Mentors junior and mid-level engineers through complex sprint estimation, task slicing, and architectural trade-offs.',
        'Conducts constructive, coaching-oriented code reviews that explain the "why" behind recommendations.',
        'Fosters strong team alignment with US client architects and product managers through clear, proactive communication.',
      ],
      icon: 'team',
    },
  ],

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
      name: 'Shopizy storefront',
      kind: 'product',
      featured: true,
      summary: 'Customer storefront for the Shopizy API, built with standalone Angular components.',
      why: 'Modern client consuming the Shopizy services with standalone components and responsive design.',
      tech: ['Angular 21', 'TypeScript', 'Tailwind CSS'],
      repoUrl: 'https://github.com/akazad13/shopizy-spa',
      liveUrl: 'https://shopizy.netlify.app',
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
      name: 'Shopizy API',
      kind: 'architecture',
      summary: 'Online store management API with Clean Architecture: products, categories, carts, orders, and users.',
      tech: ['.NET 10', 'EF Core', 'SQL Server'],
      repoUrl: 'https://github.com/akazad13/shopizy-api',
      liveUrl: 'https://shopizy-api.runasp.net/swagger/index.html',
      liveLabel: 'API docs',
    },
    {
      name: 'SDLC workflow automation',
      kind: 'toolkit',
      summary: 'Agent workflow toolkit that turns a product spec into code, unit to end-to-end tests, and a reviewed pull request.',
      tech: ['Python', 'AI agents', 'GitHub Actions'],
      repoUrl: 'https://github.com/akazad13/sdlc-workflow-automate',
    },
    {
      name: 'Adda',
      kind: 'product',
      summary: 'Social networking app with real-time chat, a member directory, and role-based administration.',
      tech: ['Angular 21', 'ASP.NET Core 10', 'Identity', 'MySQL'],
      repoUrl: 'https://github.com/akazad13/adda',
      liveUrl: 'https://addaa.alwaysdata.net',
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

import { PortfolioData } from '../types/portfolio';

export const defaultPortfolioData: PortfolioData = {
  profile: {
    name: "Alex Chen",
    title: "Senior Full Stack & Systems Engineer",
    tagline: "Building scalable web services, intuitive developer tools, and reliable cloud architectures.",
    bio: "Hi! I'm Alex, a software engineer with 8+ years of experience building fast web applications, developer-friendly platforms, and resilient backend systems. I specialize in Go, TypeScript, Rust, and React, focusing on clean architecture, great developer experience, and software that makes people's lives easier.",
    shortBio: "Full stack & systems engineer passionate about clean code, developer experience, and reliable web applications.",
    location: "San Francisco, CA (Open to Remote)",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    status: "available",
    statusText: "Available for Full-Time Roles & Consulting",
    email: "alex.chen.dev@example.com",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    twitterUrl: "https://x.com",
    websiteUrl: "https://alexchen.dev",
    yearsOfExperience: 8,
    completedProjects: 45,
    uptimeScore: "99.99%",
    githubContributions: 2480,
  },
  skills: [
    // Languages
    {
      id: "lang-go",
      name: "Go (Golang)",
      category: "languages",
      level: 95,
      years: 7,
      highlight: true,
      description: "Concurrent microservices, gRPC backends, custom Kubernetes operators, and high-concurrency network proxies.",
      keywords: ["goroutines", "gRPC", "sync.Pool", "benchmarking", "profiling"]
    },
    {
      id: "lang-rust",
      name: "Rust",
      category: "languages",
      level: 88,
      years: 4,
      highlight: true,
      description: "Low-latency data processing engines, zero-cost abstractions, memory-safe CLI tools, and WebAssembly modules.",
      keywords: ["Tokio", "async/await", "zero-copy", "Wasm", "Serde"]
    },
    {
      id: "lang-ts",
      name: "TypeScript / Node.js",
      category: "languages",
      level: 94,
      years: 8,
      highlight: true,
      description: "Full-stack web architectures, type-safe APIs, developer SDKs, AST transforms, and distributed orchestration tools.",
      keywords: ["Generics", "AST", "Node Event Loop", "Worker Threads", "Zod"]
    },
    {
      id: "lang-python",
      name: "Python",
      category: "languages",
      level: 85,
      years: 6,
      description: "Data pipelines, automated evaluation suites, telemetry parsing, and ML inference service wrappers.",
      keywords: ["FastAPI", "AsyncIO", "NumPy", "PyTorch Inference", "Celery"]
    },
    {
      id: "lang-sql",
      name: "SQL & DDL",
      category: "languages",
      level: 92,
      years: 8,
      description: "Complex query optimization, indexing strategies, partition schemas, and transactional consistency models.",
      keywords: ["PostgreSQL EXPLAIN ANALYZE", "Query Plans", "Window Functions", "ACID"]
    },
    {
      id: "lang-c",
      name: "C / C++",
      category: "languages",
      level: 78,
      years: 3,
      description: "Systems programming fundamentals, memory layout analysis, and high-performance native extensions.",
      keywords: ["POSIX", "eBPF basics", "Memory Safety", "Pointers"]
    },

    // Backend
    {
      id: "back-dist",
      name: "Distributed Systems",
      category: "backend",
      level: 96,
      years: 7,
      highlight: true,
      description: "Consensus algorithms (Raft), idempotency keys, CQRS/Event Sourcing, distributed locks, and circuit breaking patterns.",
      keywords: ["Raft", "Two-Phase Commit", "Idempotency", "CAP Theorem", "Saga Pattern"]
    },
    {
      id: "back-grpc",
      name: "gRPC & Protocol Buffers",
      category: "backend",
      level: 94,
      years: 6,
      highlight: true,
      description: "High-speed inter-service RPC communication, bi-directional streaming, schema evolution, and load balancing.",
      keywords: ["Protobuf v3", "Streaming", "Envoy Interceptors", "Deadlines"]
    },
    {
      id: "back-kafka",
      name: "Kafka & Event Streaming",
      category: "backend",
      level: 90,
      years: 5,
      highlight: true,
      description: "Event-driven backbones, partitioned stream processing, schema registries, and consumer group rebalancing.",
      keywords: ["Kafka Streams", "Partitioning", "Exactly-Once Semantics", "Debezium"]
    },
    {
      id: "back-graphql",
      name: "GraphQL & REST APIs",
      category: "backend",
      level: 90,
      years: 7,
      description: "Federated GraphQL schemas, DataLoader batching, OpenAPI v3 contracts, and rate limiting algorithms (Token Bucket).",
      keywords: ["Apollo Federation", "DataLoader", "OpenAPI", "Rate Limiting"]
    },

    // Cloud & DevOps
    {
      id: "cloud-k8s",
      name: "Kubernetes & Containers",
      category: "cloud",
      level: 92,
      years: 6,
      highlight: true,
      description: "Helm charts, Custom Resource Definitions (CRDs), HPA autoscaling, ingress controllers, and zero-downtime rolling updates.",
      keywords: ["CRD", "Operators", "Istio", "Helm", "Cluster Autoscaler"]
    },
    {
      id: "cloud-aws-gcp",
      name: "AWS & Google Cloud (GCP)",
      category: "cloud",
      level: 93,
      years: 8,
      highlight: true,
      description: "Multi-region VPC peering, IAM least-privilege policies, ECS/EKS, Cloud Run, S3/GCS, Lambda/Cloud Functions.",
      keywords: ["Terraform", "Cloud Architecture", "Cost Optimization", "IAM Policies"]
    },
    {
      id: "cloud-tf",
      name: "Terraform & IaC",
      category: "cloud",
      level: 90,
      years: 5,
      description: "Modular infrastructure-as-code, state file locking, continuous compliance pipelines, and multi-environment orchestration.",
      keywords: ["HCL", "Terragrunt", "State Management", "Provider Development"]
    },
    {
      id: "cloud-obs",
      name: "Observability (Prometheus, Grafana, OpenTelemetry)",
      category: "cloud",
      level: 94,
      years: 6,
      highlight: true,
      description: "Distributed tracing across microservices, SLO/SLI alerting, p99 latency profiling, and Prometheus metric exporters.",
      keywords: ["OpenTelemetry", "PromQL", "Distributed Tracing", "Jaeger", "Datadog"]
    },

    // Databases
    {
      id: "db-postgres",
      name: "PostgreSQL & Citus",
      category: "databases",
      level: 95,
      years: 8,
      highlight: true,
      description: "Connection pooling with PgBouncer, row-level security, JSONB indexing, logical replication, and sharding strategies.",
      keywords: ["PgBouncer", "WAL Replication", "BRIN/GIN Indexes", "Partitioning"]
    },
    {
      id: "db-redis",
      name: "Redis & Dragonfly",
      category: "databases",
      level: 94,
      years: 7,
      description: "Distributed caching, sliding window rate limiters, Lua atomic scripts, pub/sub queues, and geospatial indices.",
      keywords: ["Lua Scripts", "Cache Stampede Prevention", "Redis Cluster", "HyperLogLog"]
    },
    {
      id: "db-vector",
      name: "Vector Databases (Qdrant, pgvector)",
      category: "databases",
      level: 86,
      years: 2,
      description: "HNSW index tuning, cosine distance searches, hybrid lexical-dense queries, and high-throughput embedding indexing.",
      keywords: ["HNSW", "pgvector", "Cosine Similarity", "Quantization"]
    },

    // Frontend
    {
      id: "front-react",
      name: "React & Next.js",
      category: "frontend",
      level: 92,
      years: 7,
      highlight: true,
      description: "Server Components, concurrent rendering, dynamic state machines, virtualized lists, and WCAG AA accessible UI design.",
      keywords: ["React 19", "Server Components", "State Machines", "Zustand", "Tailwind"]
    },
    {
      id: "front-perf",
      name: "Web Performance & Core Vitals",
      category: "frontend",
      level: 90,
      years: 6,
      description: "Sub-100ms INP tuning, code splitting, bundle minimization, and responsive fluid layout architectures.",
      keywords: ["Lighthouse 100", "Bundle Analyzer", "Zero-layout-shift", "Canvas"]
    },

    // Architecture
    {
      id: "arch-system",
      name: "High-Scale System Design",
      category: "architecture",
      level: 96,
      years: 8,
      highlight: true,
      description: "Designing end-to-end multi-tenant systems handling >100k requests/sec, failover runbooks, and disaster recovery.",
      keywords: ["Sharding", "Backpressure", "Circuit Breakers", "Graceful Degradation"]
    },
    {
      id: "arch-sec",
      name: "Security & Zero Trust",
      category: "architecture",
      level: 88,
      years: 6,
      description: "OAuth 2.1 / OIDC, mTLS inter-service encryption, secrets management (Vault), and automated vulnerability auditing.",
      keywords: ["mTLS", "HashiCorp Vault", "OIDC", "OWASP Top 10", "JWT Claims"]
    }
  ],
  projects: [
    {
      id: "apex-mesh",
      title: "ApexMesh: Distributed Service Proxy",
      tagline: "Zero-allocation, low-latency microservice proxy and traffic router built in Go and eBPF.",
      category: "Distributed Systems",
      featured: true,
      description: "ApexMesh is a high-performance, lightweight sidecar proxy engineered to route, balance, and monitor microservice traffic across multi-cluster Kubernetes deployments with sub-millisecond overhead.",
      problemSolved: "Traditional service meshes introduced 8-15ms of p99 latency overhead and consumed excessive memory per pod. ApexMesh reduced p99 hop latency to under 0.8ms using zero-copy ring buffers and eBPF socket bypass.",
      architectureDetails: [
        "eBPF kernel bypass for local pod communication, avoiding TCP stack traversal on localhost.",
        "Custom concurrent connection pooling with lockless ring buffers.",
        "Dynamic routing engine powered by Raft consensus cluster metadata synchronization.",
        "Zero-allocation JSON & Protobuf telemetry exporter streaming to OpenTelemetry collectors."
      ],
      techStack: ["Go", "eBPF", "gRPC", "Kubernetes", "OpenTelemetry", "Docker", "Prometheus"],
      metrics: [
        { label: "p99 Latency", value: "< 0.8ms" },
        { label: "Throughput", value: "350k req/sec" },
        { label: "Memory Footprint", value: "14MB / instance" },
        { label: "Active Deployments", value: "1,200+ pods" }
      ],
      githubUrl: "https://github.com",
      liveUrl: "https://github.com",
      codeSnippet: {
        language: "go",
        filename: "proxy/router.go",
        code: `package router

import (
    "context"
    "sync/atomic"
    "time"
)

type RouteTarget struct {
    Endpoint    string
    ActiveConns int64
    LatencyP99  time.Duration
    Weight      uint32
}

// SelectBestEndpoint uses a power-of-two-choices least-loaded algorithm
func (r *Router) SelectBestEndpoint(ctx context.Context, targets []*RouteTarget) *RouteTarget {
    if len(targets) == 0 {
        return nil
    }
    if len(targets) == 1 {
        return targets[0]
    }
    
    // Pick 2 random candidate endpoints and select the one with lowest queue depth
    i1, i2 := r.fastRandomPair(len(targets))
    c1, c2 := targets[i1], targets[i2]
    
    load1 := atomic.LoadInt64(&c1.ActiveConns)
    load2 := atomic.LoadInt64(&c2.ActiveConns)
    
    if load1 <= load2 {
        return c1
    }
    return c2
}`
      }
    },
    {
      id: "cloud-pulse",
      title: "CloudPulse: Observability Stream Engine",
      tagline: "Real-time log aggregation and anomaly detection pipeline handling 4.2M events/sec.",
      category: "Cloud & DevOps",
      featured: true,
      description: "An event-driven telemetry stream engine designed to parse, index, and correlate distributed traces, application logs, and system metrics with automated root-cause anomaly detection.",
      problemSolved: "Ingesting multi-terabyte log streams into Elasticsearch was causing frequent ingestion backpressure and prohibitive indexing costs during high-traffic spikes.",
      architectureDetails: [
        "Rust-based ingestion agent utilizing SIMD instructions for blazing-fast JSON/Syslog parsing.",
        "Kafka partition clustering with tiered hot/cold storage lifecycle management.",
        "Vectorized columnar storage engine backing sub-second aggregation queries over 100B records.",
        "Sliding window anomaly detection model computing Z-scores and IQR across rolling 5-minute intervals."
      ],
      techStack: ["Rust", "Apache Kafka", "ClickHouse", "Go", "Docker", "Grafana", "AWS S3"],
      metrics: [
        { label: "Ingestion Rate", value: "4.2M events/s" },
        { label: "Cost Reduction", value: "68% vs Datadog" },
        { label: "Query Speed", value: "140ms on 10B rows" },
        { label: "Data Processed", value: "8.5 TB / day" }
      ],
      githubUrl: "https://github.com",
      liveUrl: "https://github.com",
      codeSnippet: {
        language: "rust",
        filename: "engine/src/ingest.rs",
        code: `use tokio::sync::mpsc;
use std::sync::atomic::{AtomicU64, Ordering};

pub struct TelemetryIngestor {
    total_events: AtomicU64,
    batch_tx: mpsc::Sender<LogBatch>,
}

impl TelemetryIngestor {
    pub async fn process_chunk(&self, raw_buffer: &[u8]) -> Result<usize, IngestError> {
        let mut parsed_events = Vec::with_capacity(1024);
        
        // Zero-copy SIMD accelerated tokenizer
        for record in simd_json_split(raw_buffer) {
            let event = FastTelemetryEvent::from_slice(record)?;
            parsed_events.push(event);
        }
        
        let count = parsed_events.len();
        self.batch_tx.send(LogBatch::new(parsed_events)).await?;
        self.total_events.fetch_add(count as u64, Ordering::Relaxed);
        
        Ok(count)
    }
}`
      }
    },
    {
      id: "synthetix-db",
      title: "SynthetixDB: Distributed Hybrid Vector Store",
      tagline: "Embeddings vector index and lexical search engine with Raft consensus and HNSW graph clustering.",
      category: "AI & ML",
      featured: true,
      description: "SynthetixDB is a distributed database custom-engineered for modern generative AI applications, combining lexical BM25 keyword scoring with 1536-dimensional vector similarity searches at scale.",
      problemSolved: "Existing single-node vector databases lacked horizontal sharding and failover capabilities, leading to single points of failure and memory exhaustion for billion-vector datasets.",
      architectureDetails: [
        "Hierarchical Navigable Small World (HNSW) graph index with scalar product quantization (PQ8).",
        "Raft consensus protocol for dynamic shard allocation, primary-replica replication, and split-brain recovery.",
        "Hybrid scoring fusion combining Reciprocal Rank Fusion (RRF) with normalized cosine distances.",
        "Zero-downtime dynamic index rebuilding with lock-free copy-on-write memory segments."
      ],
      techStack: ["Rust", "C++", "Python", "gRPC", "RocksDB", "Raft", "Docker"],
      metrics: [
        { label: "Vector Search Recall", value: "99.2% @ 10k" },
        { label: "Search p99", value: "4.2ms" },
        { label: "Vector Capacity", value: "500M vectors" },
        { label: "Memory Compression", value: "4x via PQ" }
      ],
      githubUrl: "https://github.com",
      liveUrl: "https://github.com",
      codeSnippet: {
        language: "rust",
        filename: "core/hnsw.rs",
        code: `pub struct HNSWGraph {
    pub max_elements: usize,
    pub m: usize,
    pub ef_construction: usize,
    pub layers: Vec<LayerIndex>,
}

impl HNSWGraph {
    pub fn search_knn(&self, query: &[f32], k: usize, ef: usize) -> Vec<NeighborResult> {
        let mut visited = BitSet::with_capacity(self.max_elements);
        let mut candidates = MinHeap::new();
        let mut nearest_neighbors = MaxHeap::new();
        
        // Fast SIMD dot-product cosine similarity
        let entry_point = self.get_entry_point();
        let dist = simd_cosine_distance(query, self.get_vector(entry_point));
        
        candidates.push(Candidate { id: entry_point, dist });
        nearest_neighbors.push(Candidate { id: entry_point, dist });
        
        while let Some(current) = candidates.pop() {
            if current.dist > nearest_neighbors.peek().unwrap().dist {
                break;
            }
            self.explore_neighbors(current.id, query, &mut visited, &mut candidates, &mut nearest_neighbors, ef);
        }
        
        nearest_neighbors.into_sorted_vec(k)
    }
}`
      }
    },
    {
      id: "forge-ui",
      title: "ForgeUI: Headless Design Token & Component Engine",
      tagline: "Enterprise component architecture & AST design token compiler generating type-safe UI packages.",
      category: "Full-Stack",
      featured: false,
      description: "A developer-first component framework and headless token compiler powering unified UI platforms across web, mobile, and desktop applications with 100% WCAG AA accessibility compliance.",
      problemSolved: "Design system divergence between multiple frontend teams resulted in inconsistent user experiences, accessibility regressions, and slow UI development velocity.",
      architectureDetails: [
        "AST compiler that translates Figma token definitions into typed Tailwind tokens and CSS variables.",
        "Composable headless hooks implementing complete WAI-ARIA keyboard navigation specifications.",
        "Automated visual regression test harness executing against 32 responsive viewport combinations.",
        "Zero-runtime footprint with strict tree-shaking and micro-bundle packaging."
      ],
      techStack: ["TypeScript", "React", "Tailwind CSS", "Vite", "Turborepo", "Storybook", "Playwright"],
      metrics: [
        { label: "Bundle Size", value: "< 2.8kB gzip" },
        { label: "A11y Score", value: "100/100 WCAG" },
        { label: "Adoption Rate", value: "18+ product teams" },
        { label: "Build Acceleration", value: "3.5x faster" }
      ],
      githubUrl: "https://github.com",
      liveUrl: "https://github.com"
    },
    {
      id: "devflow-ci",
      title: "DevFlow CI: Ephemeral Cloud Workspace Orchestrator",
      tagline: "On-demand containerized developer environments with instant branch replication in seconds.",
      category: "Cloud & DevOps",
      featured: false,
      description: "A self-hosted developer platform that boots full-fidelity preview environments on every pull request, seeded with anonymized production database snapshots and hot-reloading services.",
      problemSolved: "Engineers spent 4+ hours per week configuring local dependencies and debugging environment-specific configuration drift.",
      architectureDetails: [
        "Custom Kubernetes CRD controller spinning up lightweight namespaces in < 12 seconds.",
        "Automated database sanitization and schema migration pipeline running in isolated sandboxes.",
        "Dynamic DNS and TLS certificate provisioning with automatic idle shutdown to minimize cloud spend.",
        "Integrated Webhook server providing real-time build status directly inside GitHub PR comments."
      ],
      techStack: ["Go", "Kubernetes", "Docker", "PostgreSQL", "Terraform", "GitHub Actions", "Redis"],
      metrics: [
        { label: "Environment Boot Time", value: "11.4 seconds" },
        { label: "Cloud Cost Savings", value: "$45k / year" },
        { label: "PR Cycle Time", value: "-40% review speed" },
        { label: "Daily Previews", value: "300+ spawned" }
      ],
      githubUrl: "https://github.com",
      liveUrl: "https://github.com"
    },
    {
      id: "neuro-doc",
      title: "NeuroDoc: Collaborative Markdown & Architecture Suite",
      tagline: "Real-time collaborative technical documentation and interactive system diagramming powered by CRDTs.",
      category: "Full-Stack",
      featured: false,
      description: "A fast, privacy-focused engineering documentation platform supporting offline-first editing, real-time multi-cursor collaboration via Yjs CRDTs, and interactive live architecture rendering.",
      problemSolved: "Engineering teams lacked a unified tool that could seamlessly combine code documentation, Mermaid/ASCII architectural diagrams, and conflict-free collaborative editing.",
      architectureDetails: [
        "Conflict-free Replicated Data Types (CRDTs) over WebSocket with optimistic local updates.",
        "Live interactive canvas renderer supporting auto-layout for architecture diagrams and sequence charts.",
        "End-to-end encrypted storage with optional local-only filesystem sync mode.",
        "Native syntax highlighting and live TypeScript evaluation sandbox."
      ],
      techStack: ["TypeScript", "React", "Yjs", "WebSockets", "Node.js", "Tailwind CSS", "IndexedDB"],
      metrics: [
        { label: "Sync Latency", value: "< 25ms" },
        { label: "Offline Support", value: "100% functional" },
        { label: "Active Users", value: "14,000+ devs" },
        { label: "Crash Rate", value: "0.001%" }
      ],
      githubUrl: "https://github.com",
      liveUrl: "https://github.com"
    }
  ],
  experiences: [
    {
      id: "exp-1",
      company: "Vanguard Cloud Systems",
      role: "Staff Platform & Distributed Systems Engineer",
      period: "2023 – Present",
      location: "San Francisco, CA (Hybrid)",
      type: "Full-time",
      isCurrent: true,
      description: "Lead architect for core cloud infrastructure, high-throughput microservice mesh, and global data routing systems supporting 25M+ active users.",
      achievements: [
        "Architected and deployed a zero-allocation gRPC service mesh proxy in Go, reducing p99 API latency across 80+ microservices from 38ms to 8.2ms.",
        "Led the migration of legacy monolithic databases to sharded PostgreSQL and Citus clusters, boosting query throughput by 4.5x while sustaining 99.995% availability.",
        "Mentored a team of 14 backend and cloud infrastructure engineers on distributed systems patterns, consensus protocols, and incident response runbooks.",
        "Designed real-time disaster recovery failover automation with automated cross-region replication that decreased RTO to under 45 seconds."
      ],
      technologies: ["Go", "Kubernetes", "gRPC", "PostgreSQL", "Kafka", "OpenTelemetry", "Terraform", "AWS"]
    },
    {
      id: "exp-2",
      company: "HyperScale Networks",
      role: "Senior Backend & Infrastructure Engineer",
      period: "2020 – 2023",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Spearheaded the development of a real-time event streaming pipeline and developer platform services processing multi-gigabit telemetry feeds.",
      achievements: [
        "Engineered a high-speed telemetry ingestion pipeline in Rust and Kafka processing 4.2M events/sec, cutting third-party observability spend by $320,000 annually.",
        "Built dynamic multi-tenant rate limiting and circuit breaking middleware handling 120,000 requests/sec with Redis cluster backplanes.",
        "Standardized CI/CD automation and containerized preview environments across 35 microservices, reducing deployment cycle times from 45 minutes to 6 minutes.",
        "Authored internal RFCs for API versioning standards, zero-downtime database schema migrations, and security compliance (SOC 2 Type II)."
      ],
      technologies: ["Rust", "Go", "Kafka", "Redis", "Docker", "Kubernetes", "Prometheus", "GCP"]
    },
    {
      id: "exp-3",
      company: "Aether Dynamics",
      role: "Software Engineer (Full-Stack & Systems)",
      period: "2018 – 2020",
      location: "Seattle, WA",
      type: "Full-time",
      description: "Developed developer productivity tools, API gateways, and customer-facing dashboard interfaces for enterprise cloud management.",
      achievements: [
        "Designed and implemented RESTful and GraphQL API backends in TypeScript and Node.js serving 500k+ daily queries.",
        "Created an interactive system monitoring dashboard in React and D3.js providing sub-second metric visualizations and interactive topology maps.",
        "Optimized database connection pooling and query plans, cutting peak server CPU utilization by 34%."
      ],
      technologies: ["TypeScript", "Node.js", "React", "PostgreSQL", "Redis", "Docker", "GraphQL"]
    }
  ],
  architectures: [
    {
      id: "arch-streaming",
      title: "High-Throughput Ingestion & Anomaly Detection Pipeline",
      subtitle: "Processes 4.2M events/second with sub-100ms end-to-end telemetry propagation",
      description: "An event-driven distributed pipeline designed for maximum resilience, zero-loss buffering, and real-time sliding window statistical analysis.",
      nodes: [
        { id: "edge", title: "Edge Clients & Agents", type: "client", latency: "0ms", description: "Microservice daemons and web clients dispatching batched JSON/Protobuf telemetry." },
        { id: "gateway", title: "Apex Gateway (eBPF)", type: "gateway", latency: "0.8ms", description: "High-speed reverse proxy performing mTLS validation, token bucket rate limiting, and zero-copy dispatch." },
        { id: "kafka", title: "Kafka Partition Cluster", type: "queue", latency: "4.2ms", description: "Multi-broker cluster with 32 topic partitions ensuring sequential order and durable disk replication." },
        { id: "stream-workers", title: "Rust Stream Processors", type: "service", latency: "6.5ms", description: "Stateless streaming pods running SIMD parsers, geo-enrichment, and sliding-window Z-score calculations." },
        { id: "redis-cache", title: "Redis State Cache", type: "cache", latency: "1.1ms", description: "In-memory store for rolling window counters, anomaly threshold caches, and active deduplication keys." },
        { id: "clickhouse", title: "ClickHouse Columnar Store", type: "database", latency: "12ms", description: "Sharded analytical database storing compressed historical metrics and vectorized logs." }
      ],
      flowSteps: [
        { step: 1, from: "edge", to: "gateway", label: "Send telemetry batch", protocol: "gRPC / HTTP/2" },
        { step: 2, from: "gateway", to: "kafka", label: "Publish to partition topics", protocol: "Kafka Wire Protocol" },
        { step: 3, from: "kafka", to: "stream-workers", label: "Consume batch streams", protocol: "Zero-copy consumer" },
        { step: 4, from: "stream-workers", to: "redis-cache", label: "Check anomaly thresholds", protocol: "RESP / TCP" },
        { step: 5, from: "stream-workers", to: "clickhouse", label: "Bulk vectorized flush", protocol: "Native TCP" }
      ],
      stats: [
        { label: "Peak Ingestion", value: "4.2M msg/sec" },
        { label: "End-to-End Latency", value: "48ms" },
        { label: "Data Durability", value: "99.999999%" },
        { label: "Compression Ratio", value: "5.8x" }
      ]
    },
    {
      id: "arch-consensus",
      title: "Multi-Region Distributed Data Replication & Consensus",
      subtitle: "Raft consensus cluster with active-active read replicas and automated split-brain recovery",
      description: "Guarantees linearizable state consistency and zero data loss across distributed server nodes during region network partitions.",
      nodes: [
        { id: "client-app", title: "Application Clients", type: "client", latency: "0ms", description: "User traffic and internal API calls with automatic idempotency headers." },
        { id: "load-balancer", title: "Global Anycast Router", type: "gateway", latency: "1.2ms", description: "BGP anycast routing traffic to the topologically closest healthy availability zone." },
        { id: "raft-leader", title: "Raft Leader Node (Go)", type: "service", latency: "3.4ms", description: "Coordinates log replication, accepts write operations, and manages heartbeat quorums." },
        { id: "raft-follower-1", title: "Follower Node (US-East)", type: "service", latency: "18ms", description: "Maintains synchronized state machine and serves local read requests." },
        { id: "raft-follower-2", title: "Follower Node (EU-West)", type: "service", latency: "65ms", description: "Cross-continental quorum member providing geographical disaster recovery." },
        { id: "wal-storage", title: "WAL & Persistent RocksDB", type: "database", latency: "2.1ms", description: "Append-only Write-Ahead Log committed to NVMe storage before ACK." }
      ],
      flowSteps: [
        { step: 1, from: "client-app", to: "load-balancer", label: "Transactional write", protocol: "HTTPS / TLS 1.3" },
        { step: 2, from: "load-balancer", to: "raft-leader", label: "Proxy to active leader", protocol: "Internal gRPC" },
        { step: 3, from: "raft-leader", to: "wal-storage", label: "Append uncommitted entry to WAL", protocol: "Direct I/O" },
        { step: 4, from: "raft-leader", to: "raft-follower-1", label: "Replicate AppendEntries to quorum", protocol: "Raft RPC" },
        { step: 5, from: "raft-leader", to: "client-app", label: "Acknowledge committed write", protocol: "Success 201" }
      ],
      stats: [
        { label: "Consensus Commit", value: "< 24ms (Cross-region)" },
        { label: "Failover Time", value: "< 1.5 seconds" },
        { label: "Consistency Model", value: "Linearizable" },
        { label: "Quorum Size", value: "3 of 5 nodes" }
      ]
    }
  ],
  articles: [
    {
      id: "art-1",
      title: "Zero-Allocation Networking in Go: Lessons from Building a Service Proxy",
      publication: "Engineering Deep Dives",
      date: "May 2024",
      readTime: "8 min read",
      summary: "How we eliminated GC pause spikes by leveraging sync.Pool, byte slice recycling, and lock-free ring buffers to achieve 350k req/sec on modest hardware.",
      tags: ["Go", "Distributed Systems", "Performance", "Memory Management"],
      url: "https://github.com"
    },
    {
      id: "art-2",
      title: "Demystifying Raft: Building a Resilient Consensus Engine from Scratch",
      publication: "Systems & Architecture",
      date: "January 2024",
      readTime: "12 min read",
      summary: "A practical breakdown of leader election, log compaction, snapshot replication, and edge-case network partitions in distributed state machines.",
      tags: ["Raft", "Rust", "Consensus", "Distributed Databases"],
      url: "https://github.com"
    },
    {
      id: "art-3",
      title: "Optimizing PostgreSQL for 100,000 Writes Per Second Without Losing ACID",
      publication: "High Scalability Journal",
      date: "August 2023",
      readTime: "10 min read",
      summary: "Detailed tuning strategies for WAL buffers, checkpoint intervals, connection pooling with PgBouncer, and partition pruning on multi-terabyte datasets.",
      tags: ["PostgreSQL", "Databases", "Performance Tuning", "SQL"],
      url: "https://github.com"
    }
  ],
  testimonials: [
    {
      id: "test-1",
      name: "Marcus Vance",
      role: "VP of Engineering",
      company: "Vanguard Cloud",
      avatarText: "MV",
      relationship: "Managed Alex directly",
      quote: "Alex is the rare software engineer who can dive deep into kernel-level network packet bypass in the morning and lead executive architecture reviews in the afternoon. His work on our service mesh reduced our cloud bills by hundreds of thousands of dollars while making our entire platform vastly more reliable."
    },
    {
      id: "test-2",
      name: "Dr. Elena Rostova",
      role: "Principal Infrastructure Architect",
      company: "HyperScale Networks",
      avatarText: "ER",
      relationship: "Collaborated on distributed telemetry",
      quote: "Working with Alex was a masterclass in distributed systems design. His obsessive attention to p99 latency, edge-case fault tolerance, and clean type-safe APIs set a new standard for our entire engineering department."
    },
    {
      id: "test-3",
      name: "David K.",
      role: "Lead DevOps & SRE",
      company: "Aether Dynamics",
      avatarText: "DK",
      relationship: "Teammate & SRE Partner",
      quote: "Whenever there was a high-severity production outage, Alex was the engineer you wanted in the war room. Calm, analytical, and fast to isolate root causes. Plus, his developer tools made our daily workflow 10x smoother."
    }
  ]
};

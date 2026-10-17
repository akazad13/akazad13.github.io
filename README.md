<div align="center">

# 🌐 Personal Portfolio & Technical Blog

### Personal portfolio website and engineering blog of Md. Abul Kalam

[![Website](https://img.shields.io/badge/Live_Site-akazad.dev-blue?style=flat-square&logo=google-chrome&logoColor=white)](https://akazad.dev/)
[![GitHub Pages](https://img.shields.io/badge/Hosted_on-GitHub_Pages-222222?style=flat-square&logo=github&logoColor=white)](https://pages.github.com/)
[![Jekyll](https://img.shields.io/badge/Static_Site-Jekyll-CC0000?style=flat-square&logo=jekyll&logoColor=white)](https://jekyllrb.com/)
[![Theme](https://img.shields.io/badge/Theme-Chirpy-orange?style=flat-square)](https://github.com/cotes2020/jekyll-theme-chirpy)
[![Ruby](https://img.shields.io/badge/Ruby-3.x-CC342D?style=flat-square&logo=ruby&logoColor=white)](https://www.ruby-lang.org/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

[Overview](#-overview) •
[Features](#-key-features) •
[Tech Stack](#-tech-stack) •
[Quick Start](#-quick-start) •
[Author](#-author) •
[License](#-license)

</div>

---

## 📌 Overview

**akazad13.github.io** hosts the personal developer portfolio and engineering blog of **Md. Abul Kalam**, live at [https://akazad.dev/](https://akazad.dev/). Powered by Jekyll and the Chirpy theme, the site features in-depth technical publications covering modern .NET, C#, Clean Architecture, Angular, Azure cloud patterns, Distributed Systems, and Competitive Programming.

🔗 **Live Website**: [https://akazad.dev/](https://akazad.dev/)

### Key Highlights
- 📖 **Technical Blog & Guides**: Comprehensive articles on modern .NET, cloud patterns, and software architecture.
- 🌓 **Responsive Theme**: Dark/Light mode toggle, typography optimization, and mobile-first readability.
- 🔍 **In-App Search**: Fast local indexing for posts, tags, and categories.
- ⚡ **Zero-Maintenance Hosting**: Automated GitHub Pages CI/CD workflow building and publishing on every commit.

---

## 🛠 Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Static Site Generator** | Jekyll 4, Ruby 3 |
| **Theme & Base** | `jekyll-theme-chirpy` |
| **Styling & Assets** | Bootstrap 5, FontAwesome, Sass |
| **Search & SEO** | `jekyll-seo-tag`, `jekyll-feed`, local client search |
| **Hosting & Automation** | GitHub Pages & GitHub Actions |

---

## 📂 Repository Layout

```text
├── _posts/            # Markdown technical blog posts (YYYY-MM-DD-title.md)
├── _tabs/             # Top-level navigation tabs (About, Categories, Tags, Archives)
├── _data/             # Localization and author profile configuration
├── assets/            # Images, post banners, favicons, custom styles
├── _config.yml        # Jekyll site configuration and SEO metadata
└── Gemfile            # Ruby dependencies and Jekyll plugins
```

---

## 🚀 Quick Start

### Prerequisites
- [Ruby](https://www.ruby-lang.org/) (>= 3.0) and Bundler
- Git

### 1. Clone & Install
```bash
git clone https://github.com/akazad13/akazad13.github.io.git
cd akazad13.github.io
bundle install
```

### 2. Run Local Development Server
```bash
bundle exec jekyll serve --livereload --force_polling
```
Open [http://localhost:4000](http://localhost:4000) to preview the site with live reloading.

---

## ✍️ Writing a New Post

Create a new file in `_posts/` formatted as `YYYY-MM-DD-title.md`:

```markdown
---
title: "Article Title"
date: YYYY-MM-DD HH:MM:SS +/-TTTT
categories: [Category, Subcategory]
tags: [tag1, tag2]
---

Content goes here...
```

---

## 👤 Author

**Md. Abul Kalam**
- GitHub: [@akazad13](https://github.com/akazad13)
- LinkedIn: [Md. Abul Kalam](https://linkedin.com/in/akazad13)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

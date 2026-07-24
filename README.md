<div align="center">

# 🚀 AI Email Writer & Cloud DevOps Suite

[![Full-Stack React & Spring Boot](https://img.shields.io/badge/Stack-React%20%2B%20Spring%20Boot-blue?style=for-the-badge&logo=springboot)](https://github.com/abhi2004-dev/AI-Email-writing-tool)
[![DevOps Pipeline](https://img.shields.io/badge/DevOps-Docker%20%7C%20K8s%20%7C%20Terraform-orange?style=for-the-badge&logo=docker)](https://github.com/abhi2004-dev/AI-Email-writing-tool)
[![CI/CD Status](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-green?style=for-the-badge&logo=githubactions)](https://github.com/abhi2004-dev/AI-Email-writing-tool)
[![Cloud Live](https://img.shields.io/badge/Live-Vercel%20%2B%20Render-brightgreen?style=for-the-badge&logo=vercel)](https://ai-email-writing-tool.vercel.app/)

*A production-grade, enterprise-ready AI application paired with a complete 5-phase DevOps automation pipeline.*

[🌐 View Live App](https://ai-email-writing-tool.vercel.app/) • [📁 Repository](https://github.com/abhi2004-dev/AI-Email-writing-tool)

</div>

---

# 🌟 Executive Summary

This project bridges modern generative AI capabilities with enterprise-grade DevOps infrastructure. It features a responsive **React** frontend communicating with a high-performance **Spring Boot** backend integrated with **Google Gemini AI**.

Beyond application logic, the codebase demonstrates comprehensive infrastructure automation, container orchestration, automated testing, and observability tooling—reflecting professional cloud-native engineering standards.

---

# 🛠️ Architecture & Technology Stack

```text
                   +----------------------+
                   |     User Browser     |
                   +----------+-----------+
                              |
                              | HTTPS
                              |
                   +----------v-----------+
                   |   Vercel (React UI)  |
                   +----------+-----------+
                              |
                              | REST API
                              |
                   +----------v-----------+
                   | Render (Spring Boot) |
                   +----------+-----------+
                              |
                              |
                   +----------v-----------+
                   | Google Gemini API    |
                   +----------------------+
```

## 📦 Application Layer

- **Frontend:** React, Vite, Modern CSS
- **Backend:** Java 17, Spring Boot
- **AI Engine:** Google Gemini API

---

## ☁️ DevOps & Infrastructure Layer

- 🐳 Docker & Docker Compose
- ☸️ Kubernetes
- 🏗️ Terraform
- ⚙️ GitHub Actions
- 🎭 Playwright
- 📊 Prometheus
- 📈 Grafana

---

# 📂 Project Structure

```text
ai-email-writing-tool/
│
├── frontend/
│   ├── src/
│   └── Dockerfile
│
├── backend/
│   ├── src/
│   ├── Dockerfile
│   └── pom.xml
│
├── k8s/
│   ├── backend-deployment.yml
│   └── frontend-deployment.yml
│
├── terraform/
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
│
└── .github/
    └── workflows/
```

---

# 🚀 5-Phase DevOps Pipeline Breakdown

| Phase | Component | Implementation Focus |
|-------|-----------|----------------------|
| **Phase 1** | CI/CD Automation | GitHub Actions pipelines verifying build integrity on every push |
| **Phase 2** | Automated Testing | Playwright end-to-end browser testing |
| **Phase 3** | Monitoring Stack | Prometheus metrics with Grafana dashboards |
| **Phase 4** | Infrastructure as Code | Terraform modules provisioning cloud resources |
| **Phase 5** | Kubernetes | Deployment manifests enabling scaling & high availability |

---

# 🌐 Production Cloud Deployments

## Frontend

**Platform:** Vercel

- Global CDN
- Automatic deployments
- Fast static hosting

🔗 **Live App:** https://ai-email-writing-tool.vercel.app/

---

## Backend

**Platform:** Render

- Docker container deployment
- Spring Boot REST API
- 24/7 hosted service

🔗 **Backend Health Endpoint:** *(Add your Render URL here)*

---

# ⚙️ Local Development Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/abhi2004-dev/AI-Email-writing-tool.git
cd AI-Email-writing-tool
```

---

## 2️⃣ Run Backend

```bash
cd backend

# Linux / macOS
export GEMINI_API_KEY="your-api-key"

# Windows PowerShell
$env:GEMINI_API_KEY="your-api-key"

mvn spring-boot:run
```

---

## 3️⃣ Run Frontend

Open another terminal.

```bash
cd frontend

npm install

npm run dev
```

---

# 💻 Tech Stack

| Category | Technologies |
|----------|--------------|
| Frontend | React, Vite, CSS |
| Backend | Java 17, Spring Boot |
| AI | Google Gemini API |
| Build | Maven, npm |
| Containerization | Docker, Docker Compose |
| CI/CD | GitHub Actions |
| IaC | Terraform |
| Orchestration | Kubernetes |
| Testing | Playwright |
| Monitoring | Prometheus, Grafana |
| Hosting | Vercel, Render |

---

# ✨ Features

- AI-powered email generation
- Professional tone selection
- Adjustable email length
- Responsive UI
- Spring Boot REST API
- Gemini AI integration
- Dockerized application
- Kubernetes deployment
- Terraform infrastructure
- GitHub Actions CI/CD
- Automated Playwright testing
- Prometheus monitoring
- Grafana dashboards
- Cloud deployment on Vercel & Render

---

# 👨‍💻 Author

## Abhi R Sooryavamshi

**Software Developer**

Cloud Engineering • DevOps • Machine Learning • Full Stack Development

Built with ❤️ using React, Spring Boot, Docker, Kubernetes, Terraform, and Google Gemini AI.
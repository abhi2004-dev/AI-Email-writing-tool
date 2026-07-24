# AI Email Writer - Production DevOps Pipeline

A full-stack enterprise-grade application demonstrating complete automated CI/CD, end-to-end testing, observability metrics, infrastructure-as-code (IaC), and container orchestration.

## 🚀 Architecture & Phases

1. **Phase 1: CI/CD Pipeline (`.github/workflows/ci.yml`)**
   - Automated build, test, and verification using GitHub Actions.
   - Compiles Spring Boot backend (JDK 17, Maven) and React/Vite frontend (Node 24).

2. **Phase 2: Automated E2E Testing**
   - Integrated **Playwright** browser testing into the pipeline.
   - Automatically spins up Docker containers and validates UI components pre-merge.

3. **Phase 3: Observability & Monitoring**
   - **Spring Boot Actuator & Micrometer Prometheus** endpoints exposed.
   - Configured **Prometheus** scraper and **Grafana** dashboards for real-time application metrics.

4. **Phase 4: Infrastructure as Code (Terraform)**
   - Local infrastructure provisioning using the Terraform Docker provider.
   - Declarative network and container management (`terraform apply`).

5. **Phase 5: Container Orchestration (Kubernetes)**
   - Production-ready Kubernetes Deployments and Services (`k8s/`).
   - High availability configuration with multi-replica pods for backend and frontend services.

## 🛠️ Local Quickstart

- **Start Stack (Docker Compose):**
  ```bash
  docker compose up -d --build
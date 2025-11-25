# ⚔️ CodeColosseum - The Algorithmic Battle Arena

![.NET 8.0](https://img.shields.io/badge/.NET-8.0-purple)
![Architecture](https://img.shields.io/badge/Architecture-Modular_Monolith-blue)
![React](https://img.shields.io/badge/Frontend-React_Vite-cyan)
![AI](https://img.shields.io/badge/AI-Semantic_Kernel-green)
![Status](https://img.shields.io/badge/Build-Passing-brightgreen)

> **CodeColosseum** is a high-performance Online Judge platform designed to help developers master Data Structures and Algorithms. Unlike traditional platforms, it integrates an **AI-Powered Mentor** and a **Real-time Gamification System**, built on a robust **Modular Monolith** architecture to ensure scalability and maintainability.

---

## 🚀 Key Features

### 🧠 AI-Powered Smart Mentor (Premium)
- Integrated **Microsoft Semantic Kernel** & **OpenAI** to analyze user code in real-time.
- **Smart Hint System:** Instead of giving away the answer, the AI provides conceptual hints based on the user's current progress.
- **Complexity Analysis:** Automatically calculates Time/Space complexity (Big O) after submission.

### ⚡ High-Performance Judge Engine
- **Sandboxed Execution:** code is executed securely via **Judge0** API.
- **Asynchronous Processing:** Utilizes **RabbitMQ** to handle massive submission spikes without blocking the main thread.
- **Real-time Feedback:** Results are streamed back to the client instantly via **SignalR**.

### 🏆 Gamification & Leaderboards
- **Redis Sorted Sets (ZSET):** Powers a real-time leaderboard capable of ranking 10,000+ users instantly with sub-millisecond latency.
- **Badge System:** Event-driven architecture triggers badge awards based on user achievements (e.g., "7-Day Streak").

### 🏗️ Architecture & Engineering
- **Modular Monolith:** The system is divided into isolated modules (`Identity`, `Problem`, `Submission`, `AI`) to strictly enforce **Domain-Driven Design (DDD)** principles.
- **CQRS Pattern:** Implemented using **MediatR** to separate Read and Write operations for optimized performance.
- **Resilience:** Integrated **Polly** for retry policies and circuit breakers when communicating with external services.

---

## 🛠️ Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Backend** | .NET 8 Web API, Entity Framework Core, MediatR, FluentValidation |
| **Frontend** | ReactJS (Vite), TypeScript, TailwindCSS, Monaco Editor (VS Code core) |
| **Database** | PostgreSQL (Data), Redis (Cache & Leaderboard) |
| **Messaging** | RabbitMQ (MassTransit) |
| **AI & Search** | Microsoft Semantic Kernel, OpenAI GPT-4o-mini |
| **DevOps** | Docker, Docker Compose, GitHub Actions |

---

## 📐 System Architecture

*(Place your Architecture Diagram here - You can export it from Draw.io)*
> The system follows the **Modular Monolith** pattern where each module encapsulates its own domain logic and persistence, communicating internally via MediatR and externally via RabbitMQ.

---

## 🏃‍♂️ Getting Started

### Prerequisites
- Docker Desktop
- .NET 8 SDK
- Node.js 18+

### Installation


# 🐞 Bug Calculator App | Full-Stack Microservices Project

![Microservices](https://img.shields.io/badge/Microservices-1_Service_Ready-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Auth_Service_Complete-brightgreen?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

**Educational full-stack project demonstrating microservices architecture with intentionally buggy calculator for testing practice.**

## 🎯 Project Overview

A comprehensive learning platform featuring:
- **🔐 Secure Authentication System** - Complete with GitHub OAuth
- **🧮 Buggy Calculator** - Mathematical operations with intentional bugs for testing practice
- **🐞 Bug Tracking** - Report and track discovered calculator bugs
- **🏆 Gamified Learning** - Achievement system for bug discovery

## 🏗 Architecture Status
bug-calculator-app/
├── ✅ 🛡 auth-service/ # COMPLETE - Authentication & Authorization
├── 🚧 🧮 calculator-service/ # PLANNED - Buggy calculator logic
├── 🚧 🐞 bug-service/ # PLANNED - Bug tracking & reporting
├── 🚧 ⚛️ frontend/ # PLANNED - React TypeScript application
└── 🚧 🐳 docker-compose.yml # PLANNED - Infrastructure setup

## 📊 Implementation Progress

### ✅ **Auth Service - COMPLETE**
- **JWT-based authentication** with refresh tokens
- **User registration & login** with email/password
- **GitHub OAuth integration** for social login
- **MongoDB user storage** with proper data modeling
- **Comprehensive Swagger API documentation**
- **Layered architecture** (Domain, Application, Infrastructure, Presentation)
- **Input validation & error handling**
- **Password hashing & security measures**

### 🚧 **Services Ready for Development**
- **Calculator Service** - Mathematical operations with hidden defects
- **Bug Tracking Service** - Bug reporting and user statistics
- **React Frontend** - Modern UI with TypeScript
- **Docker Infrastructure** - Containerized deployment

## 🛠 Tech Stack

### **Backend Services**
- **Node.js** with **TypeScript** - Type-safe development
- **Express.js** - REST API frameworks
- **MongoDB** - Document databases
- **JWT** - Secure authentication tokens
- **Swagger/OpenAPI** - API documentation
- **RabbitMQ** - Message broker (planned)

### **Frontend Application**
- **React 18** with **TypeScript** - Modern UI development
- **State management** - Context API or Redux
- **Modern UI framework** - Tailwind CSS or similar

### **DevOps & Infrastructure**
- **Docker** - Containerization
- **Docker Compose** - Local development environment
- **CI/CD pipelines** - Automated testing & deployment (planned)

## 🎯 Learning Objectives

- ✅ **Microservices Architecture** - Service decomposition & communication
- ✅ **Domain-Driven Design (DDD)** - Business logic organization
- ✅ **Layered Architecture Patterns** - Separation of concerns
- ✅ **API Design & Documentation** - RESTful principles & OpenAPI
- ✅ **Authentication & Authorization** - JWT, OAuth, security best practices
- 🚧 **Message Queue Systems** - RabbitMQ for inter-service communication
- 🚧 **Containerization** - Docker for development & deployment
- 🚧 **Testing Strategies** - Unit, integration, and end-to-end testing

## 🔐 Auth Service Features

### **Authentication Methods**
- **Email/Password** - Traditional registration & login
- **GitHub OAuth** - Social authentication flow
- **JWT Tokens** - Secure stateless authentication
- **Token Refresh** - Extended session management

### **User Management**
- **Registration** with email validation
- **Profile updates** with data validation
- **Account deactivation** 
- **Password reset** (planned)

### **Security**
- **Password hashing** with bcrypt
- **Input validation** at multiple layers
- **Error handling** without information leakage
- **CORS protection** & security headers

## ⚙️ Environment Configuration

Create `.env.local` file in each service root:

```env
# JWT Configuration
JWT_SECRET=your-super-secret-key-here-min-32-chars
JWT_EXPIRES_IN=24h
ISSUER=BUG-CALCULATOR-APP-AUTH-SERVICE

# Database
DATABASE_URL=mongodb://localhost:27017/bug-calculator-auth

# Security
SALTROUNDS=10

# Development
LOG_LEVEL=debug
ENABLE_DEBUG_ROUTES=true

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here
GITHUB_REDIRECT_URL=http://localhost:3000/auth/github/callback
```
🚀 Quick Start
Prerequisites
Node.js 18+

MongoDB

Docker (optional)

Auth Service Setup
bash
# Clone repository
git clone https://github.com/your-username/bug-calculator-app.git
cd bug-calculator-app/auth-service

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev

# Access API documentation
# http://localhost:3000/api-docs
Docker Setup (Planned)
bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f
📚 API Documentation
Available Endpoints
POST /auth-service/auth/register - User registration

POST /auth-service/auth/login - User login

POST /auth-service/auth/github - GitHub OAuth

POST /auth-service/auth/logout - User logout

GET /auth-service/health - Service health check

Interactive Documentation
Swagger UI: http://localhost:3000/api-docs

OpenAPI Spec: http://localhost:3000/api-docs/json

🔧 Development Guidelines
Code Architecture
Domain Layer - Business entities & logic

Application Layer - Use cases & services

Infrastructure Layer - External concerns (DB, APIs)

Presentation Layer - HTTP controllers & DTOs

Testing Strategy
Unit Tests - Business logic validation

Integration Tests - API endpoint testing

E2E Tests - Full user flow validation

🤝 Contributing
Fork the repository

Create feature branch (git checkout -b feature/amazing-feature)

Commit changes (git commit -m 'Add amazing feature')

Push to branch (git push origin feature/amazing-feature)

Open Pull Request

📝 License
This project is licensed under the MIT License - see the LICENSE.md file for details.

🎓 Educational Purpose
This project is designed for educational purposes to demonstrate:

Microservices architecture patterns

Full-stack development with TypeScript

Authentication & authorization systems

Testing and debugging strategies

Containerization and DevOps practices

🚀 Ready to continue building! The foundation is solid - time to add the calculator and bug tracking services!
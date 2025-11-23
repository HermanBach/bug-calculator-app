# bug-calculator-app
🎯 Full-Stack Educational Project | Microservices Architecture | Bug Tracking Calculator 🚀 Auth Service • Calculator Service • Bug Tracking Service • React Frontend 🛠 TypeScript • Node.js • React • MongoDB • Docker • RabbitMQ • Swagger

# 🐞 Bug Calculator App | Full-Stack Microservices Project

![Microservices](https://img.shields.io/badge/Microservices-1_Service_Ready-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Auth_Service_Live-brightgreen?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

**Educational full-stack project demonstrating microservices architecture with intentionally buggy calculator for testing practice.**

## 🏗 Project Architecture
bug-calculator-app/
├── 🛡 auth-service/ # Authentication & Authorization
├── 🧮 calculator-service/ # Buggy calculator logic
├── 🐞 bug-service/ # Bug tracking & reporting
├── ⚛️ frontend/ # React TypeScript application
└── 🐳 docker-compose.yml # Infrastructure setup

## 📈 Current Status

### ✅ Implemented
- **Auth Service** - Full implementation
- MongoDB integration with Docker
- Swagger API documentation
- Layered architecture pattern

### 🚧 Ready for Development
- Calculator Service (planned)
- Bug Tracking Service (planned) 
- React Frontend (planned)

## 🚀 Microservices

### 🔐 Auth Service
- **JWT-based authentication**
- **User registration & login**
- **MongoDB user storage**
- **Swagger API documentation**

### 🧮 Calculator Service 
- **Intentional bugs for testing practice**
- **Mathematical operations with hidden defects**
- **RabbitMQ message queue integration**

### 🐞 Bug Service
- **Bug reporting & tracking**
- **User bug discovery statistics**
- **Achievement system**

### ⚛️ Frontend Application
- **React with TypeScript**
- **Calculator UI with bug discovery**
- **Real-time bug reporting**

## 🛠 Tech Stack

### Backend
- **Node.js** with **TypeScript**
- **Express.js** frameworks
- **MongoDB** databases
- **RabbitMQ** message broker
- **JWT** authentication
- **Swagger/OpenAPI** documentation

### Frontend
- **React 18** with **TypeScript**
- **State management** (Context/Redux)
- **Modern UI framework**

### DevOps
- **Docker** containerization
- **Docker Compose** for local development
- **CI/CD** pipelines (planned)

## 🎯 Learning Objectives

- ✅ **Microservices Architecture**
- ✅ **Domain-Driven Design (DDD)**
- ✅ **Layered Architecture Patterns**
- ✅ **Message Queue Systems**
- ✅ **API Design & Documentation**
- ✅ **Containerization with Docker**
- ✅ **Testing & Debugging Strategies**

## ⚙️ Environment Configuration
Create `.env.local` file in each service root:

# JWT Configuration
JWT_SECRET=your-super-secret-key-here
JWT_EXPIRES_IN=24h
ISSUER=BUG-CALCULATOR-APP-AUTH-SERVICE

# Database
DATABASE_URL=mongodb:your_url

# Security
SALTROUNDS=10

# Development
LOG_LEVEL=debug
ENABLE_DEBUG_ROUTES=true

🚨 Important Security Notes
Never commit .env.local to version control - add to .gitignore

Use .env.example as a safe template for new developers

Generate strong JWT secrets (min. 32 characters)

Use different configurations per environment:

.env.local - Development

.env.production - Production

.env.test - Testing

📁 File Structure
auth-service/
├── .env.local          # ⚠️ Add to .gitignore
├── .env.example        # 📋 Template for developers
└── src/

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/your-username/bug-calculator-app.git
cd bug-calculator-app

# Start all services with Docker
docker-compose up -d

# Or run services individually
cd auth-service && npm run dev

🔧 First Time Setup
# 1. Copy environment template
cp .env.example .env.local

# 2. Edit with your values
nano .env.local

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev
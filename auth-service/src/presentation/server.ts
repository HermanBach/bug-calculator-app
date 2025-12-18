import 'dotenv-flow/config';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { MongoConnection } from '../infrastructure/database/Mongo.connection';
import { HealthController } from './controllers/HealthController';
import { swaggerSpec } from './swagger/swagger.config';
import { AuthController } from './controllers/AuthController';
import { logger } from '../infrastructure/logging/GraylogLogger';
import { AuthService } from '../application/services/AuthService';
import { MongoUserRepository } from '../infrastructure/database/MongoUserRepository';
import { MockEmailService } from '../infrastructure/email/MockEmailService';
import { JwtTokenService } from '../infrastructure/auth/JwtTokenService';
import { MongoEmailVerificationRepository } from '../infrastructure/database/MongoEmailVerificationRepository';
import { CodeGenerator } from '../infrastructure/auth/CodeGenerator';
import { EmailVerificationService } from '../infrastructure/auth/EmailVerificationService';

const userRepository = new MongoUserRepository();
const tokenService = new JwtTokenService();
const emailVerificationRepo = new MongoEmailVerificationRepository();
const emailService = new MockEmailService();
const codeGenerator = new CodeGenerator();

const emailVerificationService = new EmailVerificationService(
            emailVerificationRepo,
            emailService,
            codeGenerator
        );

const authService = new AuthService(
  userRepository, 
  tokenService,
  emailVerificationService,
  logger
);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const authController = new AuthController(authService, logger);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const startServer = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await MongoConnection.connect();
    console.log('✅ MongoDB connected - starting server...');
    
    app.listen(PORT, () => {
      console.log(`🚀 Auth service running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// endpoints
app.get('/auth-service/health', HealthController.check);
app.get('/auth-service/graylogCheck', HealthController.graylogCheck);
app.post('/auth-service/auth/register', (req, res) => authController.register(req, res));
app.post('/auth-service/auth/login', (req, res) => authController.login(req, res));
app.post('/auth-service/auth/logout', (req, res) => authController.logout(req, res));
app.post('/auth-service/auth/github', (req, res) => authController.github(req, res));
app.post('/auth-service/auth/request-verification', (req, res) => authController.requestVerification(req, res));
app.post('/auth-service/auth/verify-email', (req, res) => authController.verifyEmail(req, res));

startServer();
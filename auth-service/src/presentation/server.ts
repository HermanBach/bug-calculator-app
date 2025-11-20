import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { MongoConnection } from '../infrastructure/database/Mongo.connection';
import { HealthController } from './controllers/HealthController';
import { swaggerSpec } from './swagger/swagger.config';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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

startServer();

import { Request, Response } from "express";

export class HealthController {

  /**
   * @swagger
   * /auth-service/health:
   *   get:
   *     summary: Health check endpoint
   *     description: Returns service status and timestamp
   *     tags: [Health]
   *     responses:
   *       200:
   *         description: Service is healthy
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: "OK"
   *                 service:
   *                   type: string
   *                   example: "auth-service"
   *                 timestamp:
   *                   type: string
   *                   format: date-time
   */
    static check (req: Request, res: Response){
        res.json({
            status: 'OK',
            service: 'auth-service',
            timestamp: new Date ().toISOString()
        });
    }
}

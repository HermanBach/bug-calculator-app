import { Request, Response } from "express";
// HealthController.ts
/**
 * @swagger
 * /auth-service/health:
 *   get:
 *     summary: Health check сервиса
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Сервис работает
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 service:
 *                   type: string
 *                 timestamp:
 *                   type: string
 */

export class HealthController {
    static check (req: Request, res: Response){
        res.json({
            status: 'OK',
            service: 'auth-service',
            timestamp: new Date ().toISOString()
        });
    }
}

import { Request, Response } from "express";
import { logger } from "../../infrastructure/logging/GraylogLogger";
import { log } from "console";

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
    /**
     * @swagger
     * /api/health/graylog:
     *   get:
     *     summary: Проверка интеграции с Graylog
     *     description: |
     *       Отправляет тестовые логи различных уровней (INFO, DEBUG, WARN, ERROR) в Graylog.
     *       Используется для проверки корректности настройки логгирования и мониторинга системы.
     *       
     *       **Уровни логов:**
     *       - INFO: Информационные сообщения
     *       - DEBUG: Отладочная информация
     *       - WARN: Предупреждения
     *       - ERROR: Ошибки
     *       
     *       После вызова эндпоинта проверьте логи в Graylog на наличие тестовых сообщений.
     *     tags:
     *       - Health Check
     *     responses:
     *       200:
     *         description: Тестовые логи успешно отправлены в Graylog
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: "OK"
     *                   description: Статус выполнения операции
     *                 service:
     *                   type: string
     *                   example: "graylog"
     *                   description: Название проверяемого сервиса
     *                 timestamp:
     *                   type: string
     *                   format: date-time
     *                   example: "2024-01-15T10:30:00.000Z"
     *                   description: Время выполнения проверки в формате ISO 8601
     *       500:
     *         description: Внутренняя ошибка сервера
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     * 
     * components:
     *   schemas:
     *     Error:
     *       type: object
     *       properties:
     *         error:
     *           type: string
     *           description: Сообщение об ошибке
     *           example: "Internal server error"
     *         timestamp:
     *           type: string
     *           format: date-time
     *           description: Время возникновения ошибки
     */
    static graylogCheck(req: Request, res: Response){
        logger.info('Test log INFO');
        logger.debug('Test log DEBUGGER');
        logger.warn('Test log WARN');
        logger.error('Test log ERROR');

        res.json({
            status: 'OK',
            service: 'graylog',
            timestamp: new Date ().toISOString()
        });
    }
}

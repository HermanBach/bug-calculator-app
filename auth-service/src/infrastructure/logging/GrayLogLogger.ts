import { createLogger, transports, format } from "winston";
import { ILoggerService } from "../../domain/interfaces/ILoggerService";
import GraylogTransport from '@pskzcompany/winston-graylog';

export class GraylogLogger implements ILoggerService {
    private logger;
    
    constructor(serviceName: string = 'auth-service') {
        const graylogConfig = process.env.GRAYLOG_HOST ? {
            graylog: {
                servers: [
                    { 
                        host: process.env.GRAYLOG_HOST, 
                        port: parseInt(process.env.GRAYLOG_PORT || '12201') 
                    }
                ],
                facility: serviceName,
                hostname: require('os').hostname()
            }
        } : null;

        const transportList: any[] = [
            new transports.Console({
                format: format.combine(
                    format.colorize(),
                    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                    format.printf(({ timestamp, level, message, ...meta }) => {
                        const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
                        return `${timestamp} [${serviceName}] ${level}: ${message}${metaStr}`;
                    })
                )
            })
        ];
        if (graylogConfig) {
            transportList.push(new GraylogTransport(graylogConfig));
            console.log(`✅ Graylog logging enabled for ${serviceName}`);
        }
        this.logger = createLogger({
            level: process.env.LOG_LEVEL || 'info',
            format: format.combine(
                format.timestamp(),
                format.errors({stack:true}),
                format.json()
            ),
            defaultMeta: {
                service: serviceName,
                environment: process.env.NODE_ENV || 'development'
            },
            transports: transportList
        });
    }

    info(message: string, meta?: any){
         this.logger.info(message, meta);
    }
    error(message: string, meta?: any) {
        this.logger.error(message, meta);
    }

    warn(message: string, meta?: any) {
        this.logger.warn(message, meta);
    }

    debug(message: string, meta?: any) {
        this.logger.debug(message, meta);
    }
}

export const logger = new GraylogLogger('auth-service');
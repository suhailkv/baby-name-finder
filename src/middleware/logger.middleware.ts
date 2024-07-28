import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express'; 
import { Logger } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP'); 

    use(req: Request, res: Response, next: NextFunction) {
        const startAt = process.hrtime();

        const { method, originalUrl } = req;
        this.logger.log(`Request --> ${method} ${originalUrl}`);

        res.on('finish', () => {
            const diff = process.hrtime(startAt); 
            const responseTime = diff[0] * 1e3 + diff[1] * 1e-6;

            this.logger.log(
            `Response --> ${method} ${originalUrl} ${res.statusCode} ${res.statusMessage} +${responseTime.toFixed(2)}ms`
            );
        });
        next();
    }
}

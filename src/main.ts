import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './shared/logger/logger.service'; 
import { Logger } from 'winston';

async function bootstrap() {
// set up cluster later - production
    const app = await NestFactory.create(AppModule);
    const logger = await app
        .resolve(MyLogger)
        .catch(err => {
            console.error('Error resolving logger:', err); 
            return app.get(Logger);
        });

    app.useLogger(logger);

    await app.listen(3000);
    console.log('Server Started');
  
}

bootstrap();

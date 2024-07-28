import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './shared/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger:new MyLogger
  });
  await app.listen(3000);
}
bootstrap();

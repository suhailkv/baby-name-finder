import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BabyNamesModule } from './baby-names/baby-names.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [BabyNamesModule, UsersModule,TypeOrmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

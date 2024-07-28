import { Module } from '@nestjs/common';
import { BabyNamesController } from './baby-names.controller';
import { BabyNamesService } from './baby-names.service';

@Module({
  controllers: [BabyNamesController],
  providers: [BabyNamesService]
})
export class BabyNamesModule {}

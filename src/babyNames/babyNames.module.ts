import { Module } from '@nestjs/common';
import { BabyNamesService } from './babyNames.service';
import { BabyNamesController } from './babyNames.controller';
import { MongooseModule } from '@nestjs/mongoose'; // Import MongooseModule
import { BabyName, BabyNameSchema } from './babyName.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BabyName.name, schema: BabyNameSchema }]) 
  ],
  controllers: [BabyNamesController],
  providers: [BabyNamesService],
})
export class BabyNamesModule {}

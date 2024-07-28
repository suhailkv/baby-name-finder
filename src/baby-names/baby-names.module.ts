import { Module } from '@nestjs/common';
import { BabyNamesService } from './baby-names.service';
import { BabyNamesController } from './baby-names.controller';
import { MongooseModule } from '@nestjs/mongoose'; // Import MongooseModule
import { BabyName, BabyNameSchema } from './baby-name.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BabyName.name, schema: BabyNameSchema }]) 
  ],
  controllers: [BabyNamesController],
  providers: [BabyNamesService],
})
export class BabyNamesModule {}

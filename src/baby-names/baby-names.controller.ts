import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseFilters, NotFoundException, Logger } from '@nestjs/common';
import { BabyNamesService } from './baby-names.service';
import { BabyName } from './baby-name.entity';
import { CreateBabyNameDto } from './baby-name.dto';
// import { UpdateBabyNameDto } from './dto/update-baby-name.dto';
// import { HttpExceptionFilter } from '../shared/http-exception.filter'; 


@Controller('babyname')
// @UseFilters(HttpExceptionFilter)
export class BabyNamesController {
    constructor(private readonly babyNamesService: BabyNamesService) {}
    // protect
    @Post()
    async create(@Body() createBabyNameDto: CreateBabyNameDto): Promise<BabyName> {
        try {
            const newBabyName = await this.babyNamesService.create(createBabyNameDto);
            Logger.log(`Baby name created: ${newBabyName.name}`);
            return newBabyName;
        } catch (error) {
            Logger.error(`Error creating baby name: ${error.message}`); 
            throw error;
        }
    }

  //testing - remove in prodction
    @Get('seed')
    async test():Promise<undefined>{
        await this.babyNamesService.seedBabyNamesFromFile()
    }
    // protect -highly
    @Delete('remove-all') 
    async removeAll() {
        await this.babyNamesService.removeAll();
        return 'All baby names deleted successfully';
    }
    // open
    @Get()
    async findAll(@Query('page') page: number,@Query('limit') limit: number,@Query('gender') gender?: string,@Query('origin') origin?: string,@Query('search') search?: string): Promise<{ babyNames: BabyName[]; total: number }> {
        return this.babyNamesService.findAll(page, limit, gender, origin, search);
    }
    // do in filter and remove this 
    @Get(':name') 
    async findOne(@Param('name') name: string): Promise<BabyName> {
        try {
            const babyName = await this.babyNamesService.findByName(name);
            if (!babyName) {
                throw new NotFoundException(`Baby name with name ${name} not found`);
            }
            return babyName;
        } catch (error) {
            Logger.error(`Error fetching baby name: ${error.message}`);
            throw error;
        }
    }
// create this protect
  // UPDATE (you might not need this based on your app requirements)
//   @Put(':id')
//   async update(
//     @Param('id') id: string,
//     @Body() updateBabyNameDto: UpdateBabyNameDto
//   ): Promise<BabyName> {
//     try {
//       const updatedBabyName = await this.babyNamesService.update(id, updateBabyNameDto);
//       if (!updatedBabyName) {
//         throw new NotFoundException(`Baby name with ID ${id} not found`);
//       }
//       Logger.log(`Baby name updated: ${updatedBabyName.name}`);
//       return updatedBabyName;
//     } catch (error) {
//       Logger.error(`Error updating baby name: ${error.message}`);
//       throw error;
//     }
//   }

  // DELETE (you might not need this based on your app requirements)
//   @Delete(':id')
//   async remove(@Param('id') id: string) {
//     try {
//       const deletedBabyName = await this.babyNamesService.remove(id);
//       if (!deletedBabyName) {
//         throw new NotFoundException(`Baby name with ID ${id} not found`);
//       }
//       Logger.log(`Baby name deleted: ${deletedBabyName.name}`);
//       return deletedBabyName; 
//     } catch (error) {
//       Logger.error(`Error deleting baby name: ${error.message}`);
//       throw error;
//     }
//   }
}


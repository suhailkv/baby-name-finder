import { Injectable ,Logger} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BabyName, BabyNameDocument } from './baby-name.entity'; 
import * as fs from 'fs'
// import { CreateBabyNameDto } from './dto/create-baby-name.dto';
// import { UpdateBabyNameDto } from './dto/update-baby-name.dto';

@Injectable()
export class BabyNamesService {
    constructor(@InjectModel(BabyName.name) private babyNameModel: Model<BabyNameDocument>) {}
    // shoul be protected
    async create(createBabyNameDto: any): Promise<BabyName> { // Update with your DTO 
        const createdBabyName = new this.babyNameModel(createBabyNameDto);
        return createdBabyName.save();
    }
    // should be open
    async findAll(page = 1, limit = 100, gender?: string,origin?: string,search?: string,): Promise<{ babyNames: BabyName[]; total: number }> {
        try {
            
            const skip = (page - 1) * limit; 

            const filter: any = {};
            if (gender) filter.gender = gender;
            if (origin) filter.origin = origin;
            if (search) filter.name = { $regex: search, $options: 'i' };

            const total = await this.babyNameModel.countDocuments(filter);

            const babyNames = await this.babyNameModel
                .find(filter)
                .skip(skip)
                .limit(limit)
                .exec();

            Logger.log(`Retrieved ${babyNames.length} baby names (page ${page}, limit ${limit})`);
            return { babyNames, total };
        } catch (error) {
            Logger.error(`Error fetching baby names: ${error.message}`);
            throw error;
        }
    }
    // open
    async findOne(id: string): Promise<BabyName> {
        return this.babyNameModel.findById(id).exec();
    }
    // open - no need if filter is done
    async findByName(name: string): Promise<BabyName> {
        return this.babyNameModel.findOne({ name }).exec();
    }
    // should protect
    async update(id: string, updateBabyNameDto: any): Promise<BabyName> { // Update with your DTO
        return this.babyNameModel.findByIdAndUpdate(id, updateBabyNameDto, { new: true }).exec();
    }
    // should protect
    async remove(id: string) {
    // return this.babyNameModel.findByIdAndRemove(id).exec();
    }
    // should protect
    async removeAll(): Promise<void> {
        try {
            const result = await this.babyNameModel.deleteMany({});
        } catch (error) {
            Logger.error('Error deleting baby names:', error);
            throw error; 
        }
    }
    // should remove in producgtion
    async seedBabyNamesFromFile(): Promise<void> {
        try {
            const filePath = 'C:\\Users\\suhail\\Downloads\\names.json'
            const jsonData = fs.readFileSync(filePath, 'utf-8');
            const babyNamesData: BabyName[] = JSON.parse(jsonData);
            const uniqueBabyNames = babyNamesData.filter((babyName, index, self) =>
                index === self.findIndex((b) => b.name === babyName.name)
            );
            const result = await this.babyNameModel.insertMany(uniqueBabyNames);
            Logger.log(`Successfully seeded ${result.length} baby names.`);
        } catch (error) {
            Logger.error('Error seeding baby names:', error);
            throw error; 
        }
    }
}

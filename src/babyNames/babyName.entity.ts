import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BabyNameDocument = BabyName & Document;

@Schema()
export class BabyName {
    @Prop({ unique: true }) 
    name: string;

    @Prop()
    gender: string;

    @Prop({ default: 0 })
    popularity: number;

    @Prop()
    meaning: string;

    @Prop()
    origin: string;

    @Prop()
    syllableCount: number;

    @Prop()
    syllables: string;
    @Prop({default:null})
    like:boolean | null;

    @Prop({default:null})
    likedBy:string;
}

export const BabyNameSchema = SchemaFactory.createForClass(BabyName);

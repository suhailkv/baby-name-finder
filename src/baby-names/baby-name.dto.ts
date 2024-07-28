import { IsString, IsNotEmpty, IsOptional, IsNumber, IsPositive } from 'class-validator';

export class CreateBabyNameDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    gender: string;

    @IsNumber()
    @IsOptional()
    @IsPositive()
    popularity?: number;

    @IsString()
    @IsOptional()
    meaning?: string;

    @IsString()
    @IsOptional()
    origin?: string;

    @IsNumber()
    @IsOptional()
    @IsPositive()
    syllableCount?: number;

    @IsString()
    @IsOptional()
    syllables?: string;
}

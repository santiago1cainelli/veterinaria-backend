import { Repository } from 'typeorm';
import { Instructor } from './entities/instructor.entity';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
export declare class InstructoresService {
    private readonly repo;
    constructor(repo: Repository<Instructor>);
    create(dto: CreateInstructorDto): Promise<Instructor>;
    findAll(): Promise<Instructor[]>;
    findOne(id: number): Promise<Instructor>;
    update(id: number, dto: UpdateInstructorDto): Promise<Instructor>;
    remove(id: number): Promise<{
        message: string;
    }>;
}

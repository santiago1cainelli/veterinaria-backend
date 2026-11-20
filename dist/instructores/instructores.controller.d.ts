import { InstructoresService } from './instructores.service';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
export declare class InstructoresController {
    private readonly service;
    constructor(service: InstructoresService);
    create(dto: CreateInstructorDto): Promise<import("./entities/instructor.entity").Instructor>;
    findAll(): Promise<import("./entities/instructor.entity").Instructor[]>;
    findOne(id: number): Promise<import("./entities/instructor.entity").Instructor>;
    update(id: number, dto: UpdateInstructorDto): Promise<import("./entities/instructor.entity").Instructor>;
    remove(id: number): Promise<{
        message: string;
    }>;
}

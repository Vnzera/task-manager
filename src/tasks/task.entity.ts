import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { TaskStatus } from './task-status.enum';

// this entity describes the structure of our Tasks as it pertains to postgres
// similar to how Task model/interface defines the structure pertaining to req/res data

@Entity()
export class Task extends BaseEntity {
    // this decorator causes an id to be generated for each entry
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;
}
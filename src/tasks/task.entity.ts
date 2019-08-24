import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { TaskStatus } from './task-status.enum';

// this entity describes the structure of our Tasks as it pertains to postgres
// similar to how Task model defines the structure pertaining to req/res data

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;
}
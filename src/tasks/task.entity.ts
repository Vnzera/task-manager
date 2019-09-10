import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';

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
    // this relation creates a userId column under the head so we should define it in this Entity
    @ManyToOne(type => User, user => user.tasks, { eager: false })
    user: User;

    @Column()
    userId: number;
}
import { Controller, Query, Get, Post, Delete, Body, Param, Patch, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';

// The controller is responsible for handling requests to our routes. It also uses methods in our task service

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }
    // extract filterDto properties from Query parameters
    // if either search or status was provided then we call getTasksWithFilters
    // if none are provided then we simply retrieve all tasks

    //     @Get()
    //     getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
    //         if (Object.keys(filterDto).length) {
    //             return this.tasksService.getTasksWithFilters(filterDto);
    //         } else {
    //             return this.tasksService.getAllTasks();
    //         }
    //     }

    //     // /:id is a url parameter that the front end must provide in the request
    // @Param tells NestJS to look for the 'id' parameter in the request
    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    // @Body and createTaskDto work together here
    // NestJS searches the @Body of the request for Dto data ie 'title' 'description'
    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.tasksService.deleteTask(id);
    }

    //     @Patch('/:id/status')
    //     updateTaskStatus(
    //         @Param('id') id: string,
    //         @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    //     ): Task {
    //         return this.tasksService.updateTaskStatus(id, status);
    //     }
}

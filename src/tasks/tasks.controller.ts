import { Controller, Query, Get, Post, Delete, Body, Param, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

// The controller is responsible for handling requests to our routes. It also uses methods in our task service

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }
    // extract filterDto properties from Query parameters
    // if either search or status was provided then we call getTasksWithFilters
    // if none are provided then we simply retrieve all tasks
    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
        if (Object.keys(filterDto).length) {
            return this.tasksService.getTasksWithFilters(filterDto);
        } else {
            return this.tasksService.getAllTasks();
        }
    }

    // /:id is a url parameter that the front end must provide in the request
    // @Param tells NestJS to look for the 'id' parameter in the request
    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string) {
        return this.tasksService.deleteTaskById(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus,
    ): Task {
        return this.tasksService.updateTaskStatus(id, status);
    }


    // @Body and createTaskDto work together here
    // NestJS searches the @Body of the request for Dto data ie 'title' 'description'
    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto);
    }
}

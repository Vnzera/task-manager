import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

// here we are using Pipes to store validation logic 

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ]

    transform(value: any) {
        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value}" is not a valid status`);
        }
        return value;
    }

    private isStatusValid(status: any) {
        // we check to see if we can find the status provided in the array of allowed statuses
        // indexOf will return -1 if the status is not found aka not allowed
        const idx = this.allowedStatuses.indexOf(status);
        // if idx is -1 then we return false since the status is not allowed
        return idx !== -1;
    }
}

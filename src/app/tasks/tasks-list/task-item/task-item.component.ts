import {Component, computed, inject, input} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {Task, TASK_STATUS_OPTIONS, TaskStatus, TaskStatusOptions, taskStatusOptionsProvider} from '../../task.model';
import {TasksService} from "../../tasks.service";

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
  providers: [taskStatusOptionsProvider],
})
export class TaskItemComponent {

  private taskService = inject(TasksService);

  taskStatusOptions = inject(TASK_STATUS_OPTIONS);

  task = input.required<Task>();
  taskStatus = computed(() => {
    switch (this.task().status) {
      case 'OPEN':
        return 'Open';
      case 'IN_PROGRESS':
        return 'Working on it';
      case 'DONE':
        return 'Completed';
      default:
        return 'Open';
    }
  });

  onChangeTaskStatus(taskId: string, status: string) {
    let newStatus: TaskStatus = 'OPEN';

    switch (status) {
      case 'open':
        newStatus = 'OPEN';
        break;
      case 'in-progress':
        newStatus = 'IN_PROGRESS';
        break;
      case 'done':
        newStatus = 'DONE';
        break;
      default:
        break;
    }

    this.taskService.updateTaskStatus(taskId, newStatus);
  }
}

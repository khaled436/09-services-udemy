import {inject, Injectable, signal} from '@angular/core';
import {Task, TaskStatus} from "./task.model";
import {LoggingService} from "../logging.service";

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks = signal<Task[]>([])

  allTaks = this.tasks.asReadonly();
  private loggingService = inject(LoggingService);

  addTask(task: { title: string, description: string }) {

    const newTask: Task = {
      ...task,
      id: Math.random().toString(),
      status: 'OPEN',
    }

    this.tasks.update((oldTaks) => [...this.tasks(), newTask])

    this.loggingService.log(`New task added: ${task.title}`);
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((odlTasks) =>
      odlTasks.map((task) =>
        task.id === taskId ? {...task, status: newStatus} : task));
    this.loggingService.log(`Task ${taskId} status changed to ${newStatus}`);
  }
}

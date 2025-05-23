import {Injectable, signal} from '@angular/core';
import {Task} from "./task.model";

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks = signal<Task[]>([])

  allTaks = this.tasks.asReadonly();

  addTask(task: {title: string, description: string}) {

    const newTask : Task = {
      ...task,
      id: Math.random().toString(),
      status: 'OPEN',
    }

    this.tasks.update((oldTaks) => [...this.tasks(), newTask])
  }
}

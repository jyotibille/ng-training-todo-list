import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.css']
})
export class TaskForm {

  isEditMode = false;

  users = ['Jyoti', 'Ravi', 'Anita']; // All possible users
  statuses = ['Not Started', 'In Progress', 'Completed'];
  priorities = ['Low', 'Normal', 'High'];

  task: Task & { dueDateString?: string } = {
  id: 0,
  title: '',
  description: '',
  assignedTo: undefined,  // no default user
  status: undefined,      // no default status
  dueDate: undefined,     // no default date
  priority: undefined,    // no default priority
  completed: false
};


  dueDateError = ''; // For past date validation

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      const existingTask = this.taskService.getTasks().find(t => t.id === +id);
      if (existingTask) {
        this.task = { ...existingTask };
        this.task.dueDateString = this.formatDateForInput(existingTask.dueDate ?? new Date());
      }
    }
  }

  formatDateForInput(date: Date | string): string {
    if (!date) return '';
    const d = new Date(date);
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }

  onDueDateChange(): void {
    if (!this.task.dueDateString) {
      this.dueDateError = '';
      return;
    }

    const selectedDate = new Date(this.task.dueDateString);
    const today = new Date();
    today.setHours(0,0,0,0); // Reset time

    if (selectedDate < today) {
      this.dueDateError = 'Due date cannot be in the past';
    } else {
      this.dueDateError = '';
      this.task.dueDate = selectedDate;
    }
  }

  saveTask(): void {
    // Required validations
    if (!this.task.assignedTo || !this.task.status || !this.task.priority) {
      return;
    }

    // If dueDateString is selected, convert to Date
    if (this.task.dueDateString && !this.dueDateError) {
      this.task.dueDate = new Date(this.task.dueDateString);
    }

    if (this.isEditMode) {
      this.taskService.updateTask(this.task);
    } else {
      this.taskService.addTask(this.task);
    }
    this.router.navigate(['/']);
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}

import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks: Task[] = [
    {
      id: 1,
      title: 'Design To-Do List UI',
      description: 'Create UI as per provided wireframes using SLDS',
      assignedTo: 'Jyoti',
      status: 'In Progress',
      dueDate: new Date('2026-02-05'),
      priority: 'High',
      comments: 'This task is Good',
      completed: false
    },
    {
      id: 2,
      title: 'Implement TaskService',
      description: 'Add CRUD operations for tasks',
      assignedTo: 'Jyoti',
      status: 'Completed',
      dueDate: new Date('2026-02-02'),
      priority: 'Normal',
      comments: 'This task is Good',
      completed: true
    },
    {
      id: 3,
      title: 'Write Unit Tests',
      description: 'Write Mocha unit tests for services and components',
      assignedTo: 'Jyoti',
      status: 'Not Started',
      dueDate: new Date('2026-02-08'),
      priority: 'Low',
      comments: 'This task is Good',
      completed: false
    },
    {
      id: 4,
      title: 'Fix Login Bug',
      description: 'Resolve login error on invalid credentials',
      assignedTo: 'Ravi',
      status: 'In Progress',
      dueDate: new Date('2026-02-04'),
      priority: 'High',
      comments: 'Bug needs urgent fix',
      completed: false
    },
    {
      id: 5,
      title: 'Update User Profile UI',
      description: 'Redesign user profile page as per new guidelines',
      assignedTo: 'Anita',
      status: 'Not Started',
      dueDate: new Date('2026-02-10'),
      priority: 'Normal',
      comments: 'Follow new design mockups',
      completed: false
    },
    {
      id: 6,
      title: 'Optimize Database Queries',
      description: 'Improve performance of dashboard queries',
      assignedTo: 'Ravi',
      status: 'Completed',
      dueDate: new Date('2026-02-03'),
      priority: 'High',
      comments: 'Performance optimized successfully',
      completed: true
    },
    {
      id: 7,
      title: 'Write API Documentation',
      description: 'Create detailed API documentation for all endpoints',
      assignedTo: 'Jyoti',
      status: 'In Progress',
      dueDate: new Date('2026-02-07'),
      priority: 'Low',
      comments: 'Documentation in progress',
      completed: false
    },
    {
      id: 8,
      title: 'Implement Notifications',
      description: 'Add email and push notifications',
      assignedTo: 'Anita',
      status: 'Not Started',
      dueDate: new Date('2026-02-12'),
      priority: 'Normal',
      comments: 'Notifications not yet implemented',
      completed: false
    },
    {
      id: 9,
      title: 'Code Review',
      description: 'Review pull requests from the development team',
      assignedTo: 'Ravi',
      status: 'In Progress',
      dueDate: new Date('2026-02-06'),
      priority: 'Low',
      comments: 'Pending review of 5 PRs',
      completed: false
    },
    {
      id: 10,
      title: 'Deploy to Production',
      description: 'Deploy latest version to production environment',
      assignedTo: 'Jyoti',
      status: 'Not Started',
      dueDate: new Date('2026-02-09'),
      priority: 'High',
      comments: 'Deployment scheduled',
      completed: false
    }
  ];

  private nextId = 11;

  // Get all tasks
  getTasks(): Task[] {
    return [...this.tasks];
  }

  // Add new task
  addTask(task: Omit<Task, 'id'>): void {
    const newTask: Task = {
      id: this.nextId++,
      ...task,
      completed: task.completed ?? false
    };
    this.tasks.push(newTask);
  }

  // Update existing task
  updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = { ...updatedTask };
    }
  }

  // Delete task
  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}

import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);

    // Clear tasks before each test to isolate them
    service['tasks'] = [];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a task', () => {
    service.addTask({
      title: 'Test Task',
      description: 'Test Description',
      completed: false
    });

    const tasks = service.getTasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe('Test Task');
  });

  it('should delete a task', () => {
    service.addTask({
      title: 'Task to delete',
      completed: false
    });

    const taskId = service.getTasks()[0].id;
    service.deleteTask(taskId);

    const tasksAfterDelete = service.getTasks();
    expect(tasksAfterDelete.length).toBe(0);
  });
});

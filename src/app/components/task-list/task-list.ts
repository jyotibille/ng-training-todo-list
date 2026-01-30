import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css'],
})
export class TaskList {

  allTasks: (Task & { selected?: boolean })[] = [];
  filteredTasks: (Task & { selected?: boolean })[] = [];
  tasks: (Task & { selected?: boolean })[] = [];

  searchTerm = '';
  currentPage = 1;
  pageSize = 5;
  totalPages = 1;

  totalRecords = 0;
  filteredRecords = 0;

  selectAll = false;

  showDeleteModal = false;
  taskToDelete!: Task | null;

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {
    this.loadTasks();
  }

  loadTasks(): void {
    // Add a `selected` property to each task for checkbox
    this.allTasks = this.taskService.getTasks().map(t => ({
      ...t,
      selected: false
    }));
    this.totalRecords = this.allTasks.length;
    this.applyFilters();
  }

  refreshTasks(): void {
    this.searchTerm = '';
    this.selectAll = false;
    this.currentPage = 1;
    this.loadTasks();
  }

  addTask(): void {
    this.router.navigate(['/add']);
  }

  editTask(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  /* ===== DELETE MODAL ===== */
  openDeleteModal(task: Task): void {
    this.taskToDelete = task;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.taskToDelete = null;
  }

  confirmDelete(): void {
    if (this.taskToDelete) {
      this.taskService.deleteTask(this.taskToDelete.id);
      this.closeDeleteModal();
      this.loadTasks();
    }
  }

  /* ===== SEARCH ===== */
  searchTasks(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  applyFilters(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredTasks = this.allTasks.filter(task =>
      task.assignedTo?.toLowerCase().includes(term) ||
      task.status?.toLowerCase().includes(term) ||
      task.priority?.toLowerCase().includes(term) ||
      task.description?.toLowerCase().includes(term)
    );

    this.filteredRecords = this.filteredTasks.length;
    this.totalPages = Math.max(1, Math.ceil(this.filteredRecords / this.pageSize));

    const start = (this.currentPage - 1) * this.pageSize;
    this.tasks = this.filteredTasks.slice(start, start + this.pageSize);
  }

  /* ===== PAGINATION ===== */
  goToPage(page: number): void {
    this.currentPage = page;
    this.applyFilters();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyFilters();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.applyFilters();
    }
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  /* ===== CHECKBOX LOGIC ===== */
  toggleSelectAll(): void {
    this.tasks.forEach(t => t.selected = this.selectAll);
  }

  updateSelectAllState(): void {
    this.selectAll = this.tasks.every(t => t.selected);
  }
}

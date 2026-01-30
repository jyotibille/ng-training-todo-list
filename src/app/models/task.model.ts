export interface Task {
  id: number;
  title: string;
  description?: string;
  assignedTo?: string;
  status?: 'Not Started' | 'In Progress' | 'Completed';
  dueDate?: Date;
  priority?: 'Low' | 'Normal' | 'High';
  comments?: string;        // ✅ Added
  completed: boolean;
  selected?: boolean;
}

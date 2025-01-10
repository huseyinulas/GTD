export type TaskStatus = 'in' | 'next' | 'waiting' | 'reference' | 'someday' | 'done' | 'trash';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  createdAt: string;
  completedAt?: string;  // ISO date string for when task was completed
  context?: string;
  project?: string;
  notes?: string;
  delegatedTo?: string;
  delegatedDate?: string;
  dueDate?: string;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  status: 'active' | 'someday' | 'completed';
  createdAt: string;
  completedAt?: string;  // ISO date string for when project was completed
}

export interface GTDContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'createdAt'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  projects: Project[];
  addProject: (project: Omit<Project, 'createdAt'>) => void;
  updateProject: (project: Project) => void;
  deleteProject: (projectId: string) => void;
  contexts: string[];
  clearAllData: () => void;
}

export interface SortOption {
  value: 'newest' | 'oldest';
  label: string;
}

export const SORT_OPTIONS: SortOption[] = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' }
]; 
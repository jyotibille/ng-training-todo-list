import { Routes } from '@angular/router';
import { TaskList } from './components/task-list/task-list';
import { TaskForm } from './components/task-form/task-form';

export const routes: Routes = [
    { path: '', component: TaskList },  
    {
        path:'task-list', component:TaskList
    },
   
 { path: 'add', component: TaskForm },  // 👈 REQUIRED
  { path: 'edit/:id', component: TaskForm }

];

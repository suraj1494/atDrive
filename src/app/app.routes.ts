import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'',redirectTo:'userList',pathMatch:'full'},
    {
        path:'userList',
        loadComponent : () => import('./user-list/user-list.component').then((mod)=>mod.UserListComponent)
    }
];

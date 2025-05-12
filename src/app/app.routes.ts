import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { NoAuthGuard } from './noauth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),canActivate: [NoAuthGuard],
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),canActivate: [AuthGuard],
    },
    {
        path: 'register',
        loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent),canActivate: [NoAuthGuard],
    },
    {
        path: '**',
        redirectTo: 'login',
    }
];

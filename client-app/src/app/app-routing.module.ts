import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { 
    path: 'auth', loadChildren: () => import('./auth-module/auth.module').then(m => m.AuthModule),
  },
  {
    path: '', 
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  { 
    path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), 
    canActivateChild: [AuthGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

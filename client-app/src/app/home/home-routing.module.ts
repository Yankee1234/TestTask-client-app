import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { TapeComponent } from './tape/tape.component';

const routes: Routes = [
  { 
    path: '', component: HomeComponent
  },
  {
    path: 'tape', component: TapeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

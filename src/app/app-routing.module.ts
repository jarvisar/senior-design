import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExoplanetComponent } from './exoplanet/exoplanet.component';

const routes: Routes = [
  {
    path: 'inputbar',
    loadChildren: () => import('./inputbar/inputbar.component').then(m => m.InputbarComponent),
    
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

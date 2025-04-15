import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivresComponent } from './pages/livres/livres.component';

const routes: Routes = [
  { path: '', redirectTo: 'livres', pathMatch: 'full' },
  { path: 'livres', component: LivresComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

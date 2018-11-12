import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { StartPageComponent } from './start-page/start-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';

const routes: Routes = [
  {path: '', component: StartPageComponent},
  {path: 'detail-page', component: DetailPageComponent},
  { path: '', redirectTo: '/start-page', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

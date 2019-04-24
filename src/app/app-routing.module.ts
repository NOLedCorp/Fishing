import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FishingsComponent } from './fishings/fishings.component';
import { BanksComponent } from './banks/banks.component';
import { CatchComponent } from './catch/catch.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'fishings', component: FishingsComponent},
  { path: 'banks', component: BanksComponent},
  { path: 'catch', component: CatchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

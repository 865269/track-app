import { LoginComponent } from './login/login.component';
import { ActivitiesComponent } from './activities/activities.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityEventsComponent } from './activity-events/activity-events.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'activities', component: ActivitiesComponent },
  { path: 'activities/:id/events', component: ActivityEventsComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

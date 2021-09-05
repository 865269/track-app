import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActivityEventsComponent } from './activity-events/activity-events.component';
import { ActivitiesComponent } from './activities/activities.component';
import { OrderByPipe } from './pipes/order-by.pipe';
import { NgPipesModule } from 'ngx-pipes';


@NgModule({
  declarations: [
    AppComponent,
    ActivityEventsComponent,
    ActivitiesComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgPipesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

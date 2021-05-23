import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Activity } from './activity';
import { ActivityService } from './activity-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public activities: Activity[] = [];

  constructor(private activityService: ActivityService) { }


  public getActivities(): void {
    this.activityService.getActivities().subscribe(
      (response: Activity[]) => {
        this.activities = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  ngOnInit(): void {
    this.getActivities();
  }

}

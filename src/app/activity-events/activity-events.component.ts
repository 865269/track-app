import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from '../activities/activity';
import { ActivityService } from '../services/activity-service';

@Component({
  selector: 'app-activity-events',
  templateUrl: './activity-events.component.html',
  styleUrls: ['./activity-events.component.css']
})
export class ActivityEventsComponent implements OnInit {

  public activity: Activity = { id: -1, title: "", description: "", created: new Date, imageUrl: "", events: [] };

  constructor(private activityService: ActivityService, private route: ActivatedRoute) { }

  public getActivity(id: number): void {
    this.activityService.getActivity(id).subscribe(
      (response: Activity) => {
        this.activity = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
    });

    //this.getActivity(id);
  }

}

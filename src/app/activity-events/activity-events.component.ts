import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, provideRoutes } from '@angular/router';
import { Activity } from '../activities/activity';
import { ActivityService } from '../services/activity-service';
import { Rating } from './rating';

@Component({
  selector: 'app-activity-events',
  templateUrl: './activity-events.component.html',
  styleUrls: ['./activity-events.component.css']
})
export class ActivityEventsComponent implements OnInit {

  public activity: Activity = { id: -1, title: "", description: "", created: new Date, imageUrl: "", events: [] };
  public selectedFile: any;
  public currentDate: Date = new Date();
  public id: number = -1;
  public ratings: Rating[] = [{ id: 1, name: "POOR", colour: "red" }, { id: 2, name: "BELOW_AVERAGE", colour: "red" }, { id: 3, name: "AVERAGE", colour: "orange" },
  { id: 4, name: "GOOD", colour: "green" }, { id: 5, name: "EXCELLENT", colour: "green" }];

  constructor(private activityService: ActivityService, private route: ActivatedRoute) { }

  public getActivity(id: number): void {
    this.activityService.getActivity(id).subscribe(
      (response: Activity) => {
        this.activity = response;
        console.log("activity", this.activity)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  onFileChanged(event: any, activityId: number) {

    this.selectedFile = event.target.files[0];
    this.onUpload(activityId);
  }

  onUpload(activityId: number) {

    const uploadData = new FormData();
    uploadData.append('file', this.selectedFile);

    this.activityService.uploadActivityImage(uploadData, activityId)
      .subscribe((response) => {
        console.log("file upload response", response);
        this.ngOnInit();
      },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  updateActivity(activity: Activity): void {
    this.activityService.updateActivity(activity).subscribe(
      (response: Activity) => {
        this.getActivity(activity.id);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  addEvent(addEventForm: NgForm): void {
    document.getElementById('add-event-close')?.click();
    this.activityService.addEvent(addEventForm.value, this.id).subscribe(
      (response: Event) => {
        this.getActivity(this.id);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
    addEventForm.reset();
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.id = parseInt(params.get('id') || "-1");
    });

    this.getActivity(this.id);
  }

}


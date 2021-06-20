import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivityService } from '../services/activity-service';
import { Activity } from './activity';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

  public activities: Activity[] = [];
  public selectedFile: any;
  public currentPageNumber: number = 0;
  public totalPages: number = 0;
  public pages: number[] = [];


  constructor(private activityService: ActivityService) { }


  public getActivities(): void {
    this.activityService.getActivities().subscribe(
      (response: Activity[]) => {
        console.log("all activities", response)
        this.activities = response;
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

  addActivity(addActivityForm: NgForm): void {
    document.getElementById('add-activity-close')?.click();
    this.activityService.addActivity(addActivityForm.value).subscribe(
      (response: Activity) => {
        this.getPageOfActivities(this.currentPageNumber, 3);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
    addActivityForm.reset();
  }

  updateActivity(activity: Activity): void {
    this.activityService.updateActivity(activity).subscribe(
      (response: Activity) => {
        this.getPageOfActivities(this.currentPageNumber, 3);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  deleteActivity(activityId: number, activityTitle: string): void {

    if (confirm("Are you sure you want to delete " + activityTitle)) {
      this.activityService.deleteActivity(activityId).subscribe(
        () => {
          this.getActivities();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }

  }

  public getPageOfActivities(page: number, size: number): void {

    if (page >= 0 || page <= this.totalPages) {
      this.activityService.getPageOfActivities(page, size).subscribe(
        (response: any) => {
          console.log("page activities", response)
          this.activities = response.content;
          this.currentPageNumber = response.number;
          this.totalPages = response.totalPages;
          this.pages = Array.from(Array(response.totalPages).keys());
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }


  }

  ngOnInit(): void {
    this.getPageOfActivities(0, 3);
  }

}

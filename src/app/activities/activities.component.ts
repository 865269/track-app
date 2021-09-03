import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
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
  public innerWidth: any;


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

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.innerWidth = event.target.innerWidth;
    this.getPageForScreenSize(this.innerWidth, this.currentPageNumber);
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.getPageForScreenSize(this.innerWidth, 0);

  }

  public getPageForScreenSize(width: number, page: number): void {
    if (width <= 700) {
      this.getPageOfActivities(page, 1);
    } else if (width > 700 && width <= 1000) {
      this.getPageOfActivities(page, 2);
    } else {
      this.getPageOfActivities(page, 3);
    }
  }

}

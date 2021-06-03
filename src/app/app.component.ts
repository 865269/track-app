import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Activity } from './activity';
import { ActivityService } from './services/activity-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public activities: Activity[] = [];
  public selectedFile: any;

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

  newActivity(activity: Activity) {
    console.log("activity");
  }

  ngOnInit(): void {
    this.getActivities();
  }

}

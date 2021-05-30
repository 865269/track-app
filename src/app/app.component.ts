import { FileUploadService } from './services/file.upload-service';
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

  constructor(private activityService: ActivityService, private fileUploadService: FileUploadService) { }


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

  onFileChanged(event: any) {

    this.selectedFile = event.target.files[0];

    this.onUpload();
  }

  onUpload() {

    const uploadData = new FormData();
    uploadData.append('file', this.selectedFile);

    this.fileUploadService.uploadFile(uploadData)
      .subscribe((response) => {
        console.log("file upload response", response);
      },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  ngOnInit(): void {
    this.getActivities();
  }

}

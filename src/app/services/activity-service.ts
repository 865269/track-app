import { Activity } from '../activity';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {

    private apiUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public getActivities(): Observable<Activity[]> {
        return this.http.get<Activity[]>(this.apiUrl + '/activities/all/');
    }

    public addActivity(activity: Activity): Observable<Activity> {
        return this.http.post<Activity>(this.apiUrl + '/activities/add', activity);
    }

    public deleteActivity(activityId: number): Observable<void> {
        return this.http.delete<void>(this.apiUrl + '/activities/delete/' + activityId);
    }

    public uploadActivityImage(uploadData: FormData): Observable<void> {
        return this.http.post<void>(this.apiUrl + '/activities/image/upload', uploadData);
    }
}
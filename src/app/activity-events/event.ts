import { Activity } from "../activities/activity";

export interface Event {
    id: number;
    title: string;
    created: Date;
    description: string;
    rating: number
    activity: Activity;
    [key: string]: any;
}
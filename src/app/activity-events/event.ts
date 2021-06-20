import { Rating } from './rating';
import { Activity } from "../activities/activity";

export interface Event {
    id: number;
    title: string;
    created: Date;
    description: string;
    rating: Rating;
    activity: Activity;
    [key: string]: any;
}
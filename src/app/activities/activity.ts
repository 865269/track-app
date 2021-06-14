import { Event } from './../activity-events/event';

export interface Activity {
    id: number;
    title: string;
    created?: Date;
    description?: string;
    imageUrl?: string;
    events: Event[];
    [key: string]: any;
}
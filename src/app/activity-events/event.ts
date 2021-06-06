export interface Activity {
    id: number;
    title: string;
    created?: Date;
    description?: string;
    rating: number
    activity: Activity;
    [key: string]: any;
}
export interface Activity {
    id: number;
    title: string;
    created?: Date;
    description?: string;
    imageUrl?: string;
    [key: string]: any;
}
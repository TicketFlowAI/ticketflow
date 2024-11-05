export interface IToastMessage {
    message: string;
    type: 'success' | 'warning' | 'info' | 'error';
    duration: number;
}
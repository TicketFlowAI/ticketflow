export interface IServiceTermModel {
    id: number;
    term: string;
    months: string;
}

export class ServiceTermModel implements IServiceTermModel {
    constructor(
        public id: number = 0,
        public term: string = '',
        public months: string = '',
    ) {
    }
}

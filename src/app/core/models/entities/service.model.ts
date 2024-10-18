export interface IServiceModel {
    id: number;
    category_id: number;
    tax_id: number;
    price: number;
    description: string;
}

export class ServiceModel implements IServiceModel {
    constructor(
        public id: number = 0,
        public category_id: number = 0,
        public tax_id: number = 0,
        public price: number = 0;
        public description: string = '',
    ) {
    }
}

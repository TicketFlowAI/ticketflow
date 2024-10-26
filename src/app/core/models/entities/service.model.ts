export interface IServicesApiResponse {
    success: boolean;
    data: IServiceModel[];
}

export interface IServiceApiResponse {
    success: boolean;
    data: IServiceModel;
}

export interface IServiceModel {
    id: number;
    category_id: number;
    category: string;
    tax_id: number;
    tax_description: string;
    price: number;
    description: string;
}

export class ServiceModel implements IServiceModel {
    constructor(
        public id: number = 0,
        public category_id: number = 0,
        public category: string = '',
        public tax_id: number = 0,
        public tax_description: string = '',
        public price: number = 0,
        public description: string = '',
    ) {
    }
}

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
    description: string;
    category_id: number;
    tax_id: number;
    price: number;
    category: string;
    tax_description: string;
    details: string;
}

export class ServiceModel implements IServiceModel {
    constructor(
        public id: number = 0,
        public description: string = '',
        public details: string = '', 
        public category_id: number = 0,
        public tax_id: number = 0,
        public price: number = 0,
        public category: string = '',
        public tax_description: string = '',
        
    ) {
    }
}

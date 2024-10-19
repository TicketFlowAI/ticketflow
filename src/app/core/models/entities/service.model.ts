import { ServiceCategoryModel } from "./service-category.model";
import { ServiceTaxModel } from "./service-tax.model";

export interface IServiceApiResponse {
    success: boolean;
    data: IServiceModel[];
}

export interface IServiceModel {
    id: number;
    category_id: number;
    tax_id: number;
    price: number;
    description: string;
    serviceTax: ServiceTaxModel | null;
    serviceCategory: ServiceCategoryModel | null;
}

export class ServiceModel implements IServiceModel {
    constructor(
        public id: number = 0,
        public category_id: number = 0,
        public tax_id: number = 0,
        public price: number = 0,
        public description: string = '',
        public serviceTax: ServiceTaxModel | null = null,
        public serviceCategory: ServiceCategoryModel | null = null,
    ) {
    }
}

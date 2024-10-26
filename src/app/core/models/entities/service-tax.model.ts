export interface IServiceTaxesApiResponse {
    success: boolean;
    data: IServiceTaxModel[];
}

export interface IServiceTaxApiResponse {
    success: boolean;
    data: IServiceTaxModel;
}

export interface IServiceTaxModel {
    id: number;
    description: string;
    value: number;
}

export class ServiceTaxModel implements IServiceTaxModel {
    constructor(
        public id: number = 0,
        public description: string = '',
        public value: number = 0,
    ) {
    }
}

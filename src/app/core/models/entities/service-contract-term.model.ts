export interface IServiceContractTermsApiResponse {
    success: boolean;
    data: IServiceContractTermModel[];
}

export interface IServiceContractTermApiResponse {
    success: boolean;
    data: IServiceContractTermModel;
}

export interface IServiceContractTermModel {
    id: number;
    term: string;
    months: number;
}

export class ServiceContractTermModel implements IServiceContractTermModel {
    constructor(
        public id: number = 0,
        public term: string = '',
        public months: number = 0,
    ) {
    }
}

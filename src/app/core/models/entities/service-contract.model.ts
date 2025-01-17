export interface IServiceContractsApiResponse {
    success: boolean;
    data: IServiceContractModel[];
}

export interface IServiceContractApiResponse {
    success: boolean;
    data: IServiceContractModel;
}

export interface IServiceContractModel {
    id: number;
    company_id: number;
    service_id: number;
    service_term_id: number;
    company: string;
    service: string;
    service_term: string;
    price: number;
    expiration_date: Date;
    created_at: string;
}

export class ServiceContractModel implements IServiceContractModel {
    constructor(
        public id: number = 0,
        public company_id: number = 0,
        public service_id: number = 0,
        public service_term_id: number = 0,
        public company: string = '',
        public service: string = '',
        public service_term: string = '',
        public price: number = 0,
        public expiration_date: Date = new Date(),
        public created_at: string = ''
    ) {
    }
}

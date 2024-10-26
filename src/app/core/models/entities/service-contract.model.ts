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
    comapany_id: number;
    service_id: number;
    service_term_id: number;
}

export class ServiceContractModel implements IServiceContractModel {
    constructor(
        public id: number = 0,
        public comapany_id: number = 0,
        public service_id: number = 0,
        public service_term_id: number = 0,
    ) {
    }
}

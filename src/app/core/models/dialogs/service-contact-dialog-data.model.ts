import { CompanyModel } from "../entities/company.model";
import { ServiceContractModel } from "../entities/service-contract.model";

export interface ServiceContractDialogData {
  serviceContract: ServiceContractModel | null;
  companyId: number | null;
}
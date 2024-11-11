import { ServiceContractModel } from "../entities/service-contract.model";
import { TicketModel } from "../entities/ticket.model";

export interface TicketDialogData {
  ticket: TicketModel | null;
  serviceContract: ServiceContractModel | null;
}
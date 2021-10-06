import { OrderItemDTO } from "./order-item.dto";
import { PaymentDTO } from "./payment.dto";
import { RefDTO } from "./ref.dto";

export interface OrderDTO {
    customer: RefDTO;
    shipAddress: RefDTO;
    payment: PaymentDTO;
    itens: OrderItemDTO[];
}
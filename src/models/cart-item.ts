import { ProductDTO } from "../../models/product.dto";

export interface CartItem {
    quantity: number,
    product: ProductDTO
}
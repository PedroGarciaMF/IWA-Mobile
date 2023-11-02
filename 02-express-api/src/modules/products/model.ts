import { ModificationNote } from "../common/model";

export interface IProduct {
    _id?: String;
    code: String;
    name: String;
    summary: String;
    description: String;
    image: String;
    price: Number;
    on_sale: Boolean;
    sale_price: Number;
    in_stock: Boolean;
    time_to_stock: Number;
    rating: Number;
    available: Boolean;
    is_deleted?: Boolean;
    modification_notes: ModificationNote[]
}

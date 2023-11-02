import mongoose from 'mongoose';
import { ModificationNote } from '../common/model';

const Schema = mongoose.Schema;

const schema = new Schema({
    code: String,
    name: String,
    summary: String,
    description: String,
    image: String,
    price: {
        type: Number,
        default: 0.0
    },
    on_sale: {
        type: Boolean,
        default: false
    },
    sale_price: {
        type: Number,
        default: 0.0
    },
    in_stock: {
        type: Boolean,
        default: true
    },
    time_to_stock: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 1
    },
    available: {
        type: Boolean,
        default: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    modification_notes: [ModificationNote]
});
schema.index({'$**': 'text'});

export default mongoose.model('products', schema);

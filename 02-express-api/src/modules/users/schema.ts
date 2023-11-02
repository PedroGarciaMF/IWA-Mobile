import mongoose from 'mongoose';
import { ModificationNote } from '../common/model';

const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: {
            first_name: String,
            middle_name: String,
            last_name: String
        }
    },
    email: String,
    password: String,
    phone_number: String,
    address: {
        type: {
            street: String,
            city: String,
            state: String,
            zip: String,
            country: String
        }
    },
    verify_code: String,
    is_enabled: {
        type: Boolean,
        default: false
    },
    password_reset: {
        type: Boolean,
        default: false
    },
    mfa_enabled: {
        type: Boolean,
        default: false
    },
    is_admin: {
        type: Boolean,
        default: false
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    modification_notes: [ModificationNote]
});
schema.index({'$**': 'text'});

export default mongoose.model('users', schema);

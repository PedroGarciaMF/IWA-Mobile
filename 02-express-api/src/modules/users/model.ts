import { ModificationNote } from "../common/model";

export interface IUser {
    _id?: String;
    name: {
        first_name: String;
        middle_name: String;
        last_name: String;
    };
    email: String;
    password: String;
    phone_number: String;
    address: {
        street: String;
        city: String;
        state: String;
        zip: String;
        country: String;
    }
    verify_code: String;
    is_enabled: Boolean;
    password_reset: Boolean;
    mfa_enabled: Boolean;
    is_admin: Boolean;
    is_deleted?: Boolean;
    modification_notes: ModificationNote[]
}

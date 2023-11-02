
export interface JwtJson {
    userId: String | undefined,
    email: String,
    role: String,
    token: String;
    expires: Number;
}

export interface SubscribingUser {
    firstName: String | undefined,
    lastName: String | undefined,
    email: String,
    role: String | undefined // not used
}

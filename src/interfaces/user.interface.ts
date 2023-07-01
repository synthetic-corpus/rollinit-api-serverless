export interface User {
    _id?: String,
    _authID: String,
    name: String,
    tier: Number
}

export interface UserPatch {
    name?: String,
    tier?: Number
}

export interface UserHttp {
    name: string
}
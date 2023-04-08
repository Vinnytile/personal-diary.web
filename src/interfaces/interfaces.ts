export interface INote {
    id: string
    description: string
    text: string
}

export interface INoteDTO {
    description: string
    text: string
    userIdentityFID: string
}

export interface IUserLoginDTO {
    email: string
    password: string
}

export interface IUserRegisterDTO {
    email: string
    username: string
    password: string
}

export interface IUserProfileDTO {
    username: string
    firstname: string
    lastname: string
    age: number
    dateOfBirth: Date
    userIdentityFID: string
}
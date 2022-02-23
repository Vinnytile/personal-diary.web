export interface INote {
    id: string
    description: string
    text: string
}

export interface INoteDTO {
    description: string
    text: string
    userId: string
}

export interface IUserLoginDTO {
    email: string
    password: string
}
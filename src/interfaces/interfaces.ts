export interface INote {
    id: string
    description: string
    text: string
    summary: string
}

export interface INoteDTO {
    description: string
    text: string
    userIdentityFID: string
    summary: string
}

export interface IUserLoginDTO {
    email: string
    password: string
}

export interface IUserRegisterDTO {
    email: string
    password: string
}

export interface IUserProfile {
    id: string
    username: string
    firstName: string
    lastName: string
    dateOfBirth: Date
    userIdentityFID: string
}

export interface IUserProfileDTO {
    username: string
    firstname: string
    lastname: string
    dateOfBirth: Date
    userIdentityFID: string
}

export interface ISubscriptionDTO {
    subscriberFID: string
    observableFID: string
}

export interface IGenerateNoteSummaryDTO {
    text: string
}
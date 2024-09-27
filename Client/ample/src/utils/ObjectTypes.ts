export type userAuthType = {
    id: string,
    username: string,
    imageURL: string, 
    type: string,
    headerPosterURL: string,
}

export type stateAuthType = {
    isLoggedIn: Boolean,
    user: userAuthType,
    error: string

}

export type AudioListItemPropType = {
    title: string, 
    artist: string, 
    imageURL: string
}

export type MediumUserListItemPropType = {
    artist: string,
    imageURL: string
}

export type UserAviPropType = {
    username: string,
    imageURL: string,
}

export type VideoItemPropType = {
    title: string,
    author: string, 
    views?: number,
    posterURL?: string,
    imageURL?: string,
    contentURL?: string
}
export type AudioItemPropType = {
    title: string, 
    author: string,
    imageURL:string
}

export type LoginFormType = {
    email: string, 
    password: string
}

export type RegistrationFormType = {
    email: {value: string}, 
    password: {value: string}, 
    confirmPassword: {value: string}
}

export type AuthErrorType = {
    message: string,
    Code: string
}

export type userUpdateDataType = {
    id: string,
    username?: string, 
    imageURL?: Blob, 
    headerPosterURL?: Blob
}

export type userSettingsType = {
    username: string, 
    imageURL: string,
    headerPosterURL: string,
}
export type storeSettingsType = {
    userSettings: userSettingsType,
}

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
    id: string,
    title: string, 
    name: string, 
    imageURL: string,
    audioURL?: string,
    albumId?: string
}

export type MediumUserListItemPropType = {
    id: string,
    artist: string,
    imageURL: string
}

export type UserAviPropType = {
    id?: String,
    username: string,
    imageURL: string,
}

export type VideoItemPropType = {
    id: string,
    title: string,
    author: string, 
    views?: number,
    posterURL?: string,
    imageURL?: string,
    contentURL?: string
}
export type AudioItemPropType = {
    id: string,
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
export type HomePageDataType = {
    featured: [VideoItemPropType],
    podcasts: [VideoItemPropType],
    music: [AudioItemPropType],
    artists: [UserAviPropType],
    videos: [VideoItemPropType]
  }
export type LibraryStatePropType = {
    library: [AudioListItemPropType | UserAviPropType]
    Tracks: [AudioListItemPropType],
    Albums: [AudioListItemPropType],
    Videos: [VideoItemPropType],
    Subscriptions: [UserAviPropType],
}
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
    albumId?: string,
    type: string?
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
    contentURL?: string,
    type: string

}
export type AudioItemPropType = {
    name: ReactNode
    id: string,
    title: string, 
    author: string,
    imageURL:string,
    type: string
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

export type PaymentSettings = {
    credits: Number,
    paymentHistory: [AudioListItemPropType]
}
export type storeSettingsType = {
    paymentSettings: PaymentSettings,
}
export type HomePageDataType = {
    featured: [VideoItemPropType],
    podcasts: [VideoItemPropType],
    music: [AudioItemPropType],
    artists: [UserAviPropType],
    videos: [VideoItemPropType]
  }

export type SectionDataType<T> = {
    id: string, 
    tagline: string,
    type: string,
    items: [T]
}




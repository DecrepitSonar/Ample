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
    profileimage: string, 
    accounttype: string,
    headerimage: string,
}

export type UserAccountSettingsType = {
    profileImage: string, 
    headerimage: string,
    username: string,
    email: string
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
    type?: string
}

export type MediumUserListItemPropType = {
    id: string,
    artist: string,
    imageURL: string
}

export type UserAviPropType = {
    name: string
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
    trackNum: number
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
    email: string,
    password: string, 
    confirmPassword: string
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
export type userSettings = {
    accountSettings: UserAccountSettingsType,
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




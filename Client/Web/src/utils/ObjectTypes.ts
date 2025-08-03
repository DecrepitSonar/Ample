export type LibraryStatePropType = {
    library: [AudioListItemPropType | UserAviPropType]
}
export type userAuthType = {
    id: string,
    username: string,
    profileimage: string, 
    accounttype: string,
    headerimage: string,
}

export type UserAccountSettingsType = {
    profileimage: string, 
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
    playlist_id: string | undefined
    id: string,
    title: string, 
    author: string, 
    imageurl: string,
    contenturl?: string,
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
    imageurl: string,
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
    trackNum?: number
    name: string
    id: string
    title: string 
    author: string
    author_id: string
    imageurl:string
    type: string
    playlist_id?: string
    genre: string,
    category: string
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
    credit: string,
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

export type OutletProps = {
    setOpenUploadModal: React.Dispatch<React.SetStateAction<Boolean>>,
    uploadModal: Boolean
  }
export type ModalOutletProps = {
    openPlaylistModal: ( item: AudioItemPropType ) => void 
    playlistModalOpen:Boolean 
    setPlaylistModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export type TrackPropType = {
  id: string, 
  trackNum: number,
  title: String,
  author: String
}
export type PlaylistPageDataType = {
  head: {
    playlist: AudioItemPropType,
    tracks: [TrackPropType],
    author: UserAviPropType
  },
  features: [UserAviPropType],
  albums: [AudioItemPropType],
  recommendations: [AudioItemPropType],
  relatedFetures: [AudioItemPropType],
  relatedVideos: [VideoItemPropType]
}
export type DashboardUploadsType = {
  author: string
  author_id: string
  category: string 
  contenturl: string
  genre: string
  id: string
  imageurl: string
  playcount: number
  playlist_id: string | null
  title: string
  tracknumber: number
  type: string
  upload_date: string
}

export type PlaylistITemType = {
      id: string,
      title: string, 
      author: string,
      items: [AudioItemPropType]
}
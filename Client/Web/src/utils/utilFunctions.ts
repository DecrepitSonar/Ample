import React from "react"
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export  const handleSeletedImage = (file: Blob, setFile: Function, imgRef: React.SyntheticEvent) => {
    const reader = new FileReader()
    setFile(file)

    reader.onload = (e: ProgressEvent) => {
        imgRef.ta.src = e.target?.result
    }

    reader.readAsDataURL(file)

  }

export function cn(...inputs){
    return twMerge(clsx(inputs))
}
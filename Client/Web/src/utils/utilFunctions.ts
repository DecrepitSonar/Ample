import React from "react"

export  const handleSeletedImage = (file: Blob, setFile: Function, imgRef: React.SyntheticEvent) => {
    const reader = new FileReader()
    setFile(file)

    reader.onload = (e: ProgressEvent) => {
        imgRef.ta.src = e.target?.result
    }

    reader.readAsDataURL(file)

  }
import React, { ReactHTMLElement } from "react"
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { FastAverageColor } from 'fast-average-color';

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



export function  getAverageImagecolor(container: HTMLDivElement){
    
    const fac = new FastAverageColor();
    console.log( container)
    
    const src =  container.querySelector('img')?.src!
    console.log( src )
    fac.getColorAsync(src)
        .then(color => {
            console.log( color.rgba )
            container.style.backgroundColor = color.rgba;
            container.style.color = color.isDark ? '#fff' : '#000';
        })
        .catch(e => {
            console.log(e);
        });
}

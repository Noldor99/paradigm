import Image from 'next/image'

import React from 'react'

import { AspectRatio } from '@/components/ui/aspect-ratio'

import { IGeneral } from '@/types/general'

interface ImgGeneralProps {
  imgData?: Partial<IGeneral>
  forForm?: string
}

const ImgGeneral = ({ imgData, forForm }: ImgGeneralProps) => {
  //@ts-ignore
  const { generalImg, title, altProject, titleImg } = imgData || {}

  return (
    <>
      <AspectRatio ratio={224 / 100}>
        {generalImg || forForm ? (
          <Image
            className="h-full w-full object-cover"
            src={forForm ? forForm : `${generalImg}?${new Date().getTime()}`}
            alt={altProject ? altProject : `${title} image`}
            title={titleImg}
            fill
          />
        ) : null}
      </AspectRatio>
    </>
  )
}

export default ImgGeneral

import Image from 'next/image'

import React from 'react'

import { AspectRatio } from '@/components/ui/aspect-ratio'

import { IPerspective } from '@/types/perspective'

interface ImgPerspectiveProps {
  imgData?: Partial<IPerspective>
  forForm?: string
}

const ImgPerspective = ({ imgData, forForm }: ImgPerspectiveProps) => {
  //@ts-ignore
  const { perspectiveImg, title, altPerspective, titleImg } = imgData || {}

  return (
    <>
      <AspectRatio ratio={224 / 120}>
        {perspectiveImg || forForm ? (
          <Image
            className="h-full w-full object-cover"
            src={forForm ? forForm : `${perspectiveImg}?${new Date().getTime()}`}
            alt={altPerspective ? altPerspective : `${title} image`}
            title={titleImg}
            fill
          />
        ) : null}
      </AspectRatio>
    </>
  )
}

export default ImgPerspective

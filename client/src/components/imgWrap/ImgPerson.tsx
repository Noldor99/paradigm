import Image from 'next/image'

import React from 'react'

import { AspectRatio } from '@/components/ui/aspect-ratio'

//@ts-ignore
import { IPerson } from '@/actions/client/personAction'

interface ImgPersonProps {
  imgData?: Partial<IPerson>
  forForm?: string
}

const ImgPerson = ({ imgData, forForm }: ImgPersonProps) => {
  const { personImg, title, altPerson, titleImg } = imgData || {}

  return (
    <>
      <AspectRatio ratio={224 / 150}>
        {personImg || forForm ? (
          <Image
            className="h-full w-full object-cover"
            src={forForm ? forForm : `${personImg}?${new Date().getTime()}`}
            alt={altPerson ? altPerson : `${title} image`}
            title={titleImg}
            fill
          />
        ) : null}
      </AspectRatio>
    </>
  )
}

export default ImgPerson

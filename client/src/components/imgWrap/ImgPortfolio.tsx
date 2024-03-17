import Image from 'next/image'

import React from 'react'

import { AspectRatio } from '@/components/ui/aspect-ratio'

import { IPortfolio } from '@/types/portfolio'

interface ImgPortfolioProps {
  imgData?: Partial<IPortfolio>
  forForm?: string
}

const ImgPortfolio = ({ imgData, forForm }: ImgPortfolioProps) => {
  //@ts-ignore
  const { portfolioImg, title, altPortfolio, titleImg } = imgData || {}

  return (
    <>
      <AspectRatio ratio={224 / 120}>
        {portfolioImg || forForm ? (
          <Image
            className="h-full w-full object-cover"
            src={forForm ? forForm : `${portfolioImg}?${new Date().getTime()}`}
            alt={altPortfolio ? altPortfolio : `${title} image`}
            title={titleImg}
            fill
          />
        ) : null}
      </AspectRatio>
    </>
  )
}

export default ImgPortfolio

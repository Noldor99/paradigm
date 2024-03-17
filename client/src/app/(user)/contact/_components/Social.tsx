import Link from 'next/link'

import React from 'react'

import {
  IconBrandDiscord,
  IconBrandLinkedin,
  IconBrandTelegram,
  IconBrandX,
} from '@tabler/icons-react'

import { Button } from '@/components/ui/button'

import { IContact } from '@/types/general'

const linksIkon = [
  { name: 'telegram', icon: <IconBrandTelegram /> },
  { name: 'twitter', icon: <IconBrandX /> },
  { name: 'discord', icon: <IconBrandDiscord /> },
  { name: 'linkedin', icon: <IconBrandLinkedin /> },
]

interface SocialProps {
  links: IContact
}

const Social = ({ links }: SocialProps) => {
  return (
    <>
      {linksIkon.map((linkIkon, index) => {
        const link = links ? (links as any)[linkIkon.name] : undefined
        if (link) {
          return (
            <Button className="border border-black bg-white p-2" key={index} variant="default_out">
              <Link href={link} target="_blank" aria-label={linkIkon.name} rel="nofollow">
                {linkIkon.icon}
              </Link>
            </Button>
          )
        }
        return null
      })}
    </>
  )
}

export default Social

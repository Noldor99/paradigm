import Link from 'next/link'

import React from 'react'

import { Badge } from '@/components/ui/badge'

import { IPerson } from '@/types/person'

interface BadgeLinkProps {
  person: IPerson
}

const BadgeLink = ({ person }: BadgeLinkProps) => {
  return (
    <div className="flex gap-3">
      {person?.links?.map((item, index) => (
        <Badge key={index} variant="muted" className="max-w-[100px]">
          {item?.link && (
            <Link href={item.link} target="_blank">
              {item.name}
            </Link>
          )}
        </Badge>
      ))}
    </div>
  )
}

export default BadgeLink

import React from 'react'

import { cn } from '@/lib/utils'

import { Badge } from '../ui/badge'

interface SmallCardUserProps {
  text: string
  iconConect?: React.ReactElement
  icon?: React.ReactElement
  handleClick?: () => void
}

const SmallCardBage: React.FC<SmallCardUserProps> = (props) => {
  const { text, iconConect, icon, handleClick } = props

  return (
    <Badge variant="muted" onClick={handleClick}>
      <div className="flex items-center justify-between space-x-2">
        <span className="font-semibold">{text}</span>
        <div className="flex gap-2">
          {iconConect && <div className=" hover:text-primary">{iconConect}</div>}
          {icon && <div className=" hover:text-primary">{icon}</div>}
        </div>
      </div>
    </Badge>
  )
}

export default SmallCardBage

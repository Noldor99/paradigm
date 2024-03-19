'use client'

import React, { ReactNode, useEffect, useState } from 'react'

import { motion, useAnimate } from 'framer-motion'

import { IconChevronDown } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

interface CollapsibleButtonProps {
  children: ReactNode
}

const CollapsibleButton: React.FC<CollapsibleButtonProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleToggle = () => setIsCollapsed((prev) => !prev)
  const [scope, animate] = useAnimate()

  useEffect(() => {
    if (isCollapsed) {
      animate(scope.current, { height: 'inherit', minHeight: '40px' })
    } else {
      animate(scope.current, { height: '40px' })
    }
  }, [isCollapsed, animate, scope])

  return (
    <motion.div
      ref={scope}
      initial={{ height: '40px' }}
      className={cn(
        'border-box',
        'flex w-full items-start justify-start gap-2',
        'overflow-hidden px-2 py-1.5 sm:max-w-[600px]'
      )}
    >
      <div className="flex flex-wrap gap-2">{children}</div>
      <Button
        type="button"
        className={cn(
          'sticky right-0 z-10 h-6 w-6 justify-self-end p-1',
          isCollapsed
            ? 'rotate-180 transform transition-transform'
            : 'transform transition-transform'
        )}
        size="sm"
        onClick={handleToggle}
      >
        <IconChevronDown className="h-4 w-4" />
        <span className="sr-only">Toggle</span>
      </Button>
    </motion.div>
  )
}

export default CollapsibleButton

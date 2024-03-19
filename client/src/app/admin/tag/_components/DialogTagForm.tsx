'use client'

import { useGetTagById } from '@/ahooks/useTag'

import { useState } from 'react'

import { IconEdit, IconPlus } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { TagForm } from './TagForm'

interface DialogRoomProps {
  id?: string | undefined
}

export function DialogTagForm({ id }: DialogRoomProps) {
  const { data: tag, isFetched } = useGetTagById(id!)
  const [open, setOpen] = useState(false)

  const handleOpenChange = () => {
    setOpen(!open)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {id ? (
          <IconEdit size="20px" />
        ) : (
          <Button variant="black_out">
            <IconPlus className="mr-2" />
            Add tag
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-h2 mb-3 text-center font-normal">
            {id ? 'Edit tag' : 'Create new tag'}
          </DialogTitle>
        </DialogHeader>
        {id ? (
          isFetched && <TagForm tag={tag} handleClose={handleOpenChange} />
        ) : (
          <TagForm handleClose={handleOpenChange} />
        )}
      </DialogContent>
    </Dialog>
  )
}

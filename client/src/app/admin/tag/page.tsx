'use client'

import { useDeleteTagById, useGetTag } from '@/ahooks/useTag'

import { useEffect } from 'react'

import { IconX } from '@tabler/icons-react'

import DialogDelete from '@/components/DialogDelete'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Line from '@/components/ui/line'

import { TagVariant } from '@/types/tag'

import { DialogTagForm } from './_components/DialogTagForm'

const TagPage = () => {
  const getResult = useGetTag({
    enabled: true,
  })

  const { data: tagData, isFetched, refetch } = getResult

  const { mutate: deleteTag } = useDeleteTagById()

  useEffect(() => {
    refetch()
  }, [refetch])

  return (
    <div className="container">
      <DialogTagForm />
      <div className="paper-rounded mt-5">
        {[
          { value: TagVariant.Company, label: 'Company' },
          { value: TagVariant.Location, label: 'Location' },
          { value: TagVariant.Role, label: 'Role' },
        ].map((item) => (
          <div key={item.value}>
            <p className="text-h3 mp-5">{item.label}:</p>
            <div className="my-5 flex flex-wrap gap-4">
              {tagData?.tags
                .filter((tag) => tag.variant === item.value)
                .map((tag) => (
                  <Badge variant="muted" key={tag.id} className="flex gap-4">
                    <div>{tag.name}</div>
                    <DialogTagForm id={tag.id} />
                    <DialogDelete
                      nameDelete="some tag"
                      onClick={() => {
                        deleteTag(tag.id)
                      }}
                    >
                      <IconX size="15px" />
                    </DialogDelete>
                  </Badge>
                ))}
            </div>
            <Line />
          </div>
        ))}
      </div>
    </div>
  )
}

export default TagPage

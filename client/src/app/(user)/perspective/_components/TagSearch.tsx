'use client'

import { useRouter } from 'next/navigation'

import React, { useEffect, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import Line from '@/components/ui/line'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { ITag, TagVariant } from '@/types/tag'

interface TagSearchProps {
  tagData: ITag[]
  link: string
}

const TagSearch = ({ tagData, link }: TagSearchProps) => {
  const router = useRouter()

  const [activeTags, setActiveTags] = useState<ITag[] | undefined>(undefined)

  useEffect(() => {
    console.log(activeTags)
    if (activeTags === undefined) return
    if (activeTags.length === 0) {
      router.push(`/${link}`)
    } else {
      const tagsParam = activeTags.map((tag) => tag.name).join(',')
      router.push(`/${link}?tags=${tagsParam}`, { scroll: false })
    }
  }, [activeTags])

  return (
    <div className="paper-rounded mt-5">
      <Tabs>
        <TabsList>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="role">Role</TabsTrigger>
        </TabsList>
        {[
          { value: TagVariant.Company, label: 'Company' },
          { value: TagVariant.Location, label: 'Location' },
          { value: TagVariant.Role, label: 'Role' },
        ].map((item) => (
          <TabsContent key={item.value} value={item.value}>
            <p className="text-h3 mp-5">{item.label}:</p>
            <div className="my-5 flex flex-wrap gap-4">
              {tagData
                .filter((tag) => tag.variant === item.value)
                .map((tag) => (
                  <Badge
                    variant="muted"
                    key={tag.id}
                    className="flex gap-4"
                    onClick={() => {
                      if (!activeTags || !activeTags.some((t) => t.id === tag.id)) {
                        setActiveTags(activeTags ? [...activeTags, tag] : [tag])
                      }
                    }}
                  >
                    <div>{tag.name}</div>
                  </Badge>
                ))}
            </div>
            <Line />
          </TabsContent>
        ))}
      </Tabs>

      <div className="my-5 flex flex-wrap gap-4">
        {activeTags?.map((tag) => (
          <Badge
            variant="muted"
            key={tag.id}
            className="flex gap-4"
            onClick={() =>
              setActiveTags(activeTags ? activeTags.filter((t) => t.id !== tag.id) : [])
            }
          >
            <div>{tag.name}</div>
          </Badge>
        ))}
      </div>
    </div>
  )
}

export default TagSearch

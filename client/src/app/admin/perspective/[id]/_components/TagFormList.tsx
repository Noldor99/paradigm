import { useGetTag } from '@/ahooks/useTag'

import { useSearchParams } from 'next/navigation'

import React, { useEffect, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { IconClipboardPlus, IconX } from '@tabler/icons-react'

import CollapsibleButton from '@/components/CollapsibleButton'
import WrapSearch from '@/components/WrapSearch'
import SmallCardBage from '@/components/card/SmallCardBage'
import { FormField, FormItem } from '@/components/ui/form'

import { ITags } from '@/types/tag'

const TagsFormList = () => {
  const searchParams = useSearchParams()

  const form = useFormContext()

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'tags',
  })

  const [tags, setTags] = useState<ITags>()

  const { data, isFetched, refetch } = useGetTag({
    params: {
      // limit: '6',
      // page: searchParams.get('page') || '1',
      search: searchParams.get('search') || undefined,
    },
  })

  useEffect(() => {
    refetch()
    setTags(data)
  }, [refetch, searchParams, data])

  const handleAppend = (item: any) => {
    append(item)
    setTags((prevTags) => {
      if (!prevTags) return prevTags

      return {
        ...prevTags,
        tags: prevTags.tags.filter((u) => u.name !== item.name),
      }
    })
  }

  return (
    <div>
      <div className="flex flex-col gap-3  px-6">
        <CollapsibleButton>
          {fields.map((tag, index) => (
            <div key={tag.id} className="flex items-center gap-2">
              <FormField
                control={form.control}
                name={`tags.${index}.name`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <SmallCardBage
                      text={form.watch(`tags.${index}.name`)}
                      icon={<IconX size="15px" onClick={() => remove(index)} />}
                    />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </CollapsibleButton>
        <WrapSearch />
        <div className="flex flex-wrap gap-3">
          {tags?.tags
            .filter((item) => !fields.some((tag: any) => tag.name === item.name))
            .map((item, idx) => (
              <SmallCardBage
                key={idx}
                text={item.name}
                icon={
                  <IconClipboardPlus
                    onClick={() =>
                      handleAppend({
                        name: item.name,
                      })
                    }
                  />
                }
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default TagsFormList

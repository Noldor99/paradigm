'use client'

import FormDropImg from '@/components/form/FormDropImg'
import FormInput from '@/components/form/FormInput'
import ImgGeneral from '@/components/imgWrap/ImgGeneral'
import { Button } from '@/components/ui/button'

import { AppEditor } from '../editor/AppEditor'

interface FormSectionProps {
  onSubmit?: (data: Record<string, any>) => void
  isPending?: boolean
  formState?: any
}

export const SectionAbout: React.FC<FormSectionProps> = ({ onSubmit, isPending, formState }) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <AppEditor name="aboutLexical" />
        <div className="">
          <FormDropImg name="generalImg" textButton="Add" imgRender={<ImgGeneral />} />
        </div>
      </div>
      <div className="mx-auto max-w-[800px]">
        <Button
          type="submit"
          className="mt-6"
          onClick={onSubmit}
          disabled={isPending || !formState.isValid ? true : formState.isDirty ? false : true}
        >
          Save
        </Button>
      </div>
    </>
  )
}

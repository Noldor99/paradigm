'use client'

import { AppEditor } from '@/components/editor/AppEditor'
import { Button } from '@/components/ui/button'

interface FormSectionProps {
  onSubmit?: (data: Record<string, any>) => void
  isPending?: boolean
  formState?: any
}
export const SectionImportantDisclosures: React.FC<FormSectionProps> = ({
  onSubmit,
  isPending,
  formState,
}) => {
  return (
    <div className="flex flex-col gap-[16px]">
      <AppEditor name="importantDisclosures" />
      <Button
        onClick={onSubmit}
        disabled={isPending || !formState.isValid ? true : formState.isDirty ? false : true}
        type="submit"
        className="full-w"
      >
        Save
      </Button>
    </div>
  )
}

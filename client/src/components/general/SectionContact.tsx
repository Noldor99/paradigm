import React from 'react'

import FormInput from '@/components/form/FormInput'
import { Button } from '@/components/ui/button'

interface FormSectionProps {
  onSubmit?: (data: Record<string, any>) => void
  isPending?: boolean
  formState?: any
}

export const SectionContact: React.FC<FormSectionProps> = ({ onSubmit, isPending, formState }) => {
  return (
    <div className="flex flex-col gap-[16px]">
      <FormInput name="contact.information" placeholder="text" label="Information:" />
      <FormInput name="contact.pressInquiries" placeholder="text" label="PressInquiries:" />
      <FormInput name="contact.investorInquiries" placeholder="text" label="Investor Inquiries:" />
      <FormInput name="contact.linkedin" placeholder="text" label="Linkedin:" />
      <FormInput name="contact.twitter" placeholder="text" label="Twitter:" />
      <Button
        disabled={isPending || !formState.isValid ? true : formState.isDirty ? false : true}
        type="submit"
        className="full-w"
        onClick={onSubmit}
      >
        Save
      </Button>
    </div>
  )
}

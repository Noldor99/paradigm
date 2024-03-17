import React from 'react'

import { IContact } from '@/types/general'

const contactList = [
  { name: 'information', label: 'Information' },
  { name: 'pressInquiries', label: 'Press Inquiries' },
  { name: 'investorInquiries', label: 'Investor Inquiries' },
]

interface ContactListProps {
  links: IContact
}

const ContactList = ({ links }: ContactListProps) => {
  return (
    <>
      {contactList.map((contact, index) => {
        const value = links ? (links as any)[contact.name] : undefined
        if (!value) return null

        return (
          <div key={index}>
            <p className="text-s w-full max-w-[280px] whitespace-nowrap text-left text-muted-foreground">
              {contact.label}
            </p>
            <a
              className="text-h3 w-full max-w-[280px] text-left"
              href={`mailto:${value}`}
              aria-label={contact.label}
              rel="nofollow"
            >
              {value}
            </a>
          </div>
        )
      })}
    </>
  )
}

export default ContactList

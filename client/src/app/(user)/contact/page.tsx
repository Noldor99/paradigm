import { ReturnType } from '@/actions/client/generalAction'
import { generalPrefetch } from '@/actions/server/generalPrefetch'

import ContactList from './_components/ContactList'
import { FeedbackForm } from './_components/FeedbackForm'
import Social from './_components/Social'

export const generateMetadata = async () => {
  return {
    title: 'Contact Page',
    description: 'V3V - Contact Page',
  }
}

const ContactPage = async () => {
  const result = await generalPrefetch(ReturnType.CONTACT)

  return (
    <section>
      <div className="container-sm">
        <div className="paper-sharp">
          <div className="sm:paper-rounded flex flex-col gap-5">
            <ContactList links={result.contact} />
          </div>
          <div className="sm:paper-rounded mt-5 flex items-center gap-5">
            <p>Social:</p>
            <div className="flex gap-5">
              <Social links={result.contact} />
            </div>
          </div>
          <p className="text-h2 mb-2 mt-5">Contact form:</p>
          <FeedbackForm />
        </div>
      </div>
    </section>
  )
}

export default ContactPage

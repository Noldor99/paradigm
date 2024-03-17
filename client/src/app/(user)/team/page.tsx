import { QueryPersonParams } from '@/actions/client/personAction'

import { PersonList } from './_components/PersonList'

export const generateMetadata = async () => {
  return {
    title: 'Home Page',
    description: 'V3V - Home Page',
  }
}

export type PageProps = {
  params: { [key: string]: string | string[] | undefined }
  searchParams?: QueryPersonParams
}

const HomePage = async (props: PageProps) => {
  return (
    <section>
      <div className="container">
        <PersonList {...props} />
      </div>
    </section>
  )
}

export default HomePage

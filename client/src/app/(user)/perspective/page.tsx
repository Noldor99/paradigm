import { QueryPerspectiveParams } from '@/actions/client/perspectiveAction'

import { PerspectiveList } from './_components/PerspectiveList'

export const generateMetadata = async () => {
  return {
    title: 'Home Page',
    description: 'Simple - Home Page',
  }
}

export type PageProps = {
  params: { [key: string]: string | string[] | undefined }
  searchParams?: QueryPerspectiveParams
}

const HomePage = async (props: PageProps) => {
  return (
    <section>
      <div className="container-sm">
        <PerspectiveList {...props} />
      </div>
    </section>
  )
}

export default HomePage

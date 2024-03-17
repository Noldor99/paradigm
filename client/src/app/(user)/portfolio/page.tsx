import { QueryPortfolioParams } from '@/actions/client/portfolioAction'

import { PortfolioList } from './_components/PortfolioList'

export const generateMetadata = async () => {
  return {
    title: 'Home Page',
    description: 'V3V - Home Page',
  }
}

export type PageProps = {
  params: { [key: string]: string | string[] | undefined }
  searchParams?: QueryPortfolioParams & {
    view?: 'grid' | 'list'
  }
}

const HomePage = async (props: PageProps) => {
  return (
    <section>
      <div className="container">
        <PortfolioList {...props} />
      </div>
    </section>
  )
}

export default HomePage

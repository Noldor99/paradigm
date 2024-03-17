import { link } from 'fs'

import Link from 'next/link'

import ImgPortfolio from '@/components/imgWrap/ImgPortfolio'
import { Badge } from '@/components/ui/badge'

import { portfolioByIdPrefetch, portfolioPrefetch } from '@/actions/server/portfolioPrefetch'

import { dateHelpers } from '@/lib/dateHelpers'

interface MetadataProps {
  params: { id: string }
}

export const generateMetadata = async ({ params }: MetadataProps) => {
  const portfoliosById = await portfolioByIdPrefetch(params.id)

  if (portfoliosById) {
    return {
      title: portfoliosById.title,
      description: portfoliosById.description,
    }
  }

  return {
    title: 'Portfolio Page By Id ' + params.id,
    description: 'V3V - Portfolio Page',
  }
}

export async function generateStaticParams() {
  const { portfolios } = await portfolioPrefetch({ page: 1, limit: 200 })

  return portfolios.map((i) => ({ id: i.id }))
}

interface IPortfolioPage {
  params: {
    id: string
  }
}

const PortfolioByIdPage = async ({ params }: IPortfolioPage) => {
  const portfolio = await portfolioByIdPrefetch(params.id)

  return (
    <section className="container-sm">
      <div className="">
        <div className="flex flex-col justify-start gap-4">
          <div className="mt-6 w-full">
            <ImgPortfolio imgData={portfolio} />
          </div>
          <span className="text-xs text-muted">
            {dateHelpers.getDayMonthYear(portfolio.createdAt)}
          </span>
          <div>
            <h3 className="text-h3 mb-[30px] text-left">{portfolio.title}</h3>
            <p className="text-s">{portfolio.subDescription}</p>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          {portfolio.links.map((item, index) => (
            <Badge variant="muted" className=" ">
              <Link href={item.link} target="_blank" key={index}>
                <p>{item.name}</p>
              </Link>
            </Badge>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PortfolioByIdPage

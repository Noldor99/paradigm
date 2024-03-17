import Link from 'next/link'

import BadgeLink from '@/components/BadgeLink'
import ImgPerson from '@/components/imgWrap/ImgPerson'
import Line from '@/components/ui/line'

import { contentPrefetch } from '@/actions/server/contentPrefetch'
import { personByIdPrefetch, personPrefetch } from '@/actions/server/personPrefetch'

import { dateHelpers } from '@/lib/dateHelpers'

interface MetadataProps {
  params: { id: string }
}

export const generateMetadata = async ({ params }: MetadataProps) => {
  const personsById = await personByIdPrefetch(params.id)

  if (personsById) {
    return {
      title: personsById.fullName,
      description: personsById.position,
    }
  }

  return {
    title: 'Person Page By Id ' + params.id,
    description: 'V3V - Person Page',
  }
}

export async function generateStaticParams() {
  const { persons } = await personPrefetch({ page: 1, limit: 200 })

  return persons.map((i) => ({ id: i.id }))
}

interface IPersonPage {
  params: {
    id: string
  }
}

const PersonByIdPage = async ({ params }: IPersonPage) => {
  const person = await personByIdPrefetch(params.id)
  const personContent = await contentPrefetch({ limit: '2', personRouter: person.router })

  return (
    <section className="container-sm">
      <div className="">
        <div className="flex flex-col justify-start gap-4">
          <div className="mt-6 w-full">
            <ImgPerson imgData={person} />
          </div>
          <span className="text-xs text-muted">
            {dateHelpers.getDayMonthYear(person.createdAt)}
          </span>
          <div>
            <h3 className="text-h3 mb-[30px] text-left">{person.fullName}</h3>
            <p className="text-s">{person.position}</p>
          </div>
        </div>
        <div className="mt-5">
          <BadgeLink person={person} />
        </div>
        {personContent?.totalCount !== 0 && (
          <div className="mt-5">
            <Line />
            <p className="text-sm1">Written by {person.fullName}</p>
            <div className="mt-5">
              {personContent.contents.map((item) => (
                <Link href={`/writing/${item.router}`}>
                  <div className="mt-5 flex flex-col gap-3">
                    <p className="text-h2">{item.title}</p>
                    <p>{item.description}</p>
                    <p className="text-xs text-muted">
                      {dateHelpers.getDayMonthYear(item.createdAt)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default PersonByIdPage

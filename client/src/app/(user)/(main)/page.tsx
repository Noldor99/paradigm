import { getHtml } from '@/components/editorRender/html_editor'
import ImgGeneral from '@/components/imgWrap/ImgGeneral'

import { ReturnType } from '@/actions/client/generalAction'
import { generalPrefetch } from '@/actions/server/generalPrefetch'

export const generateMetadata = async () => {
  return {
    title: 'WebsiteTerms Page',
    description: 'V3V - WebsiteTerms Page',
  }
}

const WebsiteTermsPage = async () => {
  const results = await generalPrefetch(ReturnType.GENERAL)
  const renderedTexts: string | null = await getHtml(results.aboutLexical)

  return (
    <section>
      <div className="container-sm">
        <div className="paper-rounded">
          {renderedTexts && <div dangerouslySetInnerHTML={{ __html: renderedTexts }} />}
          <div className="mt-[20px] border sm:mt-[40px]">
            {results.generalImg && <ImgGeneral imgData={results} />}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WebsiteTermsPage

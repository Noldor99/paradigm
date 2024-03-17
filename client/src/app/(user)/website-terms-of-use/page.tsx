import { getHtml } from '@/components/editorRender/html_editor'

import { ReturnType } from '@/actions/client/generalAction'
import { generalPrefetch } from '@/actions/server/generalPrefetch'

export const generateMetadata = async () => {
  return {
    title: 'WebsiteTerms Page',
    description: 'V3V - WebsiteTerms Page',
  }
}

const WebsiteTermsPage = async () => {
  const results = await generalPrefetch(ReturnType.WEBSITE_TERMS)
  const renderedTexts: string | null = await getHtml(results.websiteTerms)

  return (
    <section>
      <div className="container-sm">
        <div className="paper-rounded">
          {renderedTexts && <div dangerouslySetInnerHTML={{ __html: renderedTexts }} />}
        </div>
      </div>
    </section>
  )
}

export default WebsiteTermsPage

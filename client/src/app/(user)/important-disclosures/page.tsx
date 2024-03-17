import { getHtml } from '@/components/editorRender/html_editor'

import { ReturnType } from '@/actions/client/generalAction'
import { generalPrefetch } from '@/actions/server/generalPrefetch'

export const generateMetadata = async () => {
  return {
    title: 'ImportantDisclosures Page',
    description: 'V3V - ImportantDisclosures Page',
  }
}

const ImportantDisclosuresPage = async () => {
  const results = await generalPrefetch(ReturnType.IMPORTANT_DISCLOSURES)
  const renderedTexts: string | null = await getHtml(results.importantDisclosures)

  return (
    <section>
      <div className="container-sm">
        <div className="paper-rounded">
          {renderedTexts && <div dangerouslySetInnerHTML={{ __html: renderedTexts }} />}{' '}
        </div>
      </div>
    </section>
  )
}

export default ImportantDisclosuresPage

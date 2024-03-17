import { getHtml } from '@/components/editorRender/html_editor'

import { ReturnType } from '@/actions/client/generalAction'
import { generalPrefetch } from '@/actions/server/generalPrefetch'

export const generateMetadata = async () => {
  return {
    title: 'PrivacyPolicy Page',
    description: 'V3V - PrivacyPolicy Page',
  }
}

const PrivacyPolicyPage = async () => {
  const results = await generalPrefetch(ReturnType.PRIVACY_POLICY)
  const renderedTexts: string | null = await getHtml(results.privacyPolicy)

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

export default PrivacyPolicyPage

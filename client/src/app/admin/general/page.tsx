'use client'

import { useGetGeneralData } from '@/ahooks/useGeneral'

import { HigherFormGeneral } from '@/components/general/HigherFormGeneral'
import { SectionImportantDisclosures } from '@/components/general/tabs/SectionImportantDisclosures'
import { SectionPrivacyPolicy } from '@/components/general/tabs/SectionPrivacyPolicy'
import { SectionWebsite } from '@/components/general/tabs/SectionWebsite'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { ReturnType } from '@/actions/client/generalAction'

const GeneralPage = () => {
  const { data: general, isFetched } = useGetGeneralData({
    returnType: ReturnType.GENERAL,
  })

  return (
    <div className="container-sm m-0">
      <Tabs defaultValue="websiteTerms">
        <TabsList>
          <TabsTrigger value="websiteTerms">Website terms of use</TabsTrigger>
          <TabsTrigger value="important">Important disclosures</TabsTrigger>
          <TabsTrigger value="policy">Privacy policy</TabsTrigger>
        </TabsList>
        <TabsContent value="websiteTerms">
          {isFetched && (
            <HigherFormGeneral
              general={general}
              routRevalidate="/website-terms-of-use"
              formSection={<SectionWebsite />}
            />
          )}
        </TabsContent>
        <TabsContent value="important">
          {isFetched && (
            <HigherFormGeneral
              general={general}
              routRevalidate="/important-disclosures"
              formSection={<SectionImportantDisclosures />}
            />
          )}
        </TabsContent>
        <TabsContent value="policy">
          {isFetched && (
            <HigherFormGeneral
              general={general}
              routRevalidate="/privacy-policy"
              formSection={<SectionPrivacyPolicy />}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default GeneralPage

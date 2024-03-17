'use client'

import { useGetGeneralData } from '@/ahooks/useGeneral'

import { HigherFormGeneral } from '@/components/general/HigherFormGeneral'
import { SectionAbout } from '@/components/general/SectionAbout'
import { SectionContact } from '@/components/general/SectionContact'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { ReturnType } from '@/actions/client/generalAction'

const MainPage = () => {
  const { data: general, isFetched } = useGetGeneralData({
    returnType: ReturnType.GENERAL,
  })

  return (
    <div className="container-sm m-0">
      <Tabs defaultValue="about">
        <TabsList>
          <TabsTrigger value="about">About page</TabsTrigger>
          <TabsTrigger value="contact">Contact page</TabsTrigger>
        </TabsList>
        <TabsContent value="about">
          {isFetched && (
            <HigherFormGeneral
              general={general}
              routRevalidate="/"
              formSection={<SectionAbout />}
            />
          )}
        </TabsContent>
        <TabsContent value="contact">
          {isFetched && (
            <HigherFormGeneral
              general={general}
              routRevalidate="/contact"
              formSection={<SectionContact />}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default MainPage

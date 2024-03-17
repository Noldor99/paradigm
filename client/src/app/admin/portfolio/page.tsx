import React, { Suspense } from 'react'

import Portfolio from './_components/Portfolio'

const page = () => {
  return (
    <Suspense>
      <Portfolio />
    </Suspense>
  )
}

export default page

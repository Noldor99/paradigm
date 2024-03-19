import React, { Suspense } from 'react'

import Perspective from './_components/Perspective'

const page = () => {
  return (
    <Suspense>
      <Perspective />
    </Suspense>
  )
}

export default page

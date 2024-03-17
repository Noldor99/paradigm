import React, { Suspense } from 'react'

import Moderator from './_components/Moderator'

const page = () => {
  return (
    <Suspense>
      <Moderator />
    </Suspense>
  )
}

export default page

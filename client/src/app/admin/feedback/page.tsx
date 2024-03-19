import React, { Suspense } from 'react'

import FeedbackList from './_components/FeedbackList'

const page = () => {
  return (
    <div className="container-sm m-0">
      <Suspense>
        <FeedbackList />
      </Suspense>
    </div>
  )
}

export default page

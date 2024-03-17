'use client'

import { useRouter } from 'next/navigation'

import { useEffect } from 'react'

import { useUserStore } from '@/store'

const AdminPage = () => {
  const { user } = useUserStore()
  const { push } = useRouter()
  useEffect(() => {
    if (user) {
      push('/admin/main')
    }
  }, [user])

  return null
}

export default AdminPage

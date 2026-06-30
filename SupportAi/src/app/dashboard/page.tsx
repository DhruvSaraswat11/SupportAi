import getSession from '@/lib/getSession'
import DashboardClient from '@/components/DashboardClient';
import React from 'react'

async function dashboard() {
  const session = await getSession() ;

  return (
    <>
      < DashboardClient ownerId = { session?.user?.id } />
    </>
  )
}

export default dashboard
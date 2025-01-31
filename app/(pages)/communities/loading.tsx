import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function loading() {
  return (
    <div className='space-y-3' >
      {[1,2,3,4,5,6].map(n => <Skeleton key={n} className='w-full rounded-xl h-28' />)}
    </div>
  )
}

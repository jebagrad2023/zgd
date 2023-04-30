import React from 'react'
import useSWR from 'swr'

import { fetcher } from '@zgd/utils/fetcher'

const counterURL = 'https://counter.zeacornelia.com/'

type Counter = {
  count: number
}

export const AccessCounter = (): JSX.Element => {
  const { data } = useSWR<Counter>(counterURL, fetcher(), {
    revalidateOnFocus: false,
  })

  if (!data) {
    return null
  }

  const numSuffix = (() => {
    switch (data.count % 10) {
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      default:
        return 'th'
    }
  })()

  return (
    <div id="counter">
      You're the{' '}
      <span id="counterNum">{data.count.toString().padStart(8, '0')}</span>
      {numSuffix} Kernel!
    </div>
  )
}

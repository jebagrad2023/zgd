import React from 'react'
import { createRoot } from 'react-dom/client'

import { MessageBoard } from '@zgd/components/organisms/MessageBoard'

import '@zgd/styles.scss'

const sample = [
  {
    name: 'Gentle Kernel 1',
    text: 'One. Cob. Mind. One. Cob. Mind. One. Cob. Mind. One. Cob. Mind.',
  },
  {
    name: 'Gentle Kernel 2',
    text: 'One. Cob. Mind.',
  },
  {
    name: 'Gentle Kernel 3',
    text: 'One. Cob. Mind.',
    image: '/images/kernel.jpg',
  },
  {
    name: 'Gentle Kernel 4',
    text: 'One. Cob. Mind.',
  },
  {
    name: 'Gentle Kernel 5',
    text: 'One. Cob. Mind.',
    image: '/images/zea.png',
  },
]

const Root = (): JSX.Element => {
  return (
    <div id="container">
      <h1>One. Cob. Mind.</h1>
      <MessageBoard messages={sample} />
    </div>
  )
}

createRoot(document.getElementById('root')).render(<Root />)
